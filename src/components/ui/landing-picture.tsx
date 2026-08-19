interface LandingPictureProps {
  src: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
}

export function LandingPicture({
  src,
  fallback,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
}: LandingPictureProps) {
  return (
    <picture className={className}>
      <source srcSet={src} type="image/webp" />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </picture>
  );
}
