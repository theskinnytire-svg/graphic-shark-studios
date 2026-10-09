import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import {
  CtaFrame,
  CtaHint,
  CtaSlab,
  CtaUnderline,
  SiteFooter,
  SiteNav,
} from "@/components/site/chrome";
import { SiteMotion } from "@/components/site/motion";
import { phoneShots, projects, services, steps } from "@/lib/site-content";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <main>
      <SiteMotion />
      <SiteNav />

      <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />

      <section className="section" id="services">
        <div className="shell">
          <p className="eyebrow">What we do</p>
          <div className="section-head">
            <h2 className="section-title" data-reveal="">
              Seven things we do properly
            </h2>
            <p className="section-lede" data-reveal="18">
              One studio for the whole surface: the site buyers land on, the
              identity they remember, and the media that sells it.
            </p>
          </div>

          <div className="services-list">
            {services.map((service, index) => (
              <a
                className="service-row"
                href={`/quote?service=${service.id}`}
                key={service.id}
              >
                <span className="service-row__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-row__name">{service.name}</span>
                <span className="service-row__blurb">{service.blurb}</span>
                <span className="service-row__aside">
                  <img
                    alt=""
                    className="service-row__icon"
                    height={30}
                    loading="lazy"
                    src={service.icon}
                    width={30}
                  />
                  <span aria-hidden="true" className="service-row__arrow">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--lifted">
        <div className="shell">
          <div className="section-head">
            <h2 className="section-title" data-reveal="">
              Work we can show
            </h2>
            <CtaHint href="/work" label="See all work" />
          </div>

          <div className="work-masonry">
            {featured.map((project, index) => (
              <a
                className={`work-tile work-tile--${["a", "b", "c", "d"][index] ?? "a"}`}
                data-reveal={index % 2 === 0 ? "26" : "44"}
                href="/work"
                key={project.id}
              >
                <span className={`work-tile__media ${project.ratio}`}>
                  <img
                    alt={project.alt}
                    height={720}
                    loading="lazy"
                    src={project.image}
                    width={1080}
                  />
                  <span className="work-tile__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="work-tile__meta">
                  <span className="work-tile__name">{project.name}</span>
                  <span>{project.kind}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section mobile-field">
        <div aria-hidden="true" className="mobile-field__plate" />
        <div className="shell">
          <img
            alt=""
            className="mobile-glyph"
            height={34}
            loading="lazy"
            src="/assets/icons/icon-08.png"
            width={34}
          />
          <h2 className="section-title" data-reveal="">
            Looks unreal on the phone
          </h2>
          <p className="section-lede" data-reveal="20">
            Most people meet your business on a phone, in a parking lot, on one
            bar of signal. We design that screen first and the desktop looks
            after itself.
          </p>

          <div className="mobile-grid">
            {phoneShots.map((shot, index) => (
              <div
                className="phone"
                data-reveal={String(30 + index * 14)}
                key={shot.caption}
              >
                <div className="phone__screen">
                  <img
                    alt={`A Graphic Shark Studios build shown on a phone: ${shot.caption}.`}
                    height={844}
                    loading="lazy"
                    src={shot.image}
                    width={390}
                  />
                </div>
                <p className="phone__caption">{shot.caption}</p>
              </div>
            ))}
          </div>

          <div className="mobile-actions">
            <CtaFrame
              hint="We will load it on your phone"
              href="/demo"
              label="Request a demo"
            />
            <CtaUnderline href="/work" label="See the work" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">How it works</p>
          <div className="section-head">
            <h2 className="section-title" data-reveal="">
              Four steps, no mystery
            </h2>
          </div>

          <div className="process-list">
            {steps.map((step) => (
              <div className="step" data-reveal="22" key={step.n}>
                <span aria-hidden="true" className="step__num">
                  {step.n}
                </span>
                <div>
                  <h3 className="step__name">{step.name}</h3>
                  <p className="step__text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div aria-hidden="true" className="band__plate" />
        <div className="shell band__inner">
          <div className="marquee" aria-hidden="true">
            <div className="marquee__track">
              {[0, 1].map((copy) => (
                <div className="marquee__track" key={copy}>
                  <span className="marquee__item">Graphic Shark Studios</span>
                  <span className="marquee__item marquee__item--solid">
                    Decks, tees, stickers
                  </span>
                  <span className="marquee__item">Websites and media</span>
                  <span className="marquee__item marquee__item--solid">
                    Bass Lake, California
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="merch-frames">
            <div className="merch-frame ratio-4-3" data-reveal="20">
              <img
                alt="Four geometric logo marks designed for a supply brand, printed in magenta and cobalt on a dark ground."
                height={900}
                loading="lazy"
                src="/assets/work/project-identity.webp"
                width={1200}
              />
            </div>
            <div className="merch-frame merch-frame--drop ratio-3-4" data-drift="34">
              <img
                alt="Screen printed skateboard deck graphics in magenta and cobalt halftone."
                height={1168}
                loading="lazy"
                src="/assets/work/project-decks.webp"
                width={880}
              />
            </div>
            <div className="merch-frame ratio-3-4" data-reveal="34">
              <img
                alt="Vertical review film frame of a skater mid air under magenta and cobalt light."
                height={1600}
                loading="lazy"
                src="/assets/work/project-film.webp"
                width={900}
              />
            </div>
          </div>

          <div className="band__foot">
            <p className="band__line">
              If it carries your name, we design it
            </p>
            <CtaHint href="/work" label="See how we do it" />
          </div>
        </div>
      </section>

      <section className="closing">
        <div aria-hidden="true" className="closing__plate" />
        <div className="shell closing__inner">
          <h2 className="closing__title" data-reveal="">
            Tell us what you are building
          </h2>
          <p className="closing__lede" data-reveal="18">
            Send the basics and you get a straight answer on scope, timing and
            cost. Usually the same day.
          </p>
          <div className="closing__actions">
            <CtaSlab href="/quote" />
            <CtaUnderline href="/demo" label="Request a demo" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
