import { Typography } from "@/components/Typography";
import { cn } from "@/components/utils";
import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  label: string;
}

export const Button = ({
  label,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-white text-black cursor-none hover:animate-blink",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <Typography>{`$ ${"&#62; "} ${label}`}</Typography>
    </button>
  );
};
