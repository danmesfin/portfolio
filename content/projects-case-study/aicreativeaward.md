# AI Creative Award — Building a Vote-at-Scale Competition Platform Solo

> A monthly creative competition where people submit AI-generated art, vote on their
> favorites, and compete for a 1M ETB prize pool. I designed, built, and shipped the
> entire platform — architecture, infrastructure, UI, and anti-abuse systems — as a
> single developer.

**Role:** Sole engineer & system designer (architecture → infra → UI → launch)
**Timeline:** ~4 weeks from empty repo to production
**Scale handled:** 50,000+ users
**Technology Stack:** Next.js, React, TypeScript, PostgreSQL, Redis, Supabase, Vercel, Tailwind CSS, Drizzle ORM, BetterAuth, Resend, Zod
**Live:** creativeaward.ai

---

## The Problem

Online voting competitions have one hard technical truth: **the voting hot path is
adversarial and bursty**. Thousands of people hit "vote" in the same minutes, every
vote is money-adjacent (a real prize is on the line), and bad actors will script,
sockpuppet, and rate-abuse anything that moves. A naive build — count votes with a
`SELECT COUNT(*)`, trust the client, deploy and hope — collapses under exactly the load
it's designed to attract.

The brief was to handle **20K–100K votes per cycle** on a serverless-first budget, with
a small team (me), on a timeline measured in weeks, not quarters.

So the real engineering problem wasn't "build a voting app." It was:

- How do you count votes at burst scale **without touching the primary database on the hot path**?
- How do you keep leaderboards feeling live without re-aggregating on every request?
- How do you stop bots and vote-stuffing **before** they cost you database capacity?
- How do you do all of this with one engineer and a serverless bill?

---

## System Architecture

The design principle throughout: **push the expensive work off the request path.**
Reads are cached, writes are cheap, aggregation is asynchronous, and abuse is filtered
as early (and as far from the database) as possible.

```
                          ┌─────────────────────────┐
        User ───────────► │   Vercel Edge / CDN     │  ◄── Bot defense, CSRF, auth gating
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │  Next.js 16 App Router  │  Server Components (reads)
                          │  API Routes (writes)    │  Client Components (interactions)
                          └───┬───────────┬─────────┘
                              │           │
              ┌───────────────┘           └───────────────┐
              ▼                                            ▼
      ┌───────────────┐                          ┌──────────────────┐
      │ Upstash Redis │  Vote counters (INCR)    │  Neon Postgres   │  Source of truth
      │               │  Leaderboard cache (TTL) │  (HTTP driver)   │  Append-only votes
      │               │  Sliding-window limits   │                  │  Audit log
      └───────▲───────┘                          └────────▲─────────┘
              │                                            │
              │        ┌───────────────────────┐          │
              └────────┤   Vercel Cron (1 min)  ├──────────┘
                       │  sync-vote-counts      │  Redis → Postgres reconciliation
                       │  competition-lifecycle │  Phase transitions
                       └───────────────────────┘

      ┌──────────────────┐        ┌──────────────────┐
      │ Supabase Storage │        │      Resend      │
      │ Presigned upload │        │  Transactional   │
      │ (media off-path) │        │  email (retries) │
      └──────────────────┘        └──────────────────┘
```

### The core insight: Redis is the vote ledger's front desk, Postgres is the vault

The single most important decision was **never counting votes with live SQL
aggregation.** Every vote does an atomic `INCR` on a Redis counter keyed by submission.
Reads of "current vote count" hit Redis, not a `COUNT(*)` scan. A Postgres row is still
written for every vote — the database remains the durable, auditable source of truth —
but the _number people see_ and the _number that drives the leaderboard_ comes from an
in-memory counter that shrugs off burst traffic.

A **1-minute cron job reconciles** Redis counters back into Postgres, so the two never
drift for long, and the durable store is always catching up to the fast store rather
than gating it.

### Leaderboards: cached, not recomputed

Leaderboards are read constantly and would be the obvious N+1 / full-table-scan
disaster. Instead they're **served from a short-TTL Redis cache** (30 seconds), keyed by
competition and page. The result feels live — a 30-second staleness window is invisible
in a multi-week competition — while the database is shielded from thousands of identical
ranking queries per minute. Batched pipeline reads pull many submissions' counts in a
single round trip rather than one-per-submission.

### The intentional two-provider split (Neon + Supabase)

I deliberately **split the database and storage across two providers** and documented
_why_, because it looks like accidental complexity until you understand the hot path:

- **Neon Postgres via its HTTP driver** uses stateless HTTP requests instead of holding
  TCP connections. On Vercel's serverless functions that means **near-zero cold-start
  overhead** for database access — no per-invocation TLS handshake + Postgres auth tax
  (~80–150ms) that a traditional TCP driver pays. On a voting hot path that's invoked in
  bursts, that cold-start tax is exactly what you can't afford.
- **Supabase Storage** handles media via **presigned upload URLs**, so image and video
  bytes never flow through a serverless function. The client uploads straight to
  storage; the function only ever handles a URL. Media processing stays off the compute
  path entirely.

The tradeoff — two dashboards, two bills — was a conscious trade for cold-start
performance where it mattered most. That's the kind of decision I wanted the
architecture to make _explicitly_ rather than drift into.

---

## Handling Load

The platform never tries to be big. It tries to make the expensive operations rare.

| Pressure              | Naive approach                        | What I built                                            |
| --------------------- | ------------------------------------- | ------------------------------------------------------- |
| Burst voting          | `INSERT` + `SELECT COUNT(*)` per vote | Atomic Redis `INCR`; Postgres write for durability only |
| Live vote counts      | Aggregate on read                     | Read straight from Redis counter                        |
| Leaderboard reads     | Rank query per pageview               | 30s TTL Redis cache, batched pipeline reads             |
| Media uploads         | Stream bytes through function         | Presigned direct-to-storage uploads                     |
| DB cold starts        | TCP driver on serverless              | Neon stateless HTTP driver                              |
| Counter durability    | Hope Redis never fails                | 1-min cron reconciles Redis → Postgres                  |
| Server-rendered reads | Client fetch waterfalls               | React Server Components render on the server            |

The result is a system whose **cost and latency scale with _unique_ activity, not raw
request volume**. Ten thousand people refreshing a leaderboard cost one Redis read every
30 seconds, not ten thousand database queries.

---

## Defense: How Bot & Fraud Protection Held the Line

With real prize money involved, abuse isn't a maybe — it's the design assumption. I
layered defenses so that **cheap filters run first and expensive checks run last**, and
so that no single layer is the only thing standing between a bot and the vote table.

### Layer 0 — Vercel's edge as the first wall

Running on Vercel meant the **platform's bot defense and edge network absorbed a large
class of automated and malicious traffic before it ever reached my code.** Vercel's
managed bot mitigation and challenge tooling sit at the edge, in front of the
application, so the crudest scripted floods get filtered upstream of my serverless
functions — which means my rate limiters and database are spending their budget on
traffic that already cleared the front door. Letting the platform own the outermost
layer is itself a system-design choice: don't rebuild edge-scale bot filtering when your
host does it better than you can.

### Layer 1 — Edge request gating (CSRF + auth)

A proxy/middleware layer runs at the edge on every matched request. It **blocks
cross-origin mutating requests** (an allowlist origin check on every POST/PUT/PATCH/
DELETE to the API — a lightweight CSRF guard) and **gates protected routes** by session
before any handler runs. Unauthenticated users never reach the voting or submission
logic at all.

### Layer 2 — Sliding-window rate limits

Every sensitive endpoint is rate-limited with sliding-window counters in Redis, tuned
per action and per identity:

- Votes: capped **per user** and **per IP** independently (so neither a single account
  nor a single network can flood).
- Auth, OTP, signup, and email-verification each get their own stricter budgets
  (e.g. signups throttled per IP per hour).

Because the limits live in Redis, they're enforced consistently across every serverless
instance without shared server state.

### Layer 3 — Identity & integrity checks at write time

Each vote passes through a gauntlet before it counts: authentication, an account **ban
check**, submission-exists-and-approved validation, **self-vote prevention**, and a
duplicate-vote check. Client IP and a device fingerprint are **hashed, never stored
raw** — enough to correlate abuse without holding personal data. Votes are
**append-only**: never updated, never deleted. Reversing fraud means _invalidating_
(flagging) votes, which preserves a complete forensic trail.

### Layer 4 — Admin fraud tooling & signup hygiene

Above the automated layers sits operator tooling I built for the human in the loop: a
**fraud-detection dashboard**, bulk **vote invalidation** by IP/device/user, **voter
banning**, and **domain watchlists**. Signups are additionally screened against a
**disposable-email-domain blocklist** so throwaway-inbox sockpuppet farms are cheaper to
stop than to create.

The philosophy: **make abuse expensive and legitimate use frictionless.** A real voter
never notices any of this. A bot hits five walls, each cheaper for me to run than for
them to beat.

---

## Tech Stack

**Framework & language**

- Next.js 16 (App Router) · React 19 · TypeScript (strict mode)
- React Server Components for reads, Client Components for interactions

**Data & infrastructure**

- Neon Postgres (serverless HTTP driver) + Drizzle ORM — durable source of truth
- Upstash Redis — vote counters, leaderboard cache, sliding-window rate limits
- Supabase Storage — presigned direct-to-storage media uploads
- Vercel — hosting, edge network, bot defense, and Cron (reconciliation + lifecycle)

**Application layer**

- BetterAuth — email/password auth with user / judge / admin roles
- Resend — transactional email with retry + exponential backoff
- Zod — end-to-end input validation
- Tailwind CSS v4 — a custom dark competition theme

**Operational**

- Two Vercel Cron jobs (1-min cadence): vote-count reconciliation and automated
  competition phase transitions (submission window → voting window → results)
- Append-only audit logging across privileged actions

---

## The Meta-Story: AI-Driven Development With a System Designer's Mindset

This is the part I'm proudest of, and it's the part that's genuinely new.

I built a platform that survived real, adversarial, money-on-the-line scale — **solo, in
about four weeks.** That pace is only possible with AI-assisted development. But the
lesson of this project is the _opposite_ of "the AI built it for me."

AI collapsed the cost of _implementation_. It did nothing to collapse the cost of
_judgment_. Every load-bearing decision in this system was a design call that no
autocomplete makes for you:

- Deciding that **votes must never be counted with live SQL** — and structuring the
  whole data flow around that constraint.
- Choosing to **split providers** for a cold-start reason most people would "simplify"
  away, and documenting the rationale so the next person doesn't undo it.
- Designing **defense as layers** where cost increases inward, so cheap filters protect
  expensive resources.
- Treating **votes as an append-only ledger** so fraud is reversible without losing
  history.

AI let me move through the implementation of those decisions at a speed that would've
taken a small team months. My job was to be the architect who knew _which_ system to ask
for, _why_ it had to be shaped that way, and _where_ it would break under load and abuse
— and then to hold that line while iterating fast.

**That's the model of engineering I want to be hired for:** a system designer who uses AI
as a force multiplier on a foundation of real architectural judgment — not a prompt
operator hoping the output holds up in production. On this project, it held up under
50,000+ users. Because it was designed to.

---

## What I'd Highlight in a Conversation

- **Read-heavy-at-scale done right:** the difference between a leaderboard that melts a
  database and one that costs a single cached read.
- **Adversarial-by-default design:** five defensive layers, ordered by cost, with the
  platform owning the outermost.
- **Documented tradeoffs:** the Neon/Supabase split is the clearest example — an
  intentional complexity with a written rationale and a "don't undo this" note.
- **Solo velocity without solo fragility:** AI-accelerated delivery, human-owned
  architecture.

---

_Built and shipped solo. Architecture, infrastructure, UI, and anti-abuse systems by
Daniel Mesfin._
