// Hand-drawn style cake illustrations, drawn as SVG so every sponge/filling/size combination is
// generated from colours instead of separate image files. The hand-drawn look comes from SVG
// filters (wobbly outlines + grainy fill), a light hatching pattern and thick ink outlines.

const INK = "#4a2e22";
const OUTLINE = 3.2;

// Shared filters and patterns; render once per page
export function CrayonDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {[
          ["crayon", 3],
          ["crayon-sm", 1.6],
        ].map(([id, wobble]) => (
          <filter key={id} id={id} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale={wobble} xChannelSelector="R" yChannelSelector="G" result="wobbly" />
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="8" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.3" result="grainAlpha" />
            <feComposite in="wobbly" in2="grainAlpha" operator="in" />
          </filter>
        ))}
        <pattern id="crayon-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeOpacity="0.1" strokeWidth="2.2" />
        </pattern>
      </defs>
    </svg>
  );
}

// Deterministic "random" numbers so drawings look the same on the server and in the browser
function seeded(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// A band between two slightly wavy horizontal edges
function bandPath(x1, x2, top, bottom, seed) {
  const rand = seeded(seed);
  const edge = (y, reverse) => {
    const steps = 6;
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const x = x1 + ((x2 - x1) * i) / steps;
      points.push([x, y + (i === 0 || i === steps ? 0 : (rand() - 0.5) * 3)]);
    }
    return reverse ? points.reverse() : points;
  };
  const points = [...edge(top), ...edge(bottom, true)];
  return `M${points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")} Z`;
}

function Sponge({ x1, x2, top, bottom, body, seed, outline = OUTLINE }) {
  const rand = seeded(seed);
  const d = bandPath(x1, x2, top, bottom, seed);
  const holes = Array.from({ length: Math.round(((x2 - x1) * (bottom - top)) / 260) }, () => ({
    cx: x1 + 6 + rand() * (x2 - x1 - 12),
    cy: top + 5 + rand() * (bottom - top - 10),
    r: 0.8 + rand() * 1.8,
  }));
  return (
    <g>
      <path d={d} fill={body.sponge} stroke={INK} strokeWidth={outline} strokeLinejoin="round" />
      {holes.map((hole, i) => (
        <ellipse key={i} cx={hole.cx} cy={hole.cy} rx={hole.r * 1.4} ry={hole.r} fill={body.crumb} opacity="0.55" />
      ))}
      <path d={d} fill="url(#crayon-hatch)" />
    </g>
  );
}

function Filling({ x1, x2, top, bottom, filling, seed, outline = OUTLINE }) {
  const rand = seeded(seed);
  const d = bandPath(x1, x2, top, bottom, seed);
  const bits = filling.bits
    ? Array.from({ length: Math.round((x2 - x1) / 14) }, () => ({
        cx: x1 + 6 + rand() * (x2 - x1 - 12),
        cy: top + (bottom - top) / 2 + (rand() - 0.5) * (bottom - top) * 0.5,
        r: (bottom - top) * (0.2 + rand() * 0.15),
      }))
    : [];
  return (
    <g>
      <path d={d} fill={filling.cream} stroke={INK} strokeWidth={outline * 0.9} strokeLinejoin="round" />
      {bits.map((bit, i) => (
        <circle key={i} cx={bit.cx} cy={bit.cy} r={bit.r} fill={filling.bits} stroke={INK} strokeWidth="1" strokeOpacity="0.6" />
      ))}
    </g>
  );
}

// Square cross-section tile, like a flavour swatch on a menu
export function CakeTile({ body, filling, className }) {
  const x1 = 14;
  const x2 = 106;
  const outline = 2.6;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g filter="url(#crayon-sm)">
        <Sponge x1={x1} x2={x2} top={18} bottom={40} body={body} seed={11} outline={outline} />
        <Filling x1={x1} x2={x2} top={40} bottom={50} filling={filling} seed={12} outline={outline} />
        <Sponge x1={x1} x2={x2} top={50} bottom={72} body={body} seed={13} outline={outline} />
        <Filling x1={x1} x2={x2} top={72} bottom={82} filling={filling} seed={14} outline={outline} />
        <Sponge x1={x1} x2={x2} top={82} bottom={102} body={body} seed={15} outline={outline} />
      </g>
    </svg>
  );
}

// Cream top with drips running down the front
function capPath(x1, x2, top, seed) {
  const rand = seeded(seed);
  const rim = top + 6;
  const drips = [0.88, 0.7, 0.5, 0.3, 0.12].map((f) => ({ x: x1 + (x2 - x1) * f, length: 8 + rand() * 16 }));
  let d = `M${x1 - 4},${top + 4} C${x1 - 6},${top - 12} ${x1 + 8},${top - 20} ${x1 + 26},${top - 20}`;
  d += ` L${x2 - 26},${top - 20} C${x2 - 8},${top - 20} ${x2 + 6},${top - 12} ${x2 + 4},${top + 4}`;
  for (const drip of drips) {
    d += ` L${drip.x + 8},${rim} C${drip.x + 9},${rim + drip.length} ${drip.x - 9},${rim + drip.length} ${drip.x - 8},${rim}`;
  }
  return `${d} Z`;
}

// Width of a tier on the drawing for each cake size
const TIER_WIDTH = { "5-inch": 190, "6-inch": 215, "8-inch": 260, "10-inch": 300 };

// One cut-open tier: sponge / filling / sponge / filling / sponge with a cream top
function Tier({ size, body, filling, bottom, height, seed, toppings }) {
  const width = TIER_WIDTH[size];
  const x1 = 260 - width / 2;
  const x2 = 260 + width / 2;
  const top = bottom - height;
  const sponge = height * 0.26;
  const cream = (height - sponge * 3) / 2;
  const bands = [];
  let y = top;
  for (let i = 0; i < 5; i++) {
    const band = i % 2 === 0 ? sponge : cream;
    bands.push({ top: y, bottom: y + band, isSponge: i % 2 === 0 });
    y += band;
  }
  const dollopCount = Math.max(3, Math.round(width / 58));
  const dollops = Array.from({ length: dollopCount }, (_, i) => x1 + 22 + ((width - 44) * i) / (dollopCount - 1));
  const sprinkles = ["#e98b9b", "#f2c14e", "#8fbf9f", "#9db4e0"];
  return (
    <g>
      {bands.map((band, i) =>
        band.isSponge ? (
          <Sponge key={i} x1={x1} x2={x2} top={band.top} bottom={band.bottom} body={body} seed={seed + i} />
        ) : (
          <Filling key={i} x1={x1} x2={x2} top={band.top} bottom={band.bottom} filling={filling} seed={seed + i} />
        )
      )}
      <path d={capPath(x1, x2, top, seed)} fill="#fffaf0" stroke={INK} strokeWidth={OUTLINE * 0.9} strokeLinejoin="round" />
      {toppings && (
        <>
          {dollops.map((cx) => (
            <g key={cx}>
              <path
                d={`M${cx - 15},${top - 18} C${cx - 17},${top - 36} ${cx - 4},${top - 34} ${cx},${top - 46} C${cx + 4},${top - 34} ${cx + 17},${top - 36} ${cx + 15},${top - 18} Z`}
                fill="#fffaf0"
                stroke={INK}
                strokeWidth={OUTLINE * 0.8}
                strokeLinejoin="round"
              />
              <path d={`M${cx - 7},${top - 26} C${cx - 2},${top - 30} ${cx + 2},${top - 30} ${cx + 7},${top - 26}`} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" />
            </g>
          ))}
          {filling.bits &&
            dollops.slice(0, -1).map((cx, i) => (
              <circle key={cx} cx={(cx + dollops[i + 1]) / 2} cy={top - 24} r="6" fill={filling.bits} stroke={INK} strokeWidth="1.5" />
            ))}
          {dollops.map((cx, i) => (
            <line key={`s${cx}`} x1={cx - 3} y1={top - 9 + (i % 2) * 4} x2={cx + 3} y2={top - 13 + (i % 2) * 4} stroke={sprinkles[i % 4]} strokeWidth="3" strokeLinecap="round" />
          ))}
        </>
      )}
    </g>
  );
}

const sizeLabel = (size) => size.replace("-inch", '"');

// Whole cake (one or two tiers) cut open to show the layers, with handwritten notes.
// `tiers` is listed bottom first: [{ size, body, filling }, ...]
export function CakePreview({ tiers, className }) {
  const plateY = 352;
  const [bottomTier, topTier] = tiers;
  const bottomHeight = topTier ? 150 : 210;
  const bottomTop = plateY - 14 - bottomHeight;
  const label = topTier
    ? `Two-tier cake: top ${sizeLabel(topTier.size)} ${topTier.body.name} sponge with ${topTier.filling.name} filling, bottom ${sizeLabel(bottomTier.size)} ${bottomTier.body.name} sponge with ${bottomTier.filling.name} filling`
    : `${sizeLabel(bottomTier.size)} ${bottomTier.body.name} sponge with ${bottomTier.filling.name} filling`;

  // Handwritten notes with arrows that end at the edge of the tier they describe
  const edge = (tier, side) => 260 + (side * TIER_WIDTH[tier.size]) / 2 + side * 4;
  const notes = topTier
    ? [
        { x: 62, y: 96, lines: [`Top ${sizeLabel(topTier.size)}`, topTier.body.name, `+ ${topTier.filling.name}`], from: [86, 158], to: [edge(topTier, -1), 176] },
        { x: 462, y: 240, lines: [`Bottom ${sizeLabel(bottomTier.size)}`, bottomTier.body.name, `+ ${bottomTier.filling.name}`], from: [446, 302], to: [edge(bottomTier, 1), 316] },
      ]
    : [
        { x: 62, y: 112, lines: [bottomTier.body.name, `sponge · ${bottomTier.body.chinese}`], from: [96, 140], to: [edge(bottomTier, -1), 204] },
        { x: 462, y: 112, lines: [bottomTier.filling.name, `filling · ${bottomTier.filling.chinese}`], from: [456, 142], to: [edge(bottomTier, 1), 180] },
      ];
  const arrowPath = ({ from: [fx, fy], to: [tx, ty] }) => {
    const dir = Math.sign(tx - fx);
    return {
      line: `M${fx},${fy} C${fx},${fy + 26} ${tx - dir * 24},${ty + 4} ${tx},${ty}`,
      head: `M${tx - dir * 10},${ty - 6} L${tx},${ty} L${tx - dir * 9},${ty + 7}`,
    };
  };

  return (
    <svg viewBox="0 0 520 390" className={className} role="img" aria-label={label}>
      <g filter="url(#crayon)">
        {/* Plate */}
        <ellipse cx="260" cy={plateY} rx="200" ry="22" fill="#fffaf3" stroke={INK} strokeWidth={OUTLINE} />
        <ellipse cx="260" cy={plateY - 4} rx="160" ry="12" fill="none" stroke={INK} strokeOpacity="0.25" strokeWidth="1.5" />
        <Tier {...bottomTier} bottom={plateY - 14} height={bottomHeight} seed={21} toppings={!topTier} />
        {topTier && <Tier {...topTier} bottom={bottomTop - 18} height={120} seed={41} toppings />}
      </g>

      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {notes.map((note) => {
          const { line, head } = arrowPath(note);
          return (
            <g key={note.x}>
              <path d={line} />
              <path d={head} />
            </g>
          );
        })}
      </g>
      <g fill={INK} style={{ fontFamily: "var(--font-caveat)" }} textAnchor="middle">
        {notes.map((note) =>
          note.lines.map((line, i) => (
            <text key={`${note.x}-${i}`} x={note.x} y={note.y + i * 20} fontSize={i === 0 ? 22 : 17} opacity={i === 0 ? 1 : 0.8}>
              {line}
            </text>
          ))
        )}
      </g>
    </svg>
  );
}
