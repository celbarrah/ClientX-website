import type { ReactNode } from "react";

/* Light theme only — pass-through provider. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ThemeToggle() {
  return null;
}
