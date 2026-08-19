import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface LandingContainerProps<T extends ElementType> {
  as?: T;
  className?: string;
  children: ReactNode;
}

export function LandingContainer<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...props
}: LandingContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof LandingContainerProps<T>>) {
  const Component = as ?? "div";
  return (
    <Component className={`aa-container ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
