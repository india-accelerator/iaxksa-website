import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface LandingButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  icon?: "right" | "external" | "down";
  className?: string;
  download?: boolean;
}

export function LandingButtonLink({
  href,
  children,
  variant = "gold",
  icon = "right",
  className = "",
  download = false,
}: LandingButtonLinkProps) {
  const Icon = icon === "external" ? ArrowUpRight : icon === "down" ? ArrowDown : ArrowRight;
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      className={`aa-button aa-button--${variant} ${className}`.trim()}
      href={href}
      download={download || undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
    >
      <span>{children}</span>
      <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
    </a>
  );
}
