const inner = {
  ascolto: (
    <path d="M24,15 C19,15 15,19 15,24 C15,29.5 19.5,33 24,36 C28.5,33 33,29.5 33,24 C33,19 29,15 24,15 Z" />
  ),
  accoglienza: (
    <path d="M24,14 V34 M14,24 H34 M17.5,17.5 L30.5,30.5 M30.5,17.5 L17.5,30.5" />
  ),
  presenza: (
    <>
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  trasformazione: (
    <path d="M24,15 C29,15 33,19 33,24 C33,29 29,33 24,33 M24,15 C19,15 15,19 15,24 C15,29 19,33 24,33 M24,15 V33" />
  ),
};

export default function PillarIcon({
  variant,
  className,
}: {
  variant: keyof typeof inner;
  className?: string;
}) {
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
      {inner[variant]}
    </svg>
  );
}
