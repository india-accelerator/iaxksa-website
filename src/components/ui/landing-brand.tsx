import { LandingPicture } from "./landing-picture";

interface LandingBrandProps {
  name: string;
  poweredBy: string;
  mark: string;
  markFallback: string;
  markAlt: string;
  partnerWordmark: string;
  partnerWordmarkFallback: string;
  compact?: boolean;
  /** Where the brand lockup links. Defaults to the top of the current page. */
  homeHref?: string;
  /** Render the powered-by line as the partner wordmark rather than plain text. */
  poweredByPrefix?: string;
  poweredBySuffix?: string;
}

export function LandingBrand({
  name,
  poweredBy,
  mark,
  markFallback,
  markAlt,
  partnerWordmark,
  partnerWordmarkFallback,
  compact = false,
  homeHref = "#top",
  poweredByPrefix,
  poweredBySuffix,
}: LandingBrandProps) {
  // Where the wordmark carries the India Accelerator identity, the symbol
  // beside it would just be the same logo twice.
  const showWordmark = Boolean(poweredByPrefix);

  return (
    <a className={`aa-brand ${compact ? "aa-brand--compact" : ""}`.trim()} href={homeHref}>
      {showWordmark ? null : (
        <LandingPicture
          src={mark}
          fallback={markFallback}
          alt={markAlt}
          width={298}
          height={188}
          loading="eager"
          className="aa-brand__mark"
        />
      )}
      <span className="aa-brand__copy">
        <strong>{name}</strong>
        {showWordmark ? (
          <span className="aa-brand__powered" aria-label={poweredBy}>
            <small aria-hidden="true">{poweredByPrefix}</small>
            <LandingPicture
              src={partnerWordmark}
              fallback={partnerWordmarkFallback}
              alt=""
              width={2744}
              height={313}
              className="aa-brand__wordmark"
            />
            <small aria-hidden="true">{poweredBySuffix}</small>
          </span>
        ) : (
          <small>{poweredBy}</small>
        )}
      </span>
    </a>
  );
}
