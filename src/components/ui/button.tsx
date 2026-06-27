import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            primary:
              "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40",
            secondary:
              "bg-foreground text-white hover:bg-foreground/90",
            outline:
              "border-2 border-primary text-primary hover:bg-primary hover:text-white",
            ghost:
              "text-foreground/80 hover:text-primary hover:bg-muted",
          }[variant],
          {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-2.5 text-sm",
            lg: "px-8 py-3 text-base",
          }[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
