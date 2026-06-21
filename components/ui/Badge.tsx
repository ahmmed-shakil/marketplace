import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[#e4e6eb] text-[#050505]",
  primary: "bg-accent-light text-primary",
  success: "bg-[#e7f3ef] text-[#31a24c]",
  warning: "bg-[#fff8e6] text-[#b8860b]",
  danger: "bg-[#ffebe9] text-[#f02849]",
  gradient: "fb-primary text-white",
  fb: "fb-primary text-white",
};

export function Badge({ className, variant = "default", children }: { className?: string; variant?: keyof typeof variants; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}
