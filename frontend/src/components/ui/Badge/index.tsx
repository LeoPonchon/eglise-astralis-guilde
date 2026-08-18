import * as React from "react";
import styles from "./badge.module.css";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        styles.badge,
        variant === "secondary" && styles["variant-secondary"],
        variant === "outline" && styles["variant-outline"],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
