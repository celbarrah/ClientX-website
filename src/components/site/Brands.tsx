import { Check } from "@phosphor-icons/react";
import { SectionTitle } from "./primitives";
import { Marquee } from "./effects";
import { CLIENT_LOGOS } from "../../lib/site";

const TRUST = [
  "Norme de management de la qualité ISO 9001",
  "Plus de 50+ grandes marques et institutions",
  "Disponibilité 99.9% et support dédié",
];

export function BrandsSection() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2);
  const row1 = CLIENT_LOGOS.slice(0, half);
  const row2 = CLIENT_LOGOS.slice(half);

  return (
    <section
      className="rails-bg py-12 md:py-16"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="container-x">
        <SectionTitle className="text-center !text-[clamp(1.6rem,2.6vw,2.4rem)]">
          <span className="grad-ink">Choisie par les marques les plus exigeantes.</span>
        </SectionTitle>
        <p
          className="text-pretty mx-auto mt-4 max-w-[40rem] text-center text-[15px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          De grandes marques nous confient leurs enjeux les plus stratégiques. Ensemble, nous
          construisons des expériences innovantes qui stimulent leur croissance et renforcent leur
          position sur le marché.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        <Marquee direction="left" speed={42}>
          {row1.map((l) => (
            <LogoItem key={l.name} src={l.src} name={l.name} />
          ))}
        </Marquee>
        <Marquee direction="right" speed={50}>
          {row2.map((l) => (
            <LogoItem key={l.name} src={l.src} name={l.name} />
          ))}
        </Marquee>
      </div>

      <div className="container-x mt-12">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 text-[14px]"
              style={{ color: "var(--muted)" }}
            >
              <Check className="h-4 w-4" weight="bold" style={{ color: "var(--green-text)" }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ src, name }: { src: string; name: string }) {
  return (
    <div className="mx-7 flex h-10 shrink-0 items-center md:mx-8">
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="h-8 max-w-[140px] object-contain opacity-60 transition-all duration-300 hover:opacity-100 md:h-10"
        style={{ filter: "grayscale(1)" }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(1)")}
      />
    </div>
  );
}
