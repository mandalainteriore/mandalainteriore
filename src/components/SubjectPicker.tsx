"use client";

import { useState } from "react";

const oggetti = [
  "Informazioni generali",
  "Counseling transpersonale",
  "Yoga Anukalana e meditazione",
  "Mandala – arteterapia",
  "Aromaterapia",
];

export default function SubjectPicker() {
  const [selected, setSelected] = useState(oggetti[0]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {oggetti.map((oggetto) => (
          <button
            key={oggetto}
            type="button"
            onClick={() => setSelected(oggetto)}
            className={`font-body rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
              selected === oggetto
                ? "bg-heading text-background border-heading"
                : "border-heading/30 hover:border-heading"
            }`}
          >
            {oggetto}
          </button>
        ))}
      </div>
      <input type="hidden" name="oggetto" value={selected} />
    </div>
  );
}
