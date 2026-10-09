import { createFileRoute } from "@tanstack/react-router";

import { CtaCaret, SiteFooter, SiteNav } from "@/components/site/chrome";
import { LeadForm } from "@/components/site/lead-form";
import { studio } from "@/lib/site-content";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Request a demo | Graphic Shark Studios" },
      {
        content:
          "See a working site, storefront or review film on your own phone before you commit to anything. Demos from Graphic Shark Studios.",
        name: "description",
      },
    ],
  }),
  component: Demo,
});

function Demo() {
  return (
    <main>
      <SiteNav />

      <div className="page-head">
        <div className="shell">
          <p className="eyebrow">Request a demo</p>
          <h1 className="page-title" data-reveal="">
            See it on your own phone
          </h1>
        </div>
      </div>

      <section className="form-section">
        <div className="shell form-shell">
          <LeadForm kind="demo" />

          <aside className="proof-rail">
            <img
              alt=""
              className="proof-mark"
              height={64}
              src="/assets/brand/mark-512.png"
              width={64}
            />
            <ul className="proof-list">
              <li>
                <span>Fifteen minutes</span>
                A screen share and a walk through real builds on a real phone,
                not a slide deck.
              </li>
              <li>
                <span>Bring a competitor</span>
                Send a site you like or one you cannot stand and we will talk
                through what we would change.
              </li>
              <li>
                <span>No obligation</span>
                If we are not the right fit, we will say so on the call.
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <CtaCaret external href={studio.phoneHref} label={studio.phone} />
              </li>
              <li>
                <CtaCaret external href={studio.emailHref} label={studio.email} />
              </li>
            </ul>
            <p className="footer-place">{studio.location}</p>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
