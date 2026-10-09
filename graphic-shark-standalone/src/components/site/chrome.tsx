import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { navLinks, studio } from "@/lib/site-content";

/** Routes that can be reached through the router without a full page load. */
export type SiteHref = "/" | "/work" | "/quote" | "/demo";

interface CtaProps {
  href: SiteHref;
  label: string;
}

interface CtaSlabProps {
  href: SiteHref;
  label?: string;
}

/* ------------------------------------------------------------------ */
/* Bespoke CTA garments. Each one is its own component with its own     */
/* interaction identity. There is deliberately no shared button style.  */
/* ------------------------------------------------------------------ */

export function CtaSlab({ href, label = "Request a quote" }: CtaSlabProps) {
  return (
    <Link className="cta-slab" to={href}>
      <span className="cta-slab__label">{label}</span>
      <span aria-hidden="true" className="cta-slab__label cta-slab__label--ghost">
        {label}
      </span>
    </Link>
  );
}

export function CtaUnderline({ href, label }: CtaProps) {
  return (
    <Link className="cta-underline" to={href}>
      {label}
    </Link>
  );
}

export function CtaNav({ label = "Request a quote" }: { label?: string }) {
  return (
    <Link className="cta-nav" to="/quote">
      <span aria-hidden="true" className="cta-nav__tick" />
      {label}
    </Link>
  );
}

export function CtaFrame({
  href,
  label,
  hint,
}: CtaProps & { hint: string }) {
  return (
    <Link className="cta-frame" to={href}>
      <span className="cta-frame__label">{label}</span>
      <span className="cta-frame__hint">{hint}</span>
    </Link>
  );
}

export function CtaHint({ href, label }: CtaProps) {
  return (
    <Link className="cta-hint" to={href}>
      {label}
      <span aria-hidden="true" className="cta-hint__arrow">
        →
      </span>
    </Link>
  );
}

export function CtaBlock({ href, label }: CtaProps) {
  return (
    <Link className="cta-block" to={href}>
      {label}
    </Link>
  );
}

interface CtaCaretProps {
  href: string;
  label: string;
  external?: boolean;
}

export function CtaCaret({ href, label, external }: CtaCaretProps) {
  if (external) {
    return (
      <a className="cta-caret" href={href}>
        {label}
      </a>
    );
  }
  return (
    <Link className="cta-caret" to={href as SiteHref}>
      {label}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="site-nav" data-lifted={lifted ? "true" : "false"}>
        <div className="shell site-nav__inner">
          <Link aria-label={studio.name} className="site-nav__brand" to="/">
            <img
              alt=""
              className="site-nav__mark"
              height={40}
              src="/assets/brand/mark-512.png"
              width={40}
            />
            <span className="site-nav__wordmark">
              <span className="site-nav__wordmark-top">Graphic Shark</span>
              <span className="site-nav__wordmark-bottom">Studios</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="site-nav__links">
            <a className="site-nav__link" href="/#services">
              Services
            </a>
            {navLinks.map((link) => (
              <Link className="site-nav__link" key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-nav__actions">
            {/* Phones only: let a visitor ring the studio in one tap. */}
            <a
              aria-label={`Call the studio on ${studio.phone}`}
              className="site-nav__call"
              href={studio.phoneHref}
            >
              <img
                alt=""
                aria-hidden="true"
                height={16}
                src="/assets/icons/icon-08.png"
                width={16}
              />
              <span>{studio.phone}</span>
            </a>
            <CtaNav />
            <button
              aria-expanded={open}
              aria-label="Menu"
              className="site-nav__toggle"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              <span
                aria-hidden="true"
                className="site-nav__toggle-bars"
                data-open={open ? "true" : "false"}
              />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="site-sheet">
          <a
            className="site-sheet__link"
            href="/#services"
            onClick={() => setOpen(false)}
          >
            Services
          </a>
          {navLinks.map((link) => (
            <Link
              className="site-sheet__link"
              key={link.to}
              onClick={() => setOpen(false)}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
          <div className="site-sheet__foot">
            <CtaCaret external href={studio.phoneHref} label={studio.phone} />
            <CtaCaret external href={studio.emailHref} label={studio.email} />
          </div>
        </div>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <img
              alt=""
              className="footer-mark"
              height={46}
              src="/assets/brand/mark-512.png"
              width={46}
            />
            <p className="footer-blurb">
              A small studio building websites, storefronts and digital media for
              businesses that sell real things.
            </p>
            <CtaBlock href="/quote" label="Request a quote" />
          </div>

          <div className="footer-col">
            <p className="footer-col__title">Pages</p>
            <ul className="footer-list">
              <li>
                <CtaCaret href="/" label="Home" />
              </li>
              <li>
                <CtaCaret href="/work" label="Our work" />
              </li>
              <li>
                <CtaCaret href="/quote" label="Request a quote" />
              </li>
              <li>
                <CtaCaret href="/demo" label="Request a demo" />
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col__title">Services</p>
            <ul className="footer-list footer-list--plain">
              <li>Brochure websites</li>
              <li>E-commerce websites</li>
              <li>Print and digital media</li>
              <li>AI generated content</li>
              <li>AI review videos</li>
              <li>Logo and merch design</li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col__title">Studio</p>
            <ul className="footer-list">
              <li>
                <CtaCaret external href={studio.phoneHref} label={studio.phone} />
              </li>
              <li>
                <CtaCaret external href={studio.emailHref} label={studio.email} />
              </li>
            </ul>
            <p className="footer-place">{studio.location}</p>
          </div>
        </div>

        <div className="footer-note">
          <span>© 2026 {studio.name}</span>
          <span>{studio.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
