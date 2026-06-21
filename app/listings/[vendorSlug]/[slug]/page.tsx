import { notFound } from "next/navigation";
import {
  getVendorProductDetail,
  enrichVendorProductForCard,
  getAllVendorProducts,
} from "@/lib/mock";
import { ListingPageClient } from "./ListingPageClient";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ vendorSlug: string; slug: string }>;
}) {
  const { vendorSlug, slug } = await params;
  const listing = getVendorProductDetail(vendorSlug, slug);
  if (!listing) notFound();

  const similar = listing.similarListingIds
    .map((id) => getAllVendorProducts().find((vp) => vp.id === id))
    .filter(Boolean)
    .map((vp) => enrichVendorProductForCard(vp!));

  return <ListingPageClient listing={listing} similar={similar} />;
}
