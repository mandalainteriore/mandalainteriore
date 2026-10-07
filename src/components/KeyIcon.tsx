export type Simbolo = "fiore-della-vita" | "pentagramma" | "esagramma";

const cx = 24;
const cy = 19;

function punti(n: number, r: number, offset = -90) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((offset + (360 / n) * i) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
}

function FioreDellaVita() {
  const r = 4.5;
  const centri: [number, number][] = [];
  for (let q = -3; q <= 3; q++) {
    for (let s = -3; s <= 3; s++) {
      const x = cx + r * (q + s / 2);
      const y = cy + r * s * (Math.sqrt(3) / 2);
      if (Math.hypot(x - cx, y - cy) <= r * 2.01) centri.push([x, y]);
    }
  }
  return (
    <>
      <clipPath id="key-fiore-clip">
        <circle cx={cx} cy={cy} r="13.5" />
      </clipPath>
      <g clipPath="url(#key-fiore-clip)" strokeWidth="0.8">
        {centri.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="13.5" strokeWidth="0.8" />
    </>
  );
}

function Pentagramma() {
  const p = punti(5, 13);
  const stella = [0, 2, 4, 1, 3].map((i) => p[i]).join(" ");
  return <polygon points={stella} strokeLinejoin="round" />;
}

function Esagramma() {
  return (
    <>
      <polygon points={punti(3, 12).join(" ")} strokeLinejoin="round" />
      <polygon points={punti(3, 12, 90).join(" ")} strokeLinejoin="round" />
    </>
  );
}

export default function KeyIcon({
  simbolo,
  className,
}: {
  simbolo: Simbolo;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 72"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx={cx} cy={cy} r="17" />
      {simbolo === "fiore-della-vita" && <FioreDellaVita />}
      {simbolo === "pentagramma" && <Pentagramma />}
      {simbolo === "esagramma" && <Esagramma />}

      <path d="M24,36 V69" />
      <path d="M24,57 H29 V61 H26.5 V63.5 H29 V67 H24" strokeLinejoin="round" />
    </svg>
  );
}
