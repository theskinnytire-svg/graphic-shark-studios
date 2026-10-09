/**
 * All of the site's copy and structure lives here so it can be updated in one
 * place without touching layout code.
 */

/** Brand ground, used for the browser theme colour. */
export const themeColor = "#0b0a0f";

export const studio = {
  name: "Graphic Shark Studios",
  shortName: "Graphic Shark",
  tagline: "Websites and digital media, built in Bass Lake, California.",
  location: "Bass Lake, California",
  phone: "559-352-3878",
  phoneHref: "tel:+15593523878",
  email: "tyler@graphicsharkstudios.com",
  emailHref: "mailto:tyler@graphicsharkstudios.com",
};

export type ServiceId =
  | "brochure"
  | "ecommerce"
  | "print"
  | "ai-content"
  | "ai-video"
  | "logo"
  | "merch";

export interface Service {
  id: ServiceId;
  name: string;
  blurb: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "brochure",
    name: "Brochure websites",
    blurb: "Four to eight pages that load fast, read well and tell a buyer what to do next.",
    icon: "/assets/icons/icon-01.png",
  },
  {
    id: "ecommerce",
    name: "E-commerce websites",
    blurb: "Real storefronts with products, cart, checkout and orders you can manage yourself.",
    icon: "/assets/icons/icon-02.png",
  },
  {
    id: "print",
    name: "Print and digital media",
    blurb: "Decks, flyers, banners and social sets. One look, every surface.",
    icon: "/assets/icons/icon-03.png",
  },
  {
    id: "ai-content",
    name: "AI generated content",
    blurb: "Images, video and product shots art directed to your brand, never generic.",
    icon: "/assets/icons/icon-04.png",
  },
  {
    id: "ai-video",
    name: "AI influencer review videos",
    blurb: "Creator style review videos for your product, produced without a shoot day.",
    icon: "/assets/icons/icon-05.png",
  },
  {
    id: "logo",
    name: "Logo design",
    blurb: "Marks that survive a shirt, a deck, a storefront sign and a 16 pixel favicon.",
    icon: "/assets/icons/icon-06.png",
  },
  {
    id: "merch",
    name: "Merch design",
    blurb: "Apparel and hard goods designed to actually sell, not to sit in a box.",
    icon: "/assets/icons/icon-07.png",
  },
];

export interface Project {
  id: string;
  name: string;
  kind: string;
  year: string;
  services: ServiceId[];
  image: string;
  alt: string;
  ratio: "ratio-16-9" | "ratio-4-3" | "ratio-3-4" | "ratio-21-9";
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "ridgeline-cycles",
    name: "Ridgeline Cycles",
    kind: "Brochure website",
    year: "2026",
    services: ["brochure"],
    image: "/assets/work/project-brochure.webp",
    alt: "Dark brochure website design for a mountain bike shop, built around one big halftone photograph.",
    ratio: "ratio-16-9",
    featured: true,
  },
  {
    id: "ironridge-workwear",
    name: "Ironridge Workwear",
    kind: "Storefront and checkout",
    year: "2026",
    services: ["ecommerce", "brochure"],
    image: "/assets/work/project-storefront.webp",
    alt: "Dark e-commerce storefront with a four tile product grid and a full width cart bar.",
    ratio: "ratio-16-9",
    featured: true,
  },
  {
    id: "harbor-line-supply",
    name: "Harbor Line Supply",
    kind: "Identity and marks",
    year: "2025",
    services: ["logo", "print"],
    image: "/assets/work/project-identity.webp",
    alt: "Four bold geometric logo marks printed in magenta and cobalt on a dark studio ground.",
    ratio: "ratio-4-3",
    featured: true,
  },
  {
    id: "halfmoon-deck-co",
    name: "Halfmoon Deck Co.",
    kind: "Deck and apparel graphics",
    year: "2026",
    services: ["merch", "print"],
    image: "/assets/work/project-decks.webp",
    alt: "Three skateboard decks screen printed with halftone graphics in magenta and cobalt.",
    ratio: "ratio-3-4",
    featured: false,
  },
  {
    id: "sierra-rope-co",
    name: "Sierra Rope Co.",
    kind: "Creator review film",
    year: "2026",
    services: ["ai-video", "ai-content"],
    image: "/assets/work/project-film.webp",
    alt: "Vertical video frame of a skateboarder mid air, lit hard magenta from one side and cobalt from the other.",
    ratio: "ratio-3-4",
    featured: true,
  },
  {
    id: "basecamp-posters",
    name: "Basecamp Poster Series",
    kind: "Print campaign",
    year: "2025",
    services: ["print", "ai-content"],
    image: "/assets/plates/plate-riso.webp",
    alt: "Riso printed poster texture with magenta and cobalt ink layers slightly out of registration.",
    ratio: "ratio-21-9",
    featured: false,
  },
];

export interface Step {
  n: string;
  name: string;
  text: string;
}

export const steps: Step[] = [
  {
    n: "01",
    name: "We dig into the business",
    text: "One call. Who buys, what they need to see before they call you, and what your competition is missing.",
  },
  {
    n: "02",
    name: "We design every page first",
    text: "You see the whole site as pictures before any code exists. No surprises halfway through the build.",
  },
  {
    n: "03",
    name: "We build it phone first",
    text: "Small screens first, then desktop. Real devices, real connections, working forms and real product pages.",
  },
  {
    n: "04",
    name: "You get the keys",
    text: "The site is yours to run. Tell us what to change and the change goes live, no rebuilds and no exports.",
  },
];

export const navLinks = [
  { to: "/work", label: "Our work" },
  { to: "/quote", label: "Request a quote" },
  { to: "/demo", label: "Request a demo" },
] as const;

export const phoneShots = [
  {
    image: "/assets/work/project-storefront.webp",
    caption: "Storefront, 390px",
  },
  {
    image: "/assets/work/project-brochure.webp",
    caption: "Brochure site, thumb reach",
  },
  {
    image: "/assets/work/project-film.webp",
    caption: "Review film, vertical",
  },
];

export function serviceName(id: ServiceId): string {
  return services.find((service) => service.id === id)?.name ?? id;
}
