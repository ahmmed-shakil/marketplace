import { notFound, redirect } from "next/navigation";
import { getFirstListingForLegacyProductSlug } from "@/lib/mock";
import { listingUrl } from "@/lib/listing-url";
import { getVendorById } from "@/lib/mock/vendors";

export default async function LegacyProductRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getFirstListingForLegacyProductSlug(slug);
  if (!listing) notFound();

  const vendor = getVendorById(listing.vendorId);
  if (!vendor) notFound();

  redirect(listingUrl(vendor.slug, listing.slug));
}
