import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<{ scrollTo: (target: string, offset?: number) => void }>({
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string, offset = -80) => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(target, { offset });
    else {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>;
}
