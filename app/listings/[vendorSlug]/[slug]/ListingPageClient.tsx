"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { GitCompare, Share2, Heart, MapPin, Shield, Truck, Store, Phone } from "lucide-react";
import { PageTransition } from "@/components/motion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AttributeVariantPicker } from "@/components/product/AttributeVariantPicker";
import { SpecTable } from "@/components/product/SpecTable";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RatingStars, SectionHeader } from "@/components/ui/Display";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { ProductVariant, VendorProductCardItem, VendorProductDetail } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { variantAttrsFromSearchParams, resolveVariant } from "@/lib/variant-utils";
import { vendorProductSpecs } from "@/lib/mock/vendor-products";
import { listingUrl } from "@/lib/listing-url";

function toPickerVariants(listing: VendorProductDetail): ProductVariant[] {
  return listing.variants.map((v) => ({
    id: v.id,
    productId: listing.id,
    sku: v.sku ?? v.id,
    name: v.name,
    slug: v.name.toLowerCase().replace(/\s+/g, "-"),
    priceMsrp: v.price,
    attributes: v.attributes,
    isDefault: v.isDefault,
  }));
}

export function ListingPageClient({
  listing,
  similar,
}: {
  listing: VendorProductDetail;
  similar: VendorProductCardItem[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pickerVariants = useMemo(() => toPickerVariants(listing), [listing]);

  const initialAttrs = useMemo(() => {
    const params: Record<string, string | undefined> = {};
    searchParams.forEach((v, k) => {
      params[k] = v;
    });
    return variantAttrsFromSearchParams(params, listing.category.id);
  }, [searchParams, listing.category.id]);

  const defaultVariant = pickerVariants.find((v) => v.isDefault) ?? pickerVariants[0];

  const resolvedInitial = useMemo(() => {
    if (Object.keys(initialAttrs).length) {
      return resolveVariant(pickerVariants, initialAttrs) ?? defaultVariant;
    }
    return defaultVariant;
  }, [initialAttrs, pickerVariants, defaultVariant]);

  const [selectedVariant, setSelectedVariant] = useState(resolvedInitial?.id ?? "");

  const variant = pickerVariants.find((v) => v.id === selectedVariant) ?? defaultVariant;
  const vendorVariant = listing.variants.find((v) => v.id === selectedVariant) ?? listing.variants[0];
  const specs = useMemo(() => vendorProductSpecs(listing), [listing]);
  const brandLabel = listing.brand?.name ?? listing.brandName;

  const handleVariantSelect = useCallback(
    (variantId: string, attrs: Record<string, string>) => {
      setSelectedVariant(variantId);
      const sp = new URLSearchParams();
      Object.entries(attrs).forEach(([k, v]) => {
        if (v) sp.set(k, v);
      });
      const qs = sp.toString();
      router.replace(
        `${listingUrl(listing.vendor.slug, listing.slug)}${qs ? `?${qs}` : ""}`,
        { scroll: false },
      );
    },
    [router, listing.vendor.slug, listing.slug],
  );

  const stockLabel =
    vendorVariant?.stockStatus === "in_stock"
      ? "In stock"
      : vendorVariant?.stockStatus === "low_stock"
        ? "Low stock"
        : vendorVariant?.stockStatus === "pre_order"
          ? "Pre-order"
          : "Out of stock";

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: listing.category.name, href: `/categories/${listing.category.slug}` },
        { label: listing.vendor.businessName, href: `/vendors/${listing.vendor.slug}` },
        { label: listing.name },
      ]} />

      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <ProductGallery
            images={listing.images}
            variants={pickerVariants}
            selectedVariantId={selectedVariant}
          />
        </div>

        <div className="lg:col-span-7">
          <div className="fb-card sticky top-20 p-5">
            <Link
              href={`/vendors/${listing.vendor.slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent-light px-3 py-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <Store className="h-4 w-4" />
              {listing.vendor.businessName}
            </Link>

            {brandLabel && (
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary">{brandLabel}</p>
            )}
            <h1 className="mt-1 text-2xl font-bold text-[#050505] leading-snug">{listing.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={listing.rating} size="md" />
              <span className="text-sm text-[#65676b]">({listing.reviewCount} reviews)</span>
              <Badge variant={vendorVariant?.stockStatus === "in_stock" ? "success" : "default"}>
                {stockLabel}
              </Badge>
            </div>

            <div className="mt-4 border-y border-[#dadde1] py-4">
              {variant && (
                <p className="text-3xl font-bold text-primary">{formatPrice(variant.priceMsrp)}</p>
              )}
              <p className="mt-1 text-xs text-[#65676b]">
                Sold by {listing.vendor.businessName} · {listing.condition} · {listing.warranty ?? "Warranty as stated"}
              </p>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-[#65676b]">{listing.description}</p>

            {pickerVariants.length > 1 && (
              <div className="mt-5">
                <AttributeVariantPicker
                  variants={pickerVariants}
                  categoryId={listing.category.id}
                  selectedId={selectedVariant}
                  initialAttrs={initialAttrs}
                  onSelect={handleVariantSelect}
                />
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link href={`/vendors/${listing.vendor.slug}`} className="col-span-2">
                <Button variant="primary" className="w-full" size="lg">
                  <Store className="h-4 w-4" /> Visit store
                </Button>
              </Link>
              <Button variant="secondary" size="md"><Heart className="h-4 w-4" /> Save</Button>
              <Button variant="secondary" size="md"><Share2 className="h-4 w-4" /> Share</Button>
            </div>

            <div className="mt-5 space-y-2 rounded-md bg-[#f0f2f5] p-3">
              {[
                { icon: MapPin, text: `${listing.location.city}, ${listing.location.district}` },
                { icon: Phone, text: listing.location.phone },
                { icon: Truck, text: listing.deliveryType === "nationwide" ? "Nationwide delivery" : "Local / city delivery" },
                { icon: Shield, text: "Verified vendor listing" },
              ].map(({ icon: Icon, text }) => (
                <p key={text} className="flex items-center gap-2 text-[13px] font-medium text-[#050505]">
                  <Icon className="h-4 w-4 shrink-0 text-primary" /> {text}
                </p>
              ))}
            </div>

            <Link href={`/vendors/${listing.vendor.slug}`} className="mt-4 flex items-center gap-3 rounded-md border border-[#dadde1] p-3 hover:bg-[#f0f2f5]">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
                <Image src={listing.vendor.logoUrl || "/placeholder-vendor.png"} alt={listing.vendor.businessName} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#050505]">{listing.vendor.businessName}</p>
                <p className="text-xs text-[#65676b]">★ {listing.vendor.rating} · {listing.vendor.listingCount} listings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <div className="fb-card p-5">
          <SectionHeader title="Specifications" subtitle="Template specs + vendor custom fields" />
          <SpecTable specs={specs} />
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mt-8">
          <SectionHeader title="Similar Listings" subtitle="Other vendors selling the same or similar product" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} variantSummary={p.variantSummary} />
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
