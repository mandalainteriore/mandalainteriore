export default function MandalaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" />
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="4" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 32 + 14 * Math.cos(angle);
        const y1 = 32 + 14 * Math.sin(angle);
        const x2 = 32 + 30 * Math.cos(angle);
        const y2 = 32 + 30 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 32 + 22 * Math.cos(angle);
        const y = 32 + 22 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="2.5" />;
      })}
    </svg>
  );
}
