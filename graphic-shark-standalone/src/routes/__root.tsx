import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
// Page metadata (browser <title>/favicon + social og: tags). Read at build time.
import appMetaJson from "../app-meta.json";
import { themeColor } from "../lib/site-content";

const DEFAULT_TITLE = "Graphic Shark Studios";
const DEFAULT_DESCRIPTION =
  "Websites, storefronts, print and digital media built in Bass Lake, California.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

// Build the document head (title / description / og: / twitter: / favicon).
// og_title and og_description double as the browser <title> and meta
// description; og_image_url also drives the twitter card image.
function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = meta.og_image_url ?? null;
  const favicon = meta.favicon_url ?? null;
  const ogVideo = meta.og_video_url ?? null;

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Graphic Shark Studios" },
      { name: "theme-color", content: themeColor },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Site type: Cabinet Grotesk display, Inter Tight body, JetBrains Mono
      // labels. Loaded from the foundries' own CDNs.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous" as const,
      },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      ...(favicon ? [{ rel: "icon", href: favicon }] : []),
      { rel: "apple-touch-icon", href: "/assets/brand/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="state-page">
      <p className="eyebrow">404</p>
      <h1 className="state-page__title">Nothing at this address</h1>
      <p className="state-page__text">
        The page you were looking for has moved or never existed. The work we
        have done is the best place to start again.
      </p>
      <div className="state-page__actions">
        <Link className="cta-slab" to="/">
          <span className="cta-slab__label">Back to the home page</span>
          <span aria-hidden="true" className="cta-slab__label cta-slab__label--ghost">
            Back to the home page
          </span>
        </Link>
        <Link className="cta-underline" to="/work">
          See the work
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="state-page">
      <p className="eyebrow">Something broke</p>
      <h1 className="state-page__title">This page did not load</h1>
      <p className="state-page__text">
        That is on us, not on you. Try again, or call the studio and we will
        sort it out.
      </p>
      <div className="state-page__actions">
        <button
          className="cta-slab"
          onClick={() => {
            void router.invalidate();
            reset();
          }}
          type="button"
        >
          <span className="cta-slab__label">Try again</span>
          <span aria-hidden="true" className="cta-slab__label cta-slab__label--ghost">
            Try again
          </span>
        </button>
        <a className="cta-underline" href="/">
          Back to the home page
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. */}
      <Outlet />
    </QueryClientProvider>
  );
}
