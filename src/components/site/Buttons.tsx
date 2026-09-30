import { useState, type ReactNode } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

function scrollToHash(to: string) {
  if (to.startsWith("#")) {
    if (window.location.pathname !== "/") {
      window.location.href = `/${to}`;
      return;
    }
    window.dispatchEvent(new CustomEvent("clientx-scroll", { detail: to }));
  }
}

interface ButtonProps {
  children: ReactNode;
  to: string;
  variant?: "primary" | "secondary";
  arrow?: "right";
  className?: string;
  onClick?: () => void;
}

export function PrimaryButton({
  children,
  to,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const isHash = to.startsWith("#");
  return (
    <Magnetic strength={6} className="inline-block">
      <a
        href={to}
        onClick={(e) => {
          if (isHash) {
            e.preventDefault();
            scrollToHash(to);
            onClick?.();
          }
        }}
        className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] ${variant === "primary" ? "btn-glow" : "glass-pill hover:bg-white"} ${className}`}
        style={{ color: "var(--ink)" }}
      >
        {children}
        <CaretRight
          weight="bold"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
    </Magnetic>
  );
}

export function SecondaryButton(props: ButtonProps) {
  return <PrimaryButton {...props} variant="secondary" />;
}

/* ---------- White pill button (pricing featured card) ---------- */
export function WhitePillButton({ to, children }: { to: string; children: ReactNode }) {
  const isHash = to.startsWith("#");
  return (
    <a
      href={to}
      onClick={(e) => {
        if (isHash) {
          e.preventDefault();
          scrollToHash(to);
        }
      }}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-all duration-200"
      style={{ background: "#ffffff", color: "var(--ink)", boxShadow: "var(--shadow-md)" }}
    >
      {children}
      <CaretRight
        weight="bold"
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}

/* ---------- Accordion item ---------- */
export function AccordionItem({
  q,
  a,
  i,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  i: number;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `acc-${i}`;
  return (
    <div className="overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <span
          className="flex-1 text-[clamp(1rem, 1.4vw, 1.15rem)] font-medium"
          style={{ color: "var(--ink)" }}
        >
          {q}
        </span>
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-expo)]"
          style={{
            border: "1px solid var(--line-strong)",
            color: "var(--ink)",
            transform: open ? "rotate(45deg)" : "none",
            background: "var(--surface)",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Re-exports for compat */
export { PrimaryButton as CTAButton };
