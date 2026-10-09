import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { CtaFrame, CtaHint, SiteFooter, SiteNav } from "@/components/site/chrome";
import { projects, services, type ServiceId } from "@/lib/site-content";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our work | Graphic Shark Studios" },
      {
        content:
          "Websites, storefronts, identity and merch work from Graphic Shark Studios. Filter the archive by the service you need.",
        name: "description",
      },
    ],
  }),
  component: Work,
});

type Filter = "featured" | "all" | ServiceId;

const filters: { id: Filter; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "all", label: "Everything" },
  ...services.map((service) => ({ id: service.id as Filter, label: service.name })),
];

function Work() {
  const [filter, setFilter] = useState<Filter>("featured");

  const visible = useMemo(() => {
    if (filter === "featured") {
      return projects.filter((project) => project.featured);
    }
    if (filter === "all") {
      return projects;
    }
    return projects.filter((project) => project.services.includes(filter));
  }, [filter]);

  const activeLabel =
    filters.find((entry) => entry.id === filter)?.label ?? "Featured";

  return (
    <main>
      <SiteNav />

      <div className="page-head">
        <div className="shell">
          <h1 className="page-title" data-reveal="">
            Our work
          </h1>
          <p className="section-lede" data-reveal="18">
            Real builds for shops, outfitters and makers. Pick a service to see
            only that kind of work.
          </p>
        </div>
      </div>

      <section className="form-section">
        <div className="shell">
          <div className="filter-rail">
            <span className="filter-label">Filter</span>
            {filters.map((entry) => (
              <button
                className="filter-pill"
                data-on={entry.id === filter ? "true" : "false"}
                key={entry.id}
                onClick={() => setFilter(entry.id)}
                type="button"
              >
                {entry.label}
              </button>
            ))}
            <span className="filter-count">
              {visible.length} {visible.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {visible.length > 0 ? (
            <div className="archive-grid">
              {visible.map((project, index) => (
                <article
                  className="archive-item"
                  data-reveal={index % 2 === 0 ? "24" : "40"}
                  key={project.id}
                >
                  <div className={`archive-item__media ${project.ratio}`}>
                    <img
                      alt={project.alt}
                      height={900}
                      loading="lazy"
                      src={project.image}
                      width={1200}
                    />
                  </div>
                  <div>
                    <p className="archive-item__kind">{project.kind}</p>
                    <h2 className="archive-item__name">{project.name}</h2>
                    <ul className="archive-item__tags">
                      {project.services.map((id) => (
                        <li key={id}>
                          {services.find((service) => service.id === id)?.name ?? id}
                        </li>
                      ))}
                    </ul>
                    <p className="archive-item__year">Delivered {project.year}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="state-block">
              <h2 className="state-block__title">
                Nothing in {activeLabel} yet
              </h2>
              <p className="state-block__text">
                That service is live, the samples are still under wraps. We can
                walk you through close examples on a call instead of putting a
                client under a spotlight.
              </p>
              <CtaFrame
                hint="Fifteen minutes, no pitch deck"
                href="/demo"
                label="Request a demo"
              />
            </div>
          )}

          <div className="band__foot">
            <p className="band__line">Want yours in this list?</p>
            <CtaHint href="/quote" label="Start a project" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
