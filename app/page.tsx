import Link from "next/link";
import {
  ArrowRight, GitCompare, BookOpen, Shield, Zap, Store,
  Search, BarChart3, Users, Package, CheckCircle2,
  Smartphone, Car, Wind, Bike, Shirt, Home, Wrench, Sparkles, Heart, BookOpen as Book,
} from "lucide-react";
import { PageTransition, MotionDiv } from "@/components/motion";
import { SearchBar } from "@/components/layout/SearchBar";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader, StatPill } from "@/components/ui/Display";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getFeaturedProducts, getAllComparisons, getAllGuides, getNearbyVendors } from "@/lib/mock";
import { getTopCategories } from "@/lib/mock/categories";
import { MotionCard } from "@/components/motion";
import { products } from "@/lib/mock/products";

const categoryIcons: Record<string, React.ElementType> = {
  Smartphone, Car, Wind, Bike, Shirt, Home, Wrench, Sparkles, Heart, Book, Package,
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getTopCategories();
  const comparisons = getAllComparisons();
  const guides = getAllGuides();
  const vendors = getNearbyVendors(4);
  const trending = products.filter((p) => p.rating >= 4.5).slice(0, 4);

  return (
    <PageTransition>
      {/* Hero — Facebook blue banner */}
      <section className="relative mesh-bg hero-pattern overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <MotionDiv>
              <Badge variant="fb" className="mb-4 bg-white/20 text-white backdrop-blur-sm">Free forever · No listing fees</Badge>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                Know everything about any product.
                <span className="block mt-1 text-blue-100">Find where to buy it.</span>
              </h1>
              <p className="mt-4 text-lg text-blue-100/90 leading-relaxed">
                Complete specs, expert reviews, side-by-side comparisons, and real vendor stock across Bangladesh — all in one place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/search"><Button size="lg" className="bg-white text-[#1877f2] hover:bg-blue-50 shadow-lg">Explore Products</Button></Link>
                <Link href="/vendor-signup"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">List Your Store</Button></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
                {["10,000+ Products", "100+ Vendors", "15 Categories", "Free Listings"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />{t}</span>
                ))}
              </div>
            </MotionDiv>
            <MotionDiv delay={0.1} className="hidden lg:block">
              <div className="fb-card-elevated rounded-lg p-6">
                <p className="mb-3 text-sm font-semibold text-[#65676b]">What are you looking for?</p>
                <SearchBar large />
                <div className="mt-4 flex flex-wrap gap-2">
                  {["iPhone 16", "Royal Enfield", "LG AC", "Rockrider"].map((t) => (
                    <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="rounded-full bg-[#f0f2f5] px-3 py-1 text-xs font-semibold text-[#050505] hover:bg-[#e7f3ff] hover:text-[#1877f2]">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 -mt-6 lg:px-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatPill value="10K+" label="Products" trend="+12% this month" />
          <StatPill value="100+" label="Active Vendors" />
          <StatPill value="50K" label="Monthly Visitors" trend="+28%" />
          <StatPill value="15" label="Product Categories" />
        </div>
      </section>

      {/* Categories grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <SectionHeader title="Browse by Category" subtitle="Every product type, one platform" action={<Link href="/search"><Button variant="soft" size="sm">All categories</Button></Link>} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.icon] ?? Package;
            return (
              <MotionDiv key={cat.id} delay={i * 0.03}>
                <Link href={`/categories/${cat.slug}`} className="group block">
                  <div className="fb-card flex flex-col items-center p-4 text-center transition-all group-hover:border-[#1877f2]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2] transition-colors group-hover:fb-primary group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-[13px] font-semibold text-[#050505] leading-tight">{cat.name}</p>
                    <p className="mt-1 text-xs text-[#65676b]">{cat.productCount.toLocaleString()}</p>
                  </div>
                </Link>
              </MotionDiv>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeader title="How Market Works" subtitle="Research smarter, buy with confidence" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Search, title: "Research", desc: "Read complete specs, expert reviews, FAQs, and buying guides for any product." },
              { icon: GitCompare, title: "Compare", desc: "Side-by-side comparisons highlight differences so you pick the right one." },
              { icon: Store, title: "Discover", desc: "Find nearby vendors with real stock, pricing, and delivery options." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <MotionDiv key={title} delay={i * 0.08}>
                <div className="fb-card h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full fb-primary">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#050505]">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#65676b]">{desc}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <SectionHeader title="Featured Products" subtitle="Hand-picked trending items" action={<Link href="/search"><Button variant="ghost" size="sm">View all <ArrowRight className="h-4 w-4" /></Button></Link>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <MotionDiv key={p.id} delay={i * 0.05}>
              <ProductCard product={p} featured={i < 2} />
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Top rated row */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeader title="Top Rated" subtitle="Highest rated by users and experts" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <SectionHeader title="Popular Comparisons" subtitle="Can't decide? Compare side-by-side" action={<Link href="/compare"><Button variant="soft" size="sm"><GitCompare className="h-4 w-4" /> Compare now</Button></Link>} />
        <div className="grid gap-4 md:grid-cols-2">
          {comparisons.map((c) => (
            <Link key={c.id} href={`/compare?ids=${c.productIds.join(",")}`}>
              <MotionCard className="fb-card flex gap-4 p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e7f3ff]">
                  <GitCompare className="h-7 w-7 text-[#1877f2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#050505]">{c.title}</h3>
                  <p className="mt-1 text-[15px] text-[#65676b]">{c.summary}</p>
                  <span className="mt-2 inline-block text-sm font-semibold fb-text">View comparison →</span>
                </div>
              </MotionCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Buying Guides */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeader title="Buying Guides" subtitle="Expert recommendations by budget" action={<Link href="/guides"><Button variant="ghost" size="sm"><BookOpen className="h-4 w-4" /> All guides</Button></Link>} />
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.id} href={`/guides/${g.slug}`}>
                <MotionCard className="fb-card overflow-hidden">
                  <div className="relative h-44 bg-[#1877f2]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1877f2] to-[#42b72a]/30 opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-white/20 text-white">{g.budgetLabel}</Badge>
                      <h3 className="mt-2 text-lg font-bold text-white leading-snug">{g.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 text-[15px] text-[#65676b]">{g.excerpt}</p>
                    <p className="mt-2 text-xs font-semibold text-[#65676b]">{g.readTime} min read</p>
                  </div>
                </MotionCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="fb-card-elevated grid gap-6 rounded-lg p-8 md:grid-cols-3">
          {[
            { icon: Shield, title: "Trusted Information", desc: "Expert-reviewed specs and verified user reviews." },
            { icon: Zap, title: "Always Free", desc: "Product knowledge and vendor listings free forever." },
            { icon: BarChart3, title: "Real Availability", desc: "Live stock and pricing from local vendors." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f3ff]">
                <Icon className="h-5 w-5 text-[#1877f2]" />
              </div>
              <div>
                <h3 className="font-bold text-[#050505]">{title}</h3>
                <p className="mt-1 text-[15px] text-[#65676b]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vendors */}
      <section className="bg-[#1877f2] py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Nearby Vendors</h2>
              <p className="mt-1 text-blue-100">Find sellers with real stock near you</p>
            </div>
            <Link href="/vendors"><Button className="bg-white text-[#1877f2] hover:bg-blue-50">View all vendors</Button></Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((v) => (
              <Link key={v.id} href={`/vendors/${v.slug}`}>
                <MotionCard className="rounded-lg bg-white p-5 text-center shadow-md">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full fb-primary text-2xl font-bold text-white">
                    {v.businessName.charAt(0)}
                  </div>
                  <h3 className="mt-3 font-bold text-[#050505]">{v.businessName}</h3>
                  <p className="mt-1 text-sm text-[#65676b]">{v.listingCount} listings</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                    <span className="text-[#f7b928]">★</span>
                    <span className="font-semibold text-[#050505]">{v.rating}</span>
                    {v.tier === "premium" && <Badge variant="primary" className="ml-2">Premium</Badge>}
                  </div>
                </MotionCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="fb-card flex flex-col items-center rounded-lg p-10 text-center">
          <Users className="h-12 w-12 text-[#1877f2]" />
          <h2 className="mt-4 text-2xl font-bold text-[#050505]">Join the Market community</h2>
          <p className="mt-2 max-w-md text-[15px] text-[#65676b]">
            Create a free account to save products, write reviews, and get price alerts when items drop.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/register"><Button size="lg">Sign Up Free</Button></Link>
            <Link href="/login"><Button size="lg" variant="secondary">Log In</Button></Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
