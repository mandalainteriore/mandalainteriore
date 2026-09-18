export default function KeyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="24" cy="24" r="22" strokeWidth="1" />
      <circle cx="19" cy="19" r="6.5" />
      <circle cx="19" cy="19" r="2" />
      <path d="M23.5,23.5 L33,33" />
      <path d="M29,29 L29,33" />
      <path d="M32,32 L32,35" />
    </svg>
  );
}
