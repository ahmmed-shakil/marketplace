import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1 text-[13px] text-[#65676b]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <Link href={item.href} className="hover:underline fb-text">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-[#050505]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
