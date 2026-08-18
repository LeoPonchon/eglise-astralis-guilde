import * as React from "react";
import styles from "./input.module.css";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, className, ...props }, ref) => {
    return <input type={type} ref={ref} className={cn(styles.input, className)} {...props} />;
});
Input.displayName = "Input";

export { Input };

