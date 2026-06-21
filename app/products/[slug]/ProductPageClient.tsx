"use client";

import { useState } from "react";
import Link from "next/link";
import { GitCompare, Share2, Heart, MapPin, Shield, Truck } from "lucide-react";
import { PageTransition } from "@/components/motion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantPicker } from "@/components/product/VariantPicker";
import { SpecTable } from "@/components/product/SpecTable";
import { VendorListingTabs, FAQAccordion, ReviewSection } from "@/components/product/ProductSections";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RatingStars, PriceTag, SectionHeader } from "@/components/ui/Display";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ProductDetail, Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function ProductPageClient({ product, related }: { product: ProductDetail; related: Product[] }) {
  const defaultVariant = product.variants.find((v) => v.isDefault) ?? product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant?.id ?? "");
  const variant = product.variants.find((v) => v.id === selectedVariant) ?? defaultVariant;

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: product.category.name, href: `/categories/${product.category.slug}` },
        { label: product.name },
      ]} />

      <div className="mt-4 grid gap-6 lg:grid-cols-5">
        {/* Gallery — 3 cols */}
        <div className="lg:col-span-3">
          <ProductGallery images={product.images} />
        </div>

        {/* Info sidebar — 2 cols, sticky */}
        <div className="lg:col-span-2">
          <div className="fb-card sticky top-20 p-5">
            <Link href={`/brands/${product.brand.slug}`} className="text-sm font-semibold fb-text hover:underline">
              {product.brand.name}
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-[#050505] leading-snug">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} size="md" />
              <span className="text-sm text-[#65676b]">({product.reviewCount} reviews)</span>
              {product.listings.length > 0 && (
                <Badge variant="success">{product.listings.length} vendors</Badge>
              )}
            </div>

            <div className="mt-4 border-y border-[#dadde1] py-4">
              {variant ? (
                <p className="text-3xl font-bold fb-text">{formatPrice(variant.priceMsrp)}</p>
              ) : (
                <PriceTag min={product.minPrice} max={product.maxPrice} size="lg" />
              )}
              <p className="mt-1 text-xs text-[#65676b]">MSRP · Prices vary by vendor</p>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-[#65676b]">{product.description}</p>

            <div className="mt-5">
              <VariantPicker variants={product.variants} selected={selectedVariant} onSelect={setSelectedVariant} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link href={`/compare?ids=${product.id}`} className="col-span-2">
                <Button variant="primary" className="w-full" size="lg">
                  <GitCompare className="h-4 w-4" /> Compare this product
                </Button>
              </Link>
              <Button variant="secondary" size="md"><Heart className="h-4 w-4" /> Save</Button>
              <Button variant="secondary" size="md"><Share2 className="h-4 w-4" /> Share</Button>
            </div>

            <div className="mt-5 space-y-2 rounded-md bg-[#f0f2f5] p-3">
              {[
                { icon: MapPin, text: `${product.listings.length} vendors with stock` },
                { icon: Truck, text: "Nationwide delivery available" },
                { icon: Shield, text: "Verified vendor listings" },
              ].map(({ icon: Icon, text }) => (
                <p key={text} className="flex items-center gap-2 text-[13px] font-medium text-[#050505]">
                  <Icon className="h-4 w-4 text-[#1877f2]" /> {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vendor listings — prominent */}
      <section className="mt-8">
        <div className="fb-card p-5">
          <SectionHeader title="Where to Buy" subtitle={`${product.listings.length} verified vendor listings`} />
          <VendorListingTabs listings={product.listings} />
        </div>
      </section>

      <section className="mt-6">
        <div className="fb-card p-5">
          <SectionHeader title="Specifications" />
          <SpecTable specs={product.specs} />
        </div>
      </section>

      <section className="mt-6">
        <div className="fb-card p-5">
          <SectionHeader title="Reviews" />
          <ReviewSection reviews={product.reviews} />
        </div>
      </section>

      {product.comparisonSlugs.length > 0 && (
        <section className="mt-6">
          <div className="fb-card p-5">
            <SectionHeader title="Compare With" />
            <div className="flex flex-wrap gap-2">
              {product.comparisonSlugs.map((slug) => (
                <Link key={slug} href={`/compare?slug=${slug}`} className="rounded-md border border-[#dadde1] bg-[#f0f2f5] px-4 py-2 text-sm font-semibold text-[#050505] hover:bg-[#e7f3ff] hover:text-[#1877f2]">
                  View comparison →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="fb-card p-5">
          <SectionHeader title="Frequently Asked Questions" />
          <FAQAccordion faqs={product.faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-8">
          <SectionHeader title="Related Products" subtitle="Similar items you might like" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
