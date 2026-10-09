import { createFileRoute } from "@tanstack/react-router";

const pages = ["/", "/work", "/quote", "/demo"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const today = new Date().toISOString().split("T")[0];
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...pages.map((page) =>
            [
              "  <url>",
              `    <loc>${origin}${page}</loc>`,
              `    <lastmod>${today}</lastmod>`,
              page === "/"
                ? "    <changefreq>weekly</changefreq>"
                : "    <changefreq>monthly</changefreq>",
              page === "/" ? "    <priority>1.0</priority>" : "    <priority>0.7</priority>",
              "  </url>",
            ].join("\n")
          ),
          "</urlset>",
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
