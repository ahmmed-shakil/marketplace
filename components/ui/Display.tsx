import { Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(sz, star <= Math.round(rating) ? "fill-[#f7b928] text-[#f7b928]" : "fill-[#e4e6eb] text-[#e4e6eb]")}
        />
      ))}
      <span className="ml-1 text-[13px] font-semibold text-[#050505]">{rating.toFixed(1)}</span>
    </div>
  );
}

export function PriceTag({ min, max, size = "md" }: { min: number; max: number; size?: "sm" | "md" | "lg" }) {
  const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;
  const sizes = { sm: "text-base", md: "text-lg", lg: "text-2xl" };
  return (
    <span className={cn("font-bold text-primary", sizes[size])}>
      {min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`}
    </span>
  );
}

export function StockBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    in_stock: { label: "In Stock", className: "bg-[#e7f3ef] text-[#31a24c]" },
    low_stock: { label: "Low Stock", className: "bg-[#fff8e6] text-[#b8860b]" },
    out_of_stock: { label: "Out of Stock", className: "bg-[#ffebe9] text-[#f02849]" },
    pre_order: { label: "Pre-Order", className: "bg-accent-light text-primary" },
  };
  const { label, className } = map[status] ?? { label: status, className: "bg-[#e4e6eb] text-[#65676b]" };
  return <span className={cn("rounded-md px-2 py-0.5 text-xs font-semibold", className)}>{label}</span>;
}

export function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-primary font-bold", className)}>{children}</span>;
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-[#dadde1] pb-3">
      <div>
        <h2 className="text-xl font-bold text-[#050505]">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[13px] text-[#65676b]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, description, icon: Icon }: { title: string; description?: string; icon?: React.ElementType }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#ced0d4] bg-white py-16 text-center">
      {Icon && <Icon className="mb-3 h-10 w-10 text-[#bcc0c4]" />}
      <p className="text-lg font-semibold text-[#050505]">{title}</p>
      {description && <p className="mt-2 max-w-sm text-[15px] text-[#65676b]">{description}</p>}
    </div>
  );
}

export function StatPill({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="fb-card flex flex-col items-center px-6 py-4 text-center">
      <span className="text-2xl font-bold text-primary">{value}</span>
      <span className="mt-1 text-[13px] font-medium text-[#65676b]">{label}</span>
      {trend && (
        <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#31a24c]">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      )}
    </div>
  );
}
