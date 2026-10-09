import { createFileRoute } from "@tanstack/react-router";

import { CtaCaret, SiteFooter, SiteNav } from "@/components/site/chrome";
import { LeadForm } from "@/components/site/lead-form";
import { studio } from "@/lib/site-content";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a quote | Graphic Shark Studios" },
      {
        content:
          "Tell us about the business and what needs building. Website quotes from Graphic Shark Studios in Bass Lake, California.",
        name: "description",
      },
    ],
  }),
  component: Quote,
});

function Quote() {
  return (
    <main>
      <SiteNav />

      <div className="page-head">
        <div className="shell">
          <p className="eyebrow">Request a quote</p>
          <h1 className="page-title" data-reveal="">
            Tell us what you need
          </h1>
        </div>
      </div>

      <section className="form-section">
        <div className="shell form-shell">
          <LeadForm kind="quote" />

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
                <span>What happens next</span>
                We read it, then reply with a straight scope, a price and a
                start date. No discovery questionnaire first.
              </li>
              <li>
                <span>What we need from you</span>
                A few lines about the business and, if you have one, the current
                site address.
              </li>
              <li>
                <span>How we price</span>
                Fixed price per project, agreed before anything is built.
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
