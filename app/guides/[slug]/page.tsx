import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { getGuideBySlug, getAllVendorProducts, enrichVendorProductForCard } from "@/lib/mock";

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const recommended = getAllVendorProducts()
    .filter((vp) => guide.productIds.some((pid) => vp.productGroupId?.includes(pid.replace("prod-", "")) || vp.name.toLowerCase().includes("iphone") || vp.name.toLowerCase().includes("galaxy")))
    .slice(0, 6)
    .map(enrichVendorProductForCard);

  return (
    <PageTransition className="mx-auto max-w-4xl px-4 py-8 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} />
      <Badge variant="primary" className="mt-4">{guide.budgetLabel}</Badge>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{guide.title}</h1>
      <p className="mt-2 text-slate-500">{guide.readTime} min read</p>
      <div className="prose prose-slate mt-8 max-w-none">
        {guide.content.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4 text-slate-700 leading-relaxed whitespace-pre-line">{para.replace(/^##\s/, "")}</p>
        ))}
      </div>
      {recommended.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Vendor listings for you</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((p) => <ProductCard key={p.id} product={p} variantSummary={p.variantSummary} />)}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
