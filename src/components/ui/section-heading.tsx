interface SectionHeadingProps {
  label: string;
  titleStart: string;
  titleAccent: string;
  align?: "start" | "center";
}

export function SectionHeading({
  label,
  titleStart,
  titleAccent,
  align = "start",
}: SectionHeadingProps) {
  return (
    <header className={`aa-section-heading aa-section-heading--${align}`}>
      <span className="aa-eyebrow">{label}</span>
      <h2>
        {titleStart} <em>{titleAccent}</em>
      </h2>
    </header>
  );
}
