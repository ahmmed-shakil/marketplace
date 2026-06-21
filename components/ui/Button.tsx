import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "soft" | "inverse" | "heroPrimary" | "heroGhost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "fb-primary font-semibold shadow-sm hover:shadow-md active:scale-[0.98]",
      secondary: "bg-[#e4e6eb] text-[#050505] hover:bg-[#d8dadf] font-semibold",
      ghost: "text-[#65676b] hover:bg-[#f2f2f2] font-medium",
      outline: "border border-primary text-primary bg-white hover:bg-accent-light font-semibold",
      soft: "bg-accent-light text-primary hover:bg-indigo-100 font-semibold",
      inverse: "border-2 border-white bg-transparent text-white hover:bg-white/15 font-semibold",
      heroPrimary: "bg-white text-primary shadow-md hover:bg-[#f0f2f5] font-semibold",
      heroGhost: "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 font-semibold",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-[13px] rounded-md",
      md: "px-4 py-2 text-[15px] rounded-md",
      lg: "px-6 py-2.5 text-base rounded-lg",
    };
    return (
      <button
        ref={ref}
        className={cn("inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50", variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
