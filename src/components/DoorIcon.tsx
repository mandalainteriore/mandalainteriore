export default function DoorIcon({
  className,
  aperta = false,
}: {
  className?: string;
  aperta?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 60"
      className={className}
      aria-hidden="true"
    >
      {/* stone archway */}
      <path
        d="M4,56 V22 A16,16 0 0 1 36,22 V56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* closed door leaf */}
      <g
        className={`transition-opacity duration-500 ${aperta ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
      >
        <path
          d="M7,56 V23.5 A13,13 0 0 1 33,23.5 V56 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path d="M13,56 V26" stroke="currentColor" strokeWidth="0.75" />
        <path d="M20,56 V21.5" stroke="currentColor" strokeWidth="0.75" />
        <path d="M27,56 V26" stroke="currentColor" strokeWidth="0.75" />
        <circle
          cx="28"
          cy="40"
          r="1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>

      {/* door ajar */}
      <g
        className={`transition-opacity duration-500 ${aperta ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <path
          d="M7,56 V23.5 A13,13 0 0 1 26,23"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <path
          d="M7,23.5 Q12.5,19.5 17,24.5 V56 H7 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path d="M12,54 V28" stroke="currentColor" strokeWidth="0.6" />
        <circle
          cx="15.5"
          cy="40"
          r="1.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
}
