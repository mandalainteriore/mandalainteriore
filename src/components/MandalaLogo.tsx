import { useId } from "react";

// Coordinate nel viewBox 0 0 86 106.
const asse = 43;
const cerchio = { cy: 39.5, r: 14 };
const arco = { cy: 41, r: 25 };
const base = { x: asse, y: 80 };

function petalo(lunghezza: number, larghezza: number, angolo: number) {
  const { x, y } = base;
  const L = lunghezza;
  const w = larghezza;
  const d = `M${x},${y} C${x - w * 1.25},${y - L * 0.4} ${x - w * 0.55},${y - L * 0.8} ${x},${y - L} C${x + w * 0.55},${y - L * 0.8} ${x + w * 1.25},${y - L * 0.4} ${x},${y} Z`;
  return { d, angolo };
}

// Petali dal fondo verso il davanti: ogni strato nasconde le linee di quelli dietro.
const strati = [
  [petalo(25, 7.5, -64), petalo(25, 7.5, 64)],
  [petalo(25, 8.5, -33), petalo(25, 8.5, 33)],
  [petalo(27, 10.5, 0)],
];

function Petali({
  strato,
  velati = false,
}: {
  strato: (typeof strati)[number];
  velati?: boolean;
}) {
  return (
    <>
      {strato.map(({ d, angolo }) => (
        <path
          key={angolo}
          d={d}
          transform={`rotate(${angolo} ${base.x} ${base.y})`}
          fill={velati ? "currentColor" : undefined}
          fillOpacity={velati ? 0.16 : undefined}
        />
      ))}
    </>
  );
}

function puntoSuArco(gradi: number) {
  const a = (gradi * Math.PI) / 180;
  return [asse + arco.r * Math.cos(a), arco.cy + arco.r * Math.sin(a)] as const;
}

// Tratto d'arco tra due angoli (in gradi, y verso il basso), percorso in senso antiorario.
function tratto(da: number, a: number) {
  const [x1, y1] = puntoSuArco(da);
  const [x2, y2] = puntoSuArco(a);
  const sweep = a > da ? 1 : 0;
  return `M${x1.toFixed(2)},${y1.toFixed(2)} A${arco.r},${arco.r} 0 0 ${sweep} ${x2.toFixed(2)},${y2.toFixed(2)}`;
}

const trattiArco = [tratto(-104, -174), tratto(-186, -212), tratto(-76, -6), tratto(6, 32)];
const puntiArco = [
  { g: -104, r: 0.7 },
  { g: -212, r: 0.7 },
  { g: -76, r: 0.7 },
  { g: 32, r: 0.7 },
  { g: 180, r: 1.4 },
  { g: 0, r: 1.4 },
];

function pentagramma() {
  const p = Array.from({ length: 5 }, (_, i) => {
    const a = ((-90 + 72 * i) * Math.PI) / 180;
    return `${(asse + 13.2 * Math.cos(a)).toFixed(2)},${(cerchio.cy + 13.2 * Math.sin(a)).toFixed(2)}`;
  });
  return [0, 2, 4, 1, 3].map((i) => p[i]).join(" ");
}

export default function MandalaLogo({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // Maschera i-esima: nasconde tutto ciò che sta dietro gli strati di petali da i in poi.
  const maschera = (i: number) => `${id}-m${i}`;

  return (
    <svg
      viewBox="0 0 86 106"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {[0, 1, 2].map((i) => (
          <mask key={i} id={maschera(i)} maskUnits="userSpaceOnUse" x="0" y="0" width="86" height="106">
            <rect width="86" height="106" fill="white" stroke="none" />
            <g fill="black" stroke="black" strokeWidth="1.4">
              {strati.slice(i).map((strato, j) => (
                <Petali key={j} strato={strato} />
              ))}
            </g>
          </mask>
        ))}
      </defs>

      <g fill="currentColor" stroke="none">
        {/* Punti sull'asse, in alto e in basso */}
        <circle cx={asse} cy="5.8" r="0.9" />
        <circle cx={asse} cy="10.8" r="1.5" />
        <circle cx={asse} cy="17.8" r="2.2" />
        <circle cx={asse} cy="91.5" r="2.1" />
        <circle cx={asse} cy="97.8" r="1.4" />
        <circle cx={asse} cy="102.6" r="0.8" />
        {/* Rombo al centro delle onde */}
        <path d={`M${asse},83.6 L${asse + 1.9},85.5 L${asse},87.4 L${asse - 1.9},85.5 Z`} />
        {puntiArco.map(({ g, r }) => {
          const [x, y] = puntoSuArco(g);
          return <circle key={g} cx={x} cy={y} r={r} />;
        })}
      </g>

      <g mask={`url(#${maschera(0)})`}>
        {trattiArco.map((d) => (
          <path key={d} d={d} strokeWidth="1" />
        ))}
        <circle cx={asse} cy={cerchio.cy} r={cerchio.r} strokeWidth="1.6" />
        <polygon points={pentagramma()} />
        {/* Onde sotto il loto */}
        <path d={`M5,73 C14,71 22,78 30,80.5 C35,82 40,82.5 ${asse},82.5 C46,82.5 51,82 56,80.5 C64,78 72,71 81,73`} />
        <path d={`M26,85.5 C32,84.4 38,84.6 ${asse - 2},85.4 M${asse + 2},85.4 C48,84.6 54,84.4 60,85.5`} strokeWidth="1.1" />
      </g>

      <g mask={`url(#${maschera(1)})`}>
        <Petali strato={strati[0]} velati />
      </g>
      <g mask={`url(#${maschera(2)})`}>
        <Petali strato={strati[1]} velati />
      </g>
      <Petali strato={strati[2]} />
    </svg>
  );
}
