// Hand-drawn style cake illustrations, drawn as SVG so every sponge/filling combination is
// generated from colours instead of separate image files. The "crayon" look comes from SVG
// filters (wobbly outlines + grainy fill) and a light hatching pattern.

const INK = "#4a2e22";

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

function Sponge({ x1, x2, top, bottom, body, seed }) {
  const rand = seeded(seed);
  const d = bandPath(x1, x2, top, bottom, seed);
  const holes = Array.from({ length: Math.round(((x2 - x1) * (bottom - top)) / 260) }, () => ({
    cx: x1 + 6 + rand() * (x2 - x1 - 12),
    cy: top + 5 + rand() * (bottom - top - 10),
    r: 0.8 + rand() * 1.8,
  }));
  return (
    <g>
      <path d={d} fill={body.sponge} stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {holes.map((hole, i) => (
        <ellipse key={i} cx={hole.cx} cy={hole.cy} rx={hole.r * 1.4} ry={hole.r} fill={body.crumb} opacity="0.55" />
      ))}
      <path d={d} fill="url(#crayon-hatch)" />
    </g>
  );
}

function Filling({ x1, x2, top, bottom, filling, seed }) {
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
      <path d={d} fill={filling.cream} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {bits.map((bit, i) => (
        <circle key={i} cx={bit.cx} cy={bit.cy} r={bit.r} fill={filling.bits} stroke={INK} strokeWidth="0.8" strokeOpacity="0.6" />
      ))}
    </g>
  );
}

// Square cross-section tile, like a flavour swatch on a menu
export function CakeTile({ body, filling, className }) {
  const x1 = 14;
  const x2 = 106;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g filter="url(#crayon-sm)">
        <Sponge x1={x1} x2={x2} top={18} bottom={40} body={body} seed={11} />
        <Filling x1={x1} x2={x2} top={40} bottom={50} filling={filling} seed={12} />
        <Sponge x1={x1} x2={x2} top={50} bottom={72} body={body} seed={13} />
        <Filling x1={x1} x2={x2} top={72} bottom={82} filling={filling} seed={14} />
        <Sponge x1={x1} x2={x2} top={82} bottom={102} body={body} seed={15} />
      </g>
    </svg>
  );
}

// Whole cake cut open to show the layers, with handwritten notes pointing at them
export function CakePreview({ body, filling, className }) {
  const x1 = 130;
  const x2 = 390;
  const sprinkles = ["#e98b9b", "#f2c14e", "#8fbf9f", "#9db4e0", "#e98b9b", "#f2c14e", "#8fbf9f"];
  return (
    <svg viewBox="0 0 520 380" className={className} role="img" aria-label={`${body.name} sponge with ${filling.name} filling`}>
      <g filter="url(#crayon)">
        {/* Plate */}
        <ellipse cx="260" cy="338" rx="190" ry="22" fill="#fffaf3" stroke={INK} strokeWidth="2.5" />
        <ellipse cx="260" cy="334" rx="150" ry="12" fill="none" stroke={INK} strokeOpacity="0.25" strokeWidth="1.5" />

        <Sponge x1={x1} x2={x2} top={118} bottom={176} body={body} seed={21} />
        <Filling x1={x1} x2={x2} top={176} bottom={198} filling={filling} seed={22} />
        <Sponge x1={x1} x2={x2} top={198} bottom={256} body={body} seed={23} />
        <Filling x1={x1} x2={x2} top={256} bottom={278} filling={filling} seed={24} />
        <Sponge x1={x1} x2={x2} top={278} bottom={330} body={body} seed={25} />

        {/* Cream top with drips and piped dollops */}
        <path
          d={`M${x1 - 4},121 C${x1 - 6},104 ${x1 + 10},96 ${x1 + 30},96 L${x2 - 30},96 C${x2 - 10},96 ${x2 + 6},104 ${x2 + 4},121
              C${x2 - 6},136 ${x2 - 16},126 ${x2 - 26},134 C${x2 - 34},150 ${x2 - 46},150 ${x2 - 50},132
              C${x2 - 80},124 ${x2 - 100},140 ${x2 - 116},128 C${x2 - 128},156 ${x2 - 146},156 ${x2 - 150},130
              C${x1 + 90},124 ${x1 + 70},144 ${x1 + 52},130 C${x1 + 40},148 ${x1 + 24},146 ${x1 + 20},128 C${x1 + 10},132 ${x1 - 2},132 ${x1 - 4},121 Z`}
          fill="#fffaf0"
          stroke={INK}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {[150, 205, 260, 315, 370].map((cx) => (
          <g key={cx}>
            <path
              d={`M${cx - 16},98 C${cx - 18},80 ${cx - 4},82 ${cx},70 C${cx + 4},82 ${cx + 18},80 ${cx + 16},98 Z`}
              fill="#fffaf0"
              stroke={INK}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d={`M${cx - 8},90 C${cx - 2},86 ${cx + 2},86 ${cx + 8},90`} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.5" />
          </g>
        ))}
        {filling.bits && [175, 230, 290, 345].map((cx) => (
          <circle key={cx} cx={cx} cy="74" r="6" fill={filling.bits} stroke={INK} strokeWidth="1.5" />
        ))}
        {sprinkles.map((color, i) => (
          <line key={i} x1={150 + i * 36} y1={108 + (i % 2) * 4} x2={156 + i * 36} y2={104 + (i % 2) * 4} stroke={color} strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>

      {/* Handwritten notes */}
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M112,150 C96,170 98,200 126,214" />
        <path d="M118,206 L127,215 L114,218" />
        <path d="M452,152 C458,176 436,192 402,188" />
        <path d="M410,181 L401,188 L411,195" />
      </g>
      <g fill={INK} style={{ fontFamily: "var(--font-caveat)" }} textAnchor="middle">
        <text x="70" y="122" fontSize="22">{body.name}</text>
        <text x="70" y="142" fontSize="15" opacity="0.75">sponge · {body.chinese}</text>
        <text x="455" y="122" fontSize="22">{filling.name}</text>
        <text x="455" y="142" fontSize="15" opacity="0.75">filling · {filling.chinese}</text>
      </g>
    </svg>
  );
}
