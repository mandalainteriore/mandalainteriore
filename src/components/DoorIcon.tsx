// Porta del giardino: arco di pietra con l'edera, ante chiuse che al passaggio
// (o con `aperta`) lasciano vedere un sentiero con un cipresso e il sole.

const centro = { x: 24, y: 26 };

// Foglia affusolata con la punta verso +x e una venatura centrale.
const foglia = "M0,0 C0.9,-1.5 2.6,-1.7 4,0 C2.6,1.7 0.9,1.5 0,0 Z";

// Posizioni delle foglie: [x, y, rotazione in gradi, scala].
function fogliaSuArco(gradi: number, r: number, verso: 1 | -1, scala = 1) {
  const a = (gradi * Math.PI) / 180;
  const x = centro.x + r * Math.cos(a);
  const y = centro.y + r * Math.sin(a);
  return [x, y, gradi + 90 * verso, scala] as const;
}

const foglie = [
  // Lungo il pilastro sinistro, dal basso verso l'alto
  [5.2, 54, 200, 0.9],
  [7.2, 49, -20, 1],
  [5, 44, 190, 1],
  [7.4, 39, -25, 0.9],
  [5.2, 34, 195, 1],
  // Sopra l'arco, da sinistra a destra
  fogliaSuArco(195, 19.6, -1),
  fogliaSuArco(212, 20.4, 1, 0.9),
  fogliaSuArco(228, 19.6, -1),
  fogliaSuArco(245, 20.6, 1, 1.1),
  fogliaSuArco(262, 19.8, -1, 0.9),
  fogliaSuArco(280, 20.6, 1),
  fogliaSuArco(298, 19.6, -1, 0.9),
  fogliaSuArco(318, 20.2, 1),
  fogliaSuArco(338, 19.6, -1, 0.8),
  // Qualche foglia che ricade sul pilastro destro
  [42.6, 31, 20, 0.9],
  [40.8, 36, 160, 0.8],
] as const;

export default function DoorIcon({
  className,
  aperta = false,
}: {
  className?: string;
  aperta?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Arco di pietra: bordo esterno, apertura e qualche giunto */}
      <path d="M6,60 V26 A18,18 0 0 1 42,26 V60" strokeWidth="1.8" />
      <path d="M10,60 V26 A14,14 0 0 1 38,26 V60" strokeWidth="1" />
      <path
        d="M6.6,20.5 L10.6,22 M10.5,13.5 L13.6,16.4 M17.4,9 L19,12.8 M30.6,9 L29,12.8 M37.5,13.5 L34.4,16.4 M41.4,20.5 L37.4,22 M6,38 H10 M6,50 H10 M38,38 H42 M38,50 H42"
        strokeWidth="0.7"
      />

      {/* Ante chiuse */}
      <g
        className={`transition-opacity duration-500 ${aperta ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
      >
        <path d="M10.5,60 V26 A13.5,13.5 0 0 1 37.5,26 V60 Z" fill="currentColor" fillOpacity="0.14" strokeWidth="0.9" />
        <path d="M24,12.5 V60" strokeWidth="0.9" />
        <path d="M17,15 V60 M31,15 V60" strokeWidth="0.5" />
        <path d="M10.5,33 H37.5 M10.5,51 H37.5" strokeWidth="0.9" />
        <circle cx="21.6" cy="42" r="1.3" strokeWidth="0.8" />
        <circle cx="26.4" cy="42" r="1.3" strokeWidth="0.8" />
      </g>

      {/* Ante aperte: sentiero, cipresso e sole */}
      <g
        className={`transition-opacity duration-500 ${aperta ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <circle cx="24" cy="22" r="3" strokeWidth="0.7" />
        <path d="M14.5,46 C18,43.5 21,42.5 24,42.5 C27,42.5 30,43.5 33.5,46" strokeWidth="0.5" strokeOpacity="0.6" />
        <path d="M15,60 L22.6,42.6 M33,60 L25.4,42.6" strokeWidth="0.8" />
        <path d="M17.6,54 H30.4 M19.4,49.5 H28.6 M20.8,46 H27.2" strokeWidth="0.4" strokeOpacity="0.7" />
        <path d="M29.5,42.6 C27.6,38 27.8,32 29.5,27.5 C31.2,32 31.4,38 29.5,42.6 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="0.6" />
        {/* Ante spalancate verso l'esterno */}
        <path d="M10.5,26.5 L14.5,29 V57.5 L10.5,60 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="0.9" />
        <path d="M37.5,26.5 L33.5,29 V57.5 L37.5,60 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="0.9" />
      </g>

      {/* Edera */}
      <path
        d="M6.2,57 C4,50 8,46 5.6,40 C4.2,35 6.4,30 6.8,24 M7.2,22 A18.6,18.6 0 0 1 41.6,22 C43,27 41.6,32 41.2,37"
        strokeWidth="0.6"
      />
      <g fill="currentColor" stroke="none">
        {foglie.map(([x, y, rot, scala], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${scala * 0.9})`}>
            <path d={foglia} />
            <path d="M0.4,0 H3.4" stroke="var(--background)" strokeWidth="0.35" />
          </g>
        ))}
      </g>

      {/* Terreno */}
      <path d="M2,60 H46" strokeWidth="0.9" />
    </svg>
  );
}
