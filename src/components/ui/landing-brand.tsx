import { LandingPicture } from "./landing-picture";

interface LandingBrandProps {
  name: string;
  poweredBy: string;
  mark: string;
  markFallback: string;
  compact?: boolean;
}

export function LandingBrand({
  name,
  poweredBy,
  mark,
  markFallback,
  compact = false,
}: LandingBrandProps) {
  return (
    <a className={`aa-brand ${compact ? "aa-brand--compact" : ""}`.trim()} href="#top">
      <LandingPicture
        src={mark}
        fallback={markFallback}
        alt=""
        width={80}
        height={82}
        loading="eager"
        className="aa-brand__mark"
      />
      <span className="aa-brand__copy">
        <strong>{name}</strong>
        <small>{poweredBy}</small>
      </span>
    </a>
  );
}
