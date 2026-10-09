/**
 * Scene data for the scroll-scrub journey.
 *
 * Single-shot: ONE entry, whose clip is the single continuous film. Chapter
 * copy for the journey lives on that scene; the rest of the page is composed
 * as ordinary semantic sections in `src/routes/index.tsx`.
 *
 * Keep this array a module constant. Changing its identity rebuilds the
 * media controller.
 */
import { createElement } from "react";

import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";
import { CtaSlab, CtaUnderline } from "@/components/site/chrome";

/** Brand tokens for the journey layer. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#ff2d6f",
  background: "#0b0a0f",
  ink: "#f4efe7",
  muted: "#8b8aa0",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    actions: createElement(
      "div",
      { className: "gs-hero-actions" },
      createElement(CtaSlab, { href: "/quote", label: "Request a quote" }),
      createElement(CtaUnderline, { href: "/work", label: "See the work" })
    ),
    body:
      "Brochure sites, full storefronts, print, merch and AI media. One studio, one look, every screen a customer picks up.",
    clip: "/assets/world/scene-01.mp4",
    id: "the-part",
    kicker: "Bass Lake, California",
    label: "The part",
    linger: 0.2,
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    objectPosition: "50% 50%",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 3.4,
    title: "We build sites that move",
  },
];
