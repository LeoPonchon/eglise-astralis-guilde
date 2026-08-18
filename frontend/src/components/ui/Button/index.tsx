import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./button.module.css";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "hero";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[`size-${size}`],
          styles[`variant-${variant}`],
          className,
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
