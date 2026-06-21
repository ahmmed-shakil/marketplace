import Link from "next/link";
import { PageTransition, MotionCard } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { getAllGuides } from "@/lib/mock";

export default function GuidesPage() {
  const guides = getAllGuides();
  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Buying Guides" }]} />

      <div className="mt-4 overflow-hidden rounded-lg fb-primary p-8 text-white">
        <h1 className="text-3xl font-bold">Buying Guides</h1>
        <p className="mt-2 max-w-2xl text-blue-100">Expert recommendations by category and budget — written for Bangladesh buyers.</p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link key={g.id} href={`/guides/${g.slug}`}>
            <MotionCard className="fb-card overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-[#1877f2]/10 via-[#e7f3ff] to-[#f0f2f5]" />
              <div className="p-5">
                <Badge variant="primary">{g.budgetLabel}</Badge>
                <h2 className="mt-2 text-lg font-semibold text-[#050505]">{g.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-[#65676b]">{g.excerpt}</p>
                <p className="mt-3 text-xs font-medium text-[#65676b]">{g.readTime} min read</p>
              </div>
            </MotionCard>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
