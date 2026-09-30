import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after client hydration (WebGL/3D safety).
 * Shows fallback during SSR and first paint.
 */
export function ClientOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
