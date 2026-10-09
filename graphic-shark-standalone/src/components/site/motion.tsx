import { useEffect } from "react";

/**
 * Client-only motion layer.
 *
 * The scroll-scrub engine owns scroll-to-video time for the hero film, so this
 * component never touches the video elements. It does two jobs only: a Lenis
 * smooth scroll bridged to the GSAP ticker, and transform-only reveals.
 *
 * Nothing here is allowed to start at opacity 0: every element is fully
 * rendered and visible without JavaScript, and motion only ever offsets
 * transforms. A headless full page screenshot must show every section.
 */
export function SiteMotion() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const boot = async () => {
      const [lenisModule, gsapModule, triggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) {
        return;
      }

      const Lenis = lenisModule.default;
      const gsap = gsapModule.gsap ?? gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger ?? triggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.11,
        wheelMultiplier: 0.95,
      });

      // Lenis drives the GSAP ticker so scrub positions stay in sync
      // (autoRaf is off, so this single loop is the only rAF in play).
      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      const reveals = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]")
      );
      for (const element of reveals) {
        const distance = Number(element.dataset.reveal || 30);
        gsap.fromTo(
          element,
          { y: distance },
          {
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { once: true, start: "top 90%", trigger: element },
            y: 0,
          }
        );
      }

      const drifts = Array.from(
        document.querySelectorAll<HTMLElement>("[data-drift]")
      );
      for (const element of drifts) {
        const amount = Number(element.dataset.drift || 40);
        gsap.fromTo(
          element,
          { y: amount },
          {
            ease: "none",
            scrollTrigger: {
              end: "bottom top",
              scrub: true,
              start: "top bottom",
              trigger: element,
            },
            y: -amount,
          }
        );
      }

      ScrollTrigger.refresh();

      dispose = () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
        for (const trigger of ScrollTrigger.getAll()) {
          trigger.kill();
        }
      };
    };

    void boot().catch(() => {
      // Motion is optional: the page is complete and static without it.
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return null;
}
