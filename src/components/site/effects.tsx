import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useAnimationFrame } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Number count-up (Intl fr-FR) ---------- */
export function Counter({
  to,
  currency = "€",
  duration = 1400,
}: {
  to: number;
  currency?: "€" | "MAD";
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const fmt = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: currency === "MAD" ? 0 : to % 1 === 0 ? 0 : 2,
    maximumFractionDigits: currency === "MAD" ? 0 : 2,
  });

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt.format(val)}
    </span>
  );
}

/* ---------- Smooth infinite marquee (CSS-driven, respects reduced motion) ---------- */
export function Marquee({
  children,
  direction = "left",
  speed = 40,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        className="flex w-max"
        style={
          reduce
            ? undefined
            : {
                animation: `marquee-${direction} ${speed}s linear infinite`,
              }
        }
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

/* ---------- Scroll-driven consolidation progress (20 -> 1) ---------- */
export function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}

export { motion, useTransform, useAnimationFrame, EASE };
