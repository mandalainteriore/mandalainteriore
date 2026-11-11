"use client";

import { useEffect } from "react";
import type { LayoutProps } from "sanity";
import { STUDIO_PRONTO } from "./CaricamentoStudio";

/** Avvisa il loader che il pannello è comparso. */
export function LayoutStudio(props: LayoutProps) {
  useEffect(() => {
    window.dispatchEvent(new Event(STUDIO_PRONTO));
  }, []);
  return props.renderDefault(props);
}
