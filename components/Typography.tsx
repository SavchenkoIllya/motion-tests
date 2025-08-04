import { cn } from "@/components";
import { ClassValue } from "clsx";
import { ElementType } from "react";
import { useScramble, UseScrambleProps } from "use-scramble";

export type TypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "caption";

export interface TypographyProps {
  as?: ElementType;
  variant?: TypographyVariants;
  children?: string | string[];
  className?: string;
  scrambleProps?: UseScrambleProps;
}

export const TypographyVariantsStyles: Record<TypographyVariants, ClassValue> =
  {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    body1: "text-base",
    body2: "text-sm",
    caption: "text-xs",
  };

export const Typography = ({
  as: Component = "p",
  variant = "body1",
  children,
  scrambleProps,
  className,
}: TypographyProps) => {
  const { ref } = useScramble({
    text: Array.isArray(children) ? children?.join("") : children,
    speed: 1,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
    overdrive: true,
    overflow: true,
    ...scrambleProps,
  });

  return (
    <Component
      ref={ref}
      className={cn(TypographyVariantsStyles[variant], className)}
    />
  );
};
