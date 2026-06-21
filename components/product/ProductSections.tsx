"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Truck, Globe } from "lucide-react";
import type { EnrichedListing } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { StockBadge } from "@/components/ui/Display";
import { Tabs } from "@/components/ui/Tabs";
import Link from "next/link";

function ListingCard({ listing }: { listing: EnrichedListing }) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-[#dadde1] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full fb-primary text-sm font-bold text-white">
          {listing.vendor.businessName.charAt(0)}
        </div>
        <div>
          <Link href={`/vendors/${listing.vendor.slug}`} className="font-semibold text-[#050505] hover:text-primary">
            {listing.vendor.businessName}
          </Link>
          <p className="text-xs text-[#65676b]">{listing.location.city} · {listing.location.address}</p>
          {listing.distanceKm != null && listing.distanceKm < 50 && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600">
              <MapPin className="h-3 w-3" /> {listing.distanceKm} km away
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 sm:text-right">
        <div>
          <p className="text-lg font-bold text-primary">{formatPrice(listing.price)}</p>
          <StockBadge status={listing.stockStatus} />
        </div>
        <button className="rounded-md fb-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">Contact Vendor</button>
      </div>
    </div>
  );
}

export function VendorListingTabs({
  listings,
  variantLabel,
}: {
  listings: EnrichedListing[];
  variantLabel?: string;
}) {
  const nearby = listings.filter((l) => l.deliveryType === "city" || (l.distanceKm != null && l.distanceKm < 20));
  const nationwide = listings.filter((l) => l.deliveryType === "nationwide");
  const international = listings.filter((l) => l.deliveryType === "international");

  if (listings.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-[#dadde1] bg-[#f0f2f5] p-6 text-center text-sm text-[#65676b]">
        No vendors for{variantLabel ? ` ${variantLabel}` : " this configuration"} — try another variant above.
      </p>
    );
  }

  const tabs = [
    { id: "nearby", label: `Nearby (${nearby.length})`, content: <div className="space-y-3">{nearby.length ? nearby.map((l) => <ListingCard key={l.id} listing={l} />) : <p className="text-sm text-[#65676b]">No nearby vendors</p>}</div> },
    { id: "nationwide", label: `Nationwide (${nationwide.length})`, content: <div className="space-y-3">{nationwide.length ? nationwide.map((l) => <ListingCard key={l.id} listing={l} />) : <p className="text-sm text-[#65676b]">No nationwide vendors</p>}</div> },
    { id: "international", label: `International (${international.length})`, content: <div className="space-y-3">{international.length ? international.map((l) => <ListingCard key={l.id} listing={l} />) : <p className="text-sm text-[#65676b]">No international vendors</p>}</div> },
  ];

  return (
    <div>
      {variantLabel && (
        <p className="mb-3 text-sm font-medium text-[#65676b]">
          Showing prices for: <span className="font-semibold text-[#050505]">{variantLabel}</span>
        </p>
      )}
      <div className="mb-4 flex items-center gap-2 text-sm text-[#65676b]">
        <Truck className="h-4 w-4" /> Delivery options from verified vendors
        <Globe className="ml-2 h-4 w-4" /> Free listings forever
      </div>
      <Tabs tabs={tabs} defaultTab="nearby" />
    </div>
  );
}

export function FAQAccordion({ faqs }: { faqs: { id: string; question: string; answer: string }[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  return (
    <div className="space-y-2">
      {faqs.map((faq) => (
        <div key={faq.id} className="overflow-hidden rounded-lg border border-[#dadde1] bg-white">
          <button
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
            className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[#050505] hover:bg-[#f0f2f5]"
          >
            {faq.question}
            <ChevronDown className={`h-4 w-4 shrink-0 text-[#65676b] transition-transform ${open === faq.id ? "rotate-180" : ""}`} />
          </button>
          {open === faq.id && (
            <div className="border-t border-[#dadde1] px-5 py-4 text-sm text-[#65676b]">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ReviewSection({ reviews }: { reviews: import("@/lib/data").Review[] }) {
  const expert = reviews.filter((r) => r.type === "expert");
  const user = reviews.filter((r) => r.type === "user");

  return (
    <Tabs
      tabs={[
        { id: "all", label: `All (${reviews.length})`, content: <ReviewList reviews={reviews} /> },
        { id: "expert", label: `Expert (${expert.length})`, content: <ReviewList reviews={expert} /> },
        { id: "user", label: `User (${user.length})`, content: <ReviewList reviews={user} /> },
      ]}
    />
  );
}

function ReviewList({ reviews }: { reviews: import("@/lib/data").Review[] }) {
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-lg border border-[#dadde1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-xs font-bold text-primary">
                {r.userName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#050505]">{r.userName}</p>
                {r.type === "expert" && <span className="text-xs text-primary">Expert Review</span>}
              </div>
            </div>
            <div className="flex">{Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-amber-400">★</span>)}</div>
          </div>
          <h4 className="mt-3 font-semibold text-[#050505]">{r.title}</h4>
          <p className="mt-1 text-sm text-[#65676b]">{r.body}</p>
        </div>
      ))}
    </div>
  );
}
