---
title: How I Stopped Vote Fraud on a 50,000-User Competition Platform
description: The five layers of bot and fraud defense behind AI Creative Award, a prize-money voting competition — ordered so the cheapest checks run first and the database is the last thing an attacker can reach.
date: 2026-11-12T09:00:00.000Z
preview: /images/projects/aicreativeaward/1_creativeaward-cover.webp
draft: false
tags:
  - security
  - system-design
  - redis
  - nextjs
keywords:
  - vote fraud prevention
  - rate limiting
  - bot protection
  - online voting system design
---

When a public vote decides who wins real money, people will cheat. [AI Creative Award](/case-studies/aicreativeaward) is a monthly competition for AI-generated art with a 1M ETB prize pool, and I built the platform as its only engineer. It has handled more than 50,000 users. From the first day I designed it on one assumption: scripted votes, sockpuppet accounts and request floods were going to happen, so the system had to treat them as normal traffic to be filtered rather than as incidents.

This post covers how the defenses are layered and why the order matters more than any single check.

## The rule: cheap checks first, the database last

Every fraudulent request costs something to reject. If the rejection happens in a database query, an attacker with a script can spend your database capacity for free. So the rule I followed was that **cost increases inward**. The outer layers are nearly free to run and throw away the crudest traffic. The inner layers are more expensive and more precise, and they only ever see requests that passed everything before them.

A second rule follows from the first: no layer is trusted to be the only one. Each assumes the layer outside it has been beaten.

## Layer 0: let the platform take the first hit

The site runs on Vercel, and Vercel's managed bot mitigation sits at the edge in front of the application. The crudest automated floods are filtered there, before any of my code runs.

I count this as a design decision and not a default. Edge-scale bot filtering is something a hosting platform does better than one engineer can, so I did not rebuild it. My own rate limiters and database then spend their budget on traffic that has already cleared the front door.

## Layer 1: reject cross-origin writes and anonymous users at the edge

A proxy layer runs at the edge on every matched request and does two things:

- **Blocks cross-origin mutations.** Every `POST`, `PUT`, `PATCH` and `DELETE` to the API is checked against an origin allowlist. It is a lightweight CSRF guard, and it also stops the laziest scripts that post to the API from somewhere else.
- **Gates protected routes by session.** A request without a valid session never reaches the voting or submission handlers.

Neither check touches Redis or Postgres.

## Layer 2: sliding-window rate limits in Redis

Every sensitive endpoint has a sliding-window rate limit stored in Redis, tuned per action and per identity.

- **Votes are capped per user and per IP, independently.** A per-user cap alone does nothing against a hundred fake accounts on one machine. A per-IP cap alone does nothing against one account behind rotating proxies. Each covers the other's gap.
- **Auth, OTP, signup and email verification each have their own stricter budget.** Signups, for example, are throttled per IP per hour, which is what makes creating sockpuppets slow.

The limits live in Redis because the app is serverless. There is no shared server memory, so a counter held in a function instance would be different on every instance. In Redis, every instance enforces the same limit.

## Layer 3: integrity checks when the vote is written

A request that gets this far is authenticated and under its limits. Before the vote counts, it still has to pass:

1. An account ban check.
2. Validation that the submission exists and has been approved.
3. Self-vote prevention.
4. A duplicate-vote check.

In outline, the handler runs its checks in this order:

```ts
// Simplified sketch of the order of checks, not the production code.
async function castVote(request: Request) {
  const user = await requireSession(request); // Layer 1
  await enforceLimit(`vote:user:${user.id}`); // Layer 2
  await enforceLimit(`vote:ip:${hashedIp(request)}`);

  await assertNotBanned(user); // Layer 3
  const submission = await getApprovedSubmission(request);
  assertNotOwnSubmission(user, submission);
  await assertHasNotVoted(user, submission);

  await recordVote(user, submission); // append-only
}
```

Two decisions at this layer mattered later.

**IP addresses and device fingerprints are hashed and never stored raw.** A hash is enough to tell that two votes came from the same place, which is all fraud analysis needs, and it means the platform is not holding that personal data.

**Votes are append-only.** A vote row is never updated or deleted. When fraud is found, the votes are flagged as invalid and stop counting. This keeps a complete record of what happened, so a decision to disqualify votes can be explained and, if it was wrong, reversed.

## Layer 4: tools for the human in the loop

Automated checks catch patterns that were anticipated. For everything else I built operator tooling:

- A fraud-detection dashboard.
- Bulk vote invalidation by IP, device or user.
- Voter banning.
- Domain watchlists.

Signups are also screened against a blocklist of disposable email domains, so a farm of throwaway inboxes costs more to create than it costs me to stop.

## What a real voter sees

Nothing. A legitimate voter signs in, votes, and never meets any of this. A bot meets five walls, and each one is cheaper for me to run than it is for the attacker to get past. That asymmetry is the goal: abuse should be expensive and legitimate use should have no friction.

## If you are building something similar

- Assume abuse from day one whenever a vote is tied to money or status.
- Order your checks by cost, and keep the database behind all of them.
- Limit by more than one identity. User and IP together cover gaps that either leaves alone.
- Never delete votes. Flag them, and keep the trail.
- Give operators a way to act on what the automation missed.

The full architecture, including how vote counting stays off the primary database, is in the [AI Creative Award case study](/case-studies/aicreativeaward).
