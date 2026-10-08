export type Simbolo = "fiore-della-vita" | "pentagramma" | "esagramma";

// Testa della chiave: centro dell'anello e raggio utile per il simbolo interno.
const cx = 24;
const cy = 20;
const rSimbolo = 12;

function punti(n: number, r: number, offset = -90) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((offset + (360 / n) * i) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
}

// Sette cerchi intrecciati (seme della vita) dentro un cerchio: a questa
// dimensione resta leggibile, mentre il fiore completo diventa una macchia.
function FioreDellaVita() {
  const r = rSimbolo / 2;
  const centri: [number, number][] = [
    [cx, cy],
    ...Array.from({ length: 6 }, (_, i): [number, number] => {
      const a = ((-90 + 60 * i) * Math.PI) / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }),
  ];
  return (
    <g strokeWidth="1.5">
      {centri.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
      <circle cx={cx} cy={cy} r={rSimbolo} />
    </g>
  );
}

function Pentagramma() {
  const p = punti(5, rSimbolo);
  const stella = [0, 2, 4, 1, 3].map((i) => p[i]).join(" ");
  return <polygon points={stella} strokeWidth="2.2" />;
}

function Esagramma() {
  return (
    <g strokeWidth="2.2">
      <polygon points={punti(3, rSimbolo).join(" ")} />
      <polygon points={punti(3, rSimbolo, 90).join(" ")} />
    </g>
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
      viewBox="0 0 48 80"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
    >
      {/* Anello: fascia spessa con un filo sottile all'interno */}
      <circle cx={cx} cy={cy} r="16.6" strokeWidth="3.6" />
      <circle cx={cx} cy={cy} r="13.6" strokeWidth="0.9" />

      {simbolo === "fiore-della-vita" && <FioreDellaVita />}
      {simbolo === "pentagramma" && <Pentagramma />}
      {simbolo === "esagramma" && <Esagramma />}

      <g fill="currentColor" stroke="none">
        {/* Collarino sotto l'anello */}
        <rect x="19" y="37.5" width="10" height="3.2" rx="1.6" />
        {/* Gambo */}
        <rect x="21.8" y="40" width="4.4" height="35" rx="1.2" />
        {/* Fascetta a metà gambo */}
        <rect x="20" y="51" width="8" height="2.6" rx="1.3" />
        {/* Mappa con due denti */}
        <path d="M25,61 H33 a1,1 0 0 1 1,1 V65 a1,1 0 0 1 -1,1 H29.5 V68.5 H33 a1,1 0 0 1 1,1 V73 a1,1 0 0 1 -1,1 H25 Z" />
      </g>
    </svg>
  );
}
