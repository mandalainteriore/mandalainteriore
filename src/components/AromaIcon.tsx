export default function AromaIcon({ className }: { className?: string }) {
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
      <path d="M24,14 C24,14 17,23 17,29 a7,7 0 0 0 14,0 C31,23 24,14 24,14 Z" />
    </svg>
  );
}
