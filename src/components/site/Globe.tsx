import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";
import { CLIENTX_HERO_LOGO } from "../../lib/site";

const MARKERS = [
  { location: [33.57, -7.59], size: 0.07 }, // Casablanca
  { location: [48.85, 2.35], size: 0.06 }, // Paris
  { location: [25.2, 55.27], size: 0.06 }, // Dubai
  { location: [24.71, 46.67], size: 0.055 }, // Riyadh
  { location: [5.35, -4.0], size: 0.05 }, // Abidjan
  { location: [45.5, -73.57], size: 0.05 }, // Montréal
];

/**
 * WebGL glowing globe centerpiece (hero) using cobe.
 * Fills its parent (width 100%, square). Bottom half fades out via mask.
 * Falls back to a CSS sphere if WebGL is unavailable.
 */
export function Globe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const phiRef = useRef(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch {
      gl = null;
    }
    if (!gl) {
      setFailed(true);
      return;
    }

    const buf = () => (wrapRef.current?.offsetWidth || 600) * 2;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: buf(),
      height: buf(),
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.04, 0.06, 0.05],
      markerColor: [0.13, 0.89, 0.42],
      glowColor: [0.13, 0.89, 0.42],
      markers: MARKERS,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + pointerMovement.current;
        state.width = buf();
        state.height = buf();
      },
    });

    return () => globe.destroy();
  }, []);

  if (failed) return <FallbackGlobe />;

  return (
    <div
      ref={wrapRef}
      className="relative grid place-items-center"
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        maskImage: "linear-gradient(to bottom, black 52%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 52%, transparent)",
      }}
    >
      {/* Radial glow behind globe */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 55%)" }}
        aria-hidden
      />
      {/* Orbital rings */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full border"
        style={{ inset: "6%", borderColor: "var(--border)", borderTopColor: "var(--green)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full border"
        style={{
          inset: "16%",
          borderColor: "var(--border)",
          borderRightColor: "var(--green-bright)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Transparent 3D ClientX Logo inside the center of the circle/sphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [0.98, 1.02, 0.98], rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center"
          style={{ width: "42%", height: "42%", maxWidth: 300, maxHeight: 300 }}
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 65%)" }}
          />
          <img
            src={CLIENTX_HERO_LOGO}
            alt="ClientX 3D Logo"
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_35px_rgba(34,227,107,0.65)]"
            style={{
              filter: "drop-shadow(0 0 40px rgba(34,227,107,0.5))",
            }}
          />
        </motion.div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", cursor: "grab", contain: "layout paint size" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current != null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
      />
    </div>
  );
}

function FallbackGlobe() {
  return (
    <div
      className="relative grid place-items-center"
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        maskImage: "linear-gradient(to bottom, black 52%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 52%, transparent)",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-[12%] rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 32%, #10361f 0%, #050706 70%)",
          border: "1px solid var(--border)",
          boxShadow: "inset -30px -30px 80px rgba(0,0,0,0.8), 0 0 80px var(--glow)",
        }}
      />
      {/* Transparent 3D ClientX Logo inside the center */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img
          src={CLIENTX_HERO_LOGO}
          alt="ClientX 3D Logo"
          className="h-[42%] w-[42%] max-w-[300px] max-h-[300px] object-contain drop-shadow-[0_0_35px_rgba(34,227,107,0.65)]"
        />
      </div>
    </div>
  );
}
