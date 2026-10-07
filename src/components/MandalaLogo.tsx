import { useId } from "react";

const base = { x: 32, y: 50 };
const cerchio = { cx: 32, cy: 17, r: 11 };

function petalo(dx: number, lunghezza: number, larghezza: number, angolo: number) {
  const x = base.x + dx;
  const y = base.y;
  const L = lunghezza;
  const w = larghezza;
  const d = `M${x},${y} C${x - w * 1.25},${y - L * 0.4} ${x - w * 0.55},${y - L * 0.8} ${x},${y - L} C${x + w * 0.55},${y - L * 0.8} ${x + w * 1.25},${y - L * 0.4} ${x},${y} Z`;
  return { d, angolo, origine: `${x} ${y}` };
}

// Petali dal fondo verso il davanti: ogni strato nasconde le linee di quelli dietro.
const strati = [
  [
    petalo(-3, 17, 4, -80),
    petalo(3, 17, 4, 80),
    petalo(-3, 18, 5, -54),
    petalo(3, 18, 5, 54),
  ],
  [petalo(-2, 20, 5.5, -27), petalo(2, 20, 5.5, 27)],
  [petalo(0, 21, 8, 0)],
];

function Petali({ strato }: { strato: (typeof strati)[number] }) {
  return (
    <>
      {strato.map(({ d, angolo, origine }) => (
        <path key={angolo} d={d} transform={`rotate(${angolo} ${origine})`} />
      ))}
    </>
  );
}

function pentagramma() {
  const p = Array.from({ length: 5 }, (_, i) => {
    const a = ((-90 + 72 * i) * Math.PI) / 180;
    return `${(cerchio.cx + 10 * Math.cos(a)).toFixed(2)},${(cerchio.cy + 10 * Math.sin(a)).toFixed(2)}`;
  });
  return [0, 2, 4, 1, 3].map((i) => p[i]).join(" ");
}

export default function MandalaLogo({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // Maschera i-esima: nasconde tutto ciò che sta dietro gli strati di petali da i in poi.
  const maschera = (i: number) => `${id}-m${i}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {[0, 1, 2].map((i) => (
          <mask key={i} id={maschera(i)} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
            <rect width="64" height="64" fill="white" stroke="none" />
            <g fill="black" stroke="black" strokeWidth="1">
              {strati.slice(i).map((strato, j) => (
                <Petali key={j} strato={strato} />
              ))}
            </g>
          </mask>
        ))}
      </defs>

      <path d="M32,1 L33,2.6 L32,4.2 L31,2.6 Z" fill="currentColor" stroke="none" />

      <g mask={`url(#${maschera(0)})`}>
        <circle cx={cerchio.cx} cy={cerchio.cy} r={cerchio.r} />
        <polygon points={pentagramma()} />
        <path d="M12,51.5 A20,3.2 0 0 0 52,51.5" />
        <path d="M18,56 A14,2.2 0 0 0 46,56" strokeWidth="0.8" />
      </g>

      <g mask={`url(#${maschera(1)})`}>
        <Petali strato={strati[0]} />
      </g>
      <g mask={`url(#${maschera(2)})`}>
        <Petali strato={strati[1]} />
      </g>
      <Petali strato={strati[2]} />

      <circle cx="32" cy="60" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
