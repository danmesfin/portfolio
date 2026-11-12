/**
 * Turnstiles: five gates along a lane, each a wall panel between two posts,
 * taller the further in. A vote, a puck, waits at the near end. The pointer
 * sets how far the vote has got: the gates on the way sink into the floor,
 * staggered outwards from where the vote stands, the puck travels to the
 * gate chosen, and that gate takes the bright stroke. The slider is the stagger.
 *
 * The pattern: discrete items on tweens. The hit test reads the gates' rest
 * centres, which never move, so a sinking panel cannot flip the choice.
 */
const {
  Cam, facing, fit, prism, proj, rings, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const N = 5, SP = 30, Y0 = 0, Y1 = 40, PW = 4, START = N * SP + 14, SILL = 1.2;
/** Gate g, 0 nearest the viewer: where it stands, and how tall its posts are. */
const gx = (g) => (N - 1 - g) * SP, gh = (g) => 20 + g * 8;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;

  // Fitted to the plinth and the tallest posts: nothing rises past its rest pose.
  const C = Cam(45, 0.5, 1.5);
  fit(C, [[-14, -12, -5], [START + 16, -12, -5], [-14, Y1 + 12, -5], [START + 16, Y1 + 12, -5], [-4, -6, gh(N - 1)], [4, Y1 + 6, gh(N - 1)]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  // the plinth, and the two edges of the lane ruled on it
  const [pr, pi] = rings(-14, -12, START + 16, Y1 + 12, 7, 2);
  put(solid(g), prism(P, front, pr, pi, -5, 0));
  mk("path", { d: seg(P(-8, Y0 + 8, 0), P(START + 10, Y0 + 8, 0)) + seg(P(-8, Y1 - 8, 0), P(START + 10, Y1 - 8, 0)), class: "nf lo" }, g);

  // gates, far to near: far post, panel, near post
  const gates = [];
  for (let k = N - 1; k >= 0; k--) {
    const x = gx(k), h = gh(k), grp = mk("g", {}, g);
    const post = (y0, y1) => { const [r, i] = rings(x - PW, y0, x + PW, y1, 3, 1); put(solid(grp), prism(P, front, r, i, 0, h)); };
    post(Y0 - 6, Y0 + 2);
    const [ring, inner] = rings(x - 2, Y0 + 2, x + 2, Y1 - 2, 1.5, 0.8), panel = solid(grp);
    post(Y1 - 2, Y1 + 6);
    gates[k] = { x, h, grp, ring, inner, panel, up: tween(1), drawn: -1 };
  }

  // the vote: a puck, painted after the last gate it has not yet passed
  const vote = solid(g), vx = tween(START - 8);
  let drawnX = NaN, slot = -1;
  vote.sil.classList.add("hi");

  function drawGate(gt, up) {
    if (up === gt.drawn) return;
    gt.drawn = up;
    put(gt.panel, prism(P, front, gt.ring, gt.inner, 0, SILL + (gt.h - 6 - SILL) * up));
  }
  function drawVote(x) {
    if (x === drawnX) return;
    drawnX = x;
    const [r, i] = rings(x - 5, 15, x + 5, 25, 5, 1.2);
    put(vote, prism(P, front, r, i, SILL, SILL + 5));
    // depth: after every gate farther than the puck, before the nearer ones
    let s = -1;
    for (let k = N - 1; k >= 0; k--) if (gates[k].x < x) s = k;
    if (s !== slot) { slot = s; if (s < 0) g.insertBefore(vote.g, gates[N - 1].grp); else gates[s].grp.after(vote.g); }
  }

  const B = register(stage, (_dt, now) => {
    let moving = !tdone(vx, now);
    for (const gt of gates) { drawGate(gt, tval(gt.up, now)); if (!tdone(gt.up, now)) moving = true; }
    drawVote(tval(vx, now));
    return moving;
  });
  bag.add(B.unregister);

  // hit: the gate whose rest centre is nearest the pointer's screen x. Nothing here moves.
  const centre = gates.map((gt) => P(gt.x, (Y0 + Y1) / 2, gt.h / 2)[0]);
  function hit([sx]) {
    let best = 0;
    for (let k = 1; k < N; k++) if (Math.abs(centre[k] - sx) < Math.abs(centre[best] - sx)) best = k;
    return best;
  }

  let act = -1;
  /** Sends the vote to gate a (-1 sends it home). Passed gates sink, staggered out from the gate it leaves. */
  function setActive(a) {
    if (a === act) return;
    // The wave starts where the vote stands, so each gate is down before the puck reaches it.
    const now = performance.now(), from = act;
    act = a;
    gates.forEach((gt, k) => {
      tset(gt.up, k < a ? 0 : 1, now, Math.abs(k - from) * stag);
      gt.panel.sil.classList.toggle("hi", k === a);
    });
    vote.sil.classList.toggle("hi", a < 0);
    tset(vx, a < 0 ? START - 8 : gates[a].x + 22, now, 120);
    read.textContent = a < 0 ? "rest" : "gate " + (a + 1);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "turnstiles",
  means: "Five gates, each taller than the last: the pointer sets how far a vote has got, and the gates behind it sink.",
  rules: [1, 2, 5, 8],
  range: [0, 45, 90],
  tour: [[239, 199], [176, 157], [112, 114], null],
  mount,
});
