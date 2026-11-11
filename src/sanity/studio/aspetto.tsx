"use client";

// Aspetto del pannello: logo e colori del sito.
import { buildLegacyTheme } from "sanity";
import MandalaLogo from "@/components/MandalaLogo";

const MARRONE = "#553b20";
const MARRONE_SCURO = "#321502";
const BEIGE = "#eddcc8";

export const tema = buildLegacyTheme({
  "--black": "#1f1309",
  "--white": "#fffdfa",
  "--gray-base": "#2b2118",
  "--gray": "#8a7a6a",
  "--component-bg": "#fffdfa",
  "--component-text-color": "#1f1309",
  "--brand-primary": MARRONE,
  "--focus-color": MARRONE,
  "--default-button-color": "#7a6a5a",
  "--default-button-primary-color": MARRONE,
  "--default-button-success-color": "#3f6b3a",
  "--default-button-warning-color": "#a8761c",
  "--default-button-danger-color": "#a33a2a",
  "--state-info-color": MARRONE,
  "--state-success-color": "#3f6b3a",
  "--state-warning-color": "#a8761c",
  "--state-danger-color": "#a33a2a",
  "--main-navigation-color": MARRONE_SCURO,
  "--main-navigation-color--inverted": BEIGE,
});

/** Logo del sito accanto al nome, in alto a sinistra nel pannello. */
export function Logo() {
  return (
    <span style={{ color: MARRONE, display: "inline-flex" }}>
      <MandalaLogo className="logo-pannello" />
      <style>{`.logo-pannello{height:1.6em;width:auto}`}</style>
    </span>
  );
}
