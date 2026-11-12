/**
 * Gantry: a portal crane over a yard of five stacks of containers. The pointer
 * picks a bay: the trolley travels along the beam to it, the rope pays out as
 * it arrives, and the bay's top container is hoisted clear of its stack and
 * takes the bright stroke; the one held before is set back down. At rest the
 * crane holds one container half way up. The slider is how high it hoists.
 *
 * The pattern: discrete items on tweens. The hit test reads the bays' rest
 * centres, which never move, so a rising container cannot flip the choice.
 */
const {
  Cam, clamp, facing, fit, lerp, prism, proj, rings, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const COUNT = [3, 1, 1, 2, 2], N = COUNT.length, SP = 28, H = 11, HALF = 10, Y0 = 6, Y1 = 34, YC = 20;
const BEAM = 66, TOP = 72, ZMAX = 44, HOME = 1, X0 = -20, X1 = N * SP + 26;
const bx = (k) => 14 + k * SP;

/** A container with its floor at z: the solid's two paths, and the ribs pressed into its long side. */
function box(P, front, ring, inner, x, z) {
  let ribs = "";
  for (let y = Y0 + 5; y <= Y1 - 5; y += 6) ribs += seg(P(x + HALF, y, z + 2.2), P(x + HALF, y, z + H - 2.8));
  return { paths: prism(P, front, ring, inner, z, z + H - 0.6), ribs };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let hoist = value;

  // Fitted to the plinth and the trolley on top of the beam: nothing rises past them.
  const C = Cam(45, 0.5, 1.42);
  fit(C, [[X0 - 6, -6, -4], [X1 + 6, -6, -4], [X0 - 6, 46, -4], [X1 + 6, 46, -4], [X0, 14, TOP + 6], [X1, 26, TOP + 6]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const block = (x0, y0, x1, y1, r, b, z0, z1, parent) => { const [o, i] = rings(x0, y0, x1, y1, r, b), s = solid(parent || g); put(s, prism(P, front, o, i, z0, z1)); return s; };

  block(X0 - 6, -6, X1 + 6, 46, 7, 2, -4, 0);
  block(X0, YC - 6, X0 + 8, YC + 6, 2.5, 1, 0, BEAM); // the far leg

  // bays, far to near: the containers that stay, then the one the crane can take
  const bays = [];
  for (let k = 0; k < N; k++) {
    const x = bx(k), grp = mk("g", {}, g), [ring, inner] = rings(x - HALF, Y0, x + HALF, Y1, 1.5, 0.9);
    const make = () => { const s = solid(grp); return { s, ribs: mk("path", { class: "nf lo" }, s.g) }; };
    const set = (c, z) => { const b = box(P, front, ring, inner, x, z); put(c.s, b.paths); c.ribs.setAttribute("d", b.ribs); };
    for (let j = 0; j < COUNT[k] - 1; j++) set(make(), j * H);
    bays.push({ x, base: (COUNT[k] - 1) * H, top: make(), set, lift: tween(0), drawn: NaN });
  }

  const rope = mk("path", { class: "nf" }, g);
  block(X1 - 8, YC - 6, X1, YC + 6, 2.5, 1, 0, BEAM); // the near leg
  block(X0, YC - 4, X1, YC + 4, 2, 1, BEAM, TOP);
  const trolley = solid(g), vx = tween(bx(HOME));
  let drawnX = NaN, drawnRope = "";

  /** How far up bay k's top container goes when held: f of the way to the hoist height. */
  const rise = (k, f) => (ZMAX - bays[k].base) * f;

  let act = -1;
  const held = () => (act < 0 ? HOME : act);

  const B = register(stage, (_dt, now) => {
    let moving = !tdone(vx, now);
    bays.forEach((b) => {
      const z = tval(b.lift, now);
      if (!tdone(b.lift, now)) moving = true;
      if (z !== b.drawn) { b.drawn = z; b.set(b.top, b.base + z); }
    });
    const x = tval(vx, now);
    if (x !== drawnX) {
      drawnX = x;
      const [o, i] = rings(x - 7, YC - 7, x + 7, YC + 7, 2.5, 1);
      put(trolley, prism(P, front, o, i, TOP, TOP + 6));
    }
    // the rope pays out only once the trolley is over the bay it serves
    const b = bays[held()], near = clamp((1 - Math.abs(x - b.x) / (SP * 0.6)) * 1.5, 0, 1);
    const d = seg(P(x, YC, BEAM), P(x, YC, lerp(BEAM - 4, b.base + b.drawn + H - 0.6, near)));
    if (d !== drawnRope) { drawnRope = d; rope.setAttribute("d", d); }
    return moving;
  });
  bag.add(B.unregister);

  // hit: the bay whose rest centre is nearest the pointer's screen x. Nothing here moves.
  const centre = bays.map((b) => P(b.x, YC, 16)[0]);
  function hit([sx]) {
    let best = 0;
    for (let k = 1; k < N; k++) if (Math.abs(centre[k] - sx) < Math.abs(centre[best] - sx)) best = k;
    return best;
  }

  /** Sends the crane to bay a (-1 sends it home, holding its container half way). */
  function aim(a, force) {
    if (a === act && !force) return;
    const now = performance.now();
    act = a;
    const h = held();
    bays.forEach((b, k) => {
      // set down at once; hoist only after the trolley has arrived and the rope is down
      tset(b.lift, k === h ? rise(k, a < 0 ? hoist * 0.5 : hoist) : 0, now, k === h ? 380 : 0);
      b.top.s.sil.classList.toggle("hi", k === h);
    });
    tset(vx, bays[h].x, now, 0);
    read.textContent = a < 0 ? "rest" : "bay " + (a + 1);
    B.wake();
  }
  aim(-1, true);

  bag.add(pointer(stage, { move: (p) => aim(hit(p)), leave: () => aim(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { hoist = v; aim(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "gantry",
  means: "A crane over five stacks: the trolley goes to the bay under the pointer and hoists its top container clear.",
  rules: [1, 5, 8, 9],
  range: [0.3, 0.65, 1],
  tour: [[253, 207], [197, 184], [141, 138], null],
  mount,
});
