import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "../../lib/site";
import { Plus, X } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-14 md:py-20"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left: editorial title */}
          <div>
            <div
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span style={{ color: "var(--green-text)" }}>(07)</span>
              <span className="h-px w-10" style={{ background: "var(--line-strong)" }} />
              <span style={{ color: "var(--muted)" }}>FAQ</span>
            </div>
            <h2
              className="mt-6 font-medium lg:sticky lg:top-28"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                letterSpacing: "-0.06em",
                lineHeight: 0.92,
                color: "var(--ink)",
              }}
            >
              Questions
              <br />
              <span
                className="accent-serif"
                style={{ fontSize: "1.08em", letterSpacing: "-0.03em" }}
              >
                Fréquentes
              </span>
            </h2>
          </div>

          {/* Right: hairline accordion */}
          <div className="border-t" style={{ borderColor: "var(--line-strong)" }}>
            {FAQS.map((faq, index) => {
              const isOpen = open === index;
              const num = String(index + 1).padStart(2, "0");
              return (
                <div key={index} className="border-b" style={{ borderColor: "var(--line-strong)" }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <div className="flex items-baseline gap-4 md:gap-5">
                      <span
                        className="shrink-0 text-[11px]"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: isOpen ? "var(--green-text)" : "var(--faint)",
                        }}
                      >
                        {num}
                      </span>
                      <span
                        className="font-medium transition-colors duration-200 group-hover:text-[var(--ink)]"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.1rem, 1.7vw, 1.45rem)",
                          letterSpacing: "-0.035em",
                          lineHeight: 1.25,
                          color: isOpen ? "var(--ink)" : "#5b645f",
                        }}
                      >
                        {faq.q}
                      </span>
                    </div>
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300"
                      style={{
                        background: isOpen ? "var(--ink)" : "#ffffff",
                        color: isOpen ? "#ffffff" : "var(--ink)",
                        boxShadow: isOpen
                          ? "0 8px 20px -8px rgba(0,0,0,0.45)"
                          : "0 0 0 1px rgba(10,30,15,0.1), 0 4px 10px -6px rgba(16,60,28,0.25)",
                      }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isOpen ? "x" : "plus"}
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className="grid place-items-center"
                        >
                          {isOpen ? (
                            <X className="h-3.5 w-3.5" weight="bold" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" weight="bold" />
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p
                          className="max-w-[40rem] pb-7 pl-8 pr-12 text-[15.5px] leading-relaxed md:pl-10"
                          style={{ color: "var(--muted)" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
