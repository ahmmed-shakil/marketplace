import { notFound } from "next/navigation";
import { getProductDetail, getProductById } from "@/lib/mock";
import { ProductPageClient } from "./ProductPageClient";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) notFound();

  const related = product.relatedProductIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p != null);

  return <ProductPageClient product={product} related={related} />;
}
