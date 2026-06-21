"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { PageTransition } from "@/components/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { CategorySpecForm } from "@/components/vendor/CategorySpecForm";
import { CustomSpecFields } from "@/components/vendor/CustomSpecFields";
import { VariantMatrixBuilder, type VariantDraft } from "@/components/vendor/VariantMatrixBuilder";
import { categories, getCategoryAttributes, getFilterableVariantAttributes, getSubcategories, getTopCategories } from "@/lib/mock/categories";
import { brands } from "@/lib/mock/brands";
import { vendors, vendorLocations } from "@/lib/mock/vendors";
import { addVendorProduct } from "@/lib/mock";
import { productImageUrl } from "@/lib/mock/product-images";
import { listingUrl } from "@/lib/listing-url";
import type { CustomSpec, ProductImage, VendorProductVariant } from "@/lib/data";

const STEPS = ["Category", "Basics", "Specs", "Variants", "Fulfillment", "Publish"];

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function NewVendorProductPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [deptId, setDeptId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [templateSpecs, setTemplateSpecs] = useState<Record<string, string>>({});
  const [customSpecs, setCustomSpecs] = useState<CustomSpec[]>([{ key: "", value: "" }]);
  const [variants, setVariants] = useState<VariantDraft[]>([]);
  const [condition, setCondition] = useState<"new" | "refurbished" | "used">("new");
  const [warranty, setWarranty] = useState("Official warranty");
  const [deliveryType, setDeliveryType] = useState<"city" | "district" | "nationwide">("city");

  const departments = getTopCategories();
  const subcategories = deptId ? getSubcategories(deptId) : [];
  const category = categories.find((c) => c.id === categoryId);
  const templateAttrs = useMemo(
    () => (categoryId ? getCategoryAttributes(categoryId) : []),
    [categoryId],
  );
  const variantDims = useMemo(
    () => (categoryId ? getFilterableVariantAttributes(categoryId) : []),
    [categoryId],
  );

  const mockVendor = vendors.find((v) => v.status === "active") ?? vendors[0];
  const location = vendorLocations.find((l) => l.vendorId === mockVendor.id && l.isPrimary)
    ?? vendorLocations.find((l) => l.vendorId === mockVendor.id)!;

  const canNext = () => {
    if (step === 0) return !!categoryId;
    if (step === 1) return name.trim().length > 2 && description.trim().length > 10;
    if (step === 3) return variants.length > 0 && variants.every((v) => v.price > 0);
    return true;
  };

  const handlePublish = () => {
    if (!category || !mockVendor || !location) return;

    const slug = slugify(`${mockVendor.slug}-${name}`).slice(0, 80);
    const vpId = `vp-user-${Date.now()}`;
    const catSlug = category.slug;

    const images: ProductImage[] = [{
      id: `img-${vpId}`,
      productId: vpId,
      url: productImageUrl(slug, catSlug),
      altText: name,
      sortOrder: 0,
      isPrimary: true,
    }];

    const vpVariants: VendorProductVariant[] = variants.map((v, i) => ({
      id: `vpv-${vpId}-${i}`,
      vendorProductId: vpId,
      name: v.name,
      attributes: v.attributes,
      price: v.price,
      stockStatus: v.stockStatus,
      images,
      isDefault: v.isDefault || i === 0,
    }));

    const prices = vpVariants.map((v) => v.price);
    const brand = brands.find((b) => b.id === brandId);

    const vp = addVendorProduct({
      vendorId: mockVendor.id,
      categoryId,
      brandId: brandId || undefined,
      brandName: (brand?.name ?? brandName) || undefined,
      name,
      slug,
      description,
      status: "published",
      templateSpecs,
      customSpecs: customSpecs.filter((s) => s.key && s.value),
      variants: vpVariants,
      images,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      stockStatus: vpVariants.some((v) => v.stockStatus === "out_of_stock") ? "out_of_stock" : "in_stock",
      condition,
      warranty,
      locationId: location.id,
      deliveryType,
      rating: 0,
      reviewCount: 0,
      productGroupId: slugify(`${brandId || brandName}-${name}-${categoryId}`),
    });

    router.push(listingUrl(mockVendor.slug, vp.slug));
  };

  return (
    <PageTransition className="mx-auto max-w-2xl px-4 py-8 lg:px-6">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Vendor", href: "/vendor-signup" },
        { label: "New listing" },
      ]} />

      <div className="mt-4 flex items-center gap-2">
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-[#050505]">List a product</h1>
      </div>
      <p className="mt-1 text-sm text-[#65676b]">Free forever · Pick category, add specs & variants, publish instantly</p>

      <div className="mt-6 flex gap-1">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "fb-primary" : "bg-[#dadde1]"}`}
            title={label}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-semibold text-[#65676b]">Step {step + 1}: {STEPS[step]}</p>

      <div className="mt-6 fb-card p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#050505]">Department</label>
              <Select className="mt-1 w-full" value={deptId} onChange={(e) => { setDeptId(e.target.value); setCategoryId(""); }}>
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </Select>
            </div>
            {subcategories.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-[#050505]">Subcategory *</label>
                <Select className="mt-1 w-full" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Select subcategory</option>
                  {subcategories.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#050505]">Product name *</label>
              <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. iPhone 16 Pro Max" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#050505]">Brand</label>
              <Select className="mt-1 w-full" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                <option value="">Select brand (optional)</option>
                {brands.slice(0, 40).map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </Select>
              {!brandId && (
                <Input className="mt-2" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Or type brand name" />
              )}
            </div>
            <div>
              <label className="text-sm font-semibold text-[#050505]">Description *</label>
              <Textarea className="mt-1" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your product, condition, what's included..." />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#050505]">Category specifications</h3>
              <p className="mt-1 text-xs text-[#65676b]">Based on {category?.name} template</p>
              <div className="mt-3">
                <CategorySpecForm
                  attributes={templateAttrs}
                  values={templateSpecs}
                  onChange={(slug, val) => setTemplateSpecs((prev) => ({ ...prev, [slug]: val }))}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#050505]">Custom specifications</h3>
              <p className="mt-1 text-xs text-[#65676b]">Add unlimited key-value pairs</p>
              <div className="mt-3">
                <CustomSpecFields specs={customSpecs} onChange={setCustomSpecs} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <VariantMatrixBuilder dimensions={variantDims} variants={variants} onChange={setVariants} />
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#050505]">Condition</label>
              <Select className="mt-1 w-full" value={condition} onChange={(e) => setCondition(e.target.value as typeof condition)}>
                <option value="new">New</option>
                <option value="refurbished">Refurbished</option>
                <option value="used">Used</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#050505]">Warranty</label>
              <Input className="mt-1" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#050505]">Delivery</label>
              <Select className="mt-1 w-full" value={deliveryType} onChange={(e) => setDeliveryType(e.target.value as typeof deliveryType)}>
                <option value="city">City delivery / pickup</option>
                <option value="district">District-wide</option>
                <option value="nationwide">Nationwide</option>
              </Select>
            </div>
            <p className="text-xs text-[#65676b]">Listing as: {mockVendor.businessName} · {location.city}</p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Category:</span> {category?.name}</p>
            <p><span className="font-semibold">Name:</span> {name}</p>
            <p><span className="font-semibold">Variants:</span> {variants.length} configuration(s)</p>
            <p><span className="font-semibold">Price range:</span> ৳{Math.min(...variants.map((v) => v.price)).toLocaleString()} – ৳{Math.max(...variants.map((v) => v.price)).toLocaleString()}</p>
            <p className="text-[#65676b]">Your listing will be live immediately on Market.</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button disabled={!canNext()} onClick={() => setStep((s) => s + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handlePublish}>Publish listing</Button>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-[#65676b]">
        Not registered yet? <Link href="/vendor-signup" className="font-semibold text-primary hover:underline">Sign up free</Link>
      </p>
    </PageTransition>
  );
}
