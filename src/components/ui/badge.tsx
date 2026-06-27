import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "success"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full",
        {
          default: "bg-primary/10 text-primary",
          accent: "bg-accent/10 text-accent",
          success: "bg-success/10 text-success",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
