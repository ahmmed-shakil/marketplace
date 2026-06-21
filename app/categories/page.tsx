import Link from "next/link";
import { PageTransition, MotionDiv } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getTopCategories, getSubcategories, getTotalCategoryCount, getDepartmentCount } from "@/lib/mock/categories";
import { getCategoryIcon } from "@/lib/category-icons";

export default function CategoriesPage() {
  const departments = getTopCategories();

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Categories" }]} />

      <div className="mt-4 overflow-hidden rounded-lg hero-navy p-8 text-white">
        <h1 className="text-3xl font-bold">All Product Categories</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          {getDepartmentCount()} departments · {getTotalCategoryCount()} subcategories · every purchasable product type except prescription medicines.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {departments.map((dept, i) => {
          const subs = getSubcategories(dept.id);
          const DeptIcon = getCategoryIcon(dept.icon);
          return (
            <MotionDiv key={dept.id} delay={i * 0.02}>
              <section className="fb-card p-6">
                <Link href={`/categories/${dept.slug}`} className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#4f46e5] group-hover:bg-[#4f46e5] group-hover:text-white">
                    <DeptIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#050505] group-hover:fb-text">{dept.name}</h2>
                    {dept.description && <p className="mt-1 text-sm text-[#65676b]">{dept.description}</p>}
                    <p className="mt-1 text-xs font-semibold text-[#65676b]">{dept.productCount.toLocaleString()} products · {subs.length} subcategories</p>
                  </div>
                </Link>
                {subs.length > 0 && (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {subs.map((sub) => {
                      const SubIcon = getCategoryIcon(sub.icon);
                      return (
                        <Link
                          key={sub.id}
                          href={`/categories/${sub.slug}`}
                          className="flex items-center gap-3 rounded-lg border border-[#dadde1] px-3 py-2.5 hover:border-[#4f46e5] hover:bg-[#eef2ff]"
                        >
                          <SubIcon className="h-4 w-4 shrink-0 text-[#4f46e5]" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#050505]">{sub.name}</p>
                            <p className="text-xs text-[#65676b]">{sub.productCount.toLocaleString()}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            </MotionDiv>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-[#65676b]">
        Prescription medicines and pharmaceuticals are not listed on Market.
      </p>
    </PageTransition>
  );
}
