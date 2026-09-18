export default function Divider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <line x1="0" y1="10" x2="85" y2="10" strokeWidth="1" />
      <line x1="115" y1="10" x2="200" y2="10" strokeWidth="1" />
      <rect
        x="96"
        y="6"
        width="8"
        height="8"
        strokeWidth="1"
        transform="rotate(45 100 10)"
      />
    </svg>
  );
}
