import type { Product, ProductVariant, SpecRow } from "../data";
import { categories } from "./categories";
import { productImageUrl } from "./product-images";
import { additionalProducts, additionalSpecs, additionalVariants } from "./products-additional";
import {
  generateCatalogProducts,
  generateCatalogVariants,
  generateCatalogSpecs,
  applyCategoryProductCounts,
} from "./seed-catalog";

function catSlug(categoryId: string): string {
  return categories.find((c) => c.id === categoryId)?.slug ?? "general";
}

const img = (productId: string, slug: string, categoryId: string, alt: string, sortOrder = 0, isPrimary = true) => ({
  id: `img-${productId}-${sortOrder}`,
  productId,
  url: productImageUrl(slug, catSlug(categoryId)),
  altText: alt,
  sortOrder,
  isPrimary,
});

const baseProducts: Product[] = [
  { id: "prod-iphone-16-pro-max", brandId: "brand-apple", categoryId: "cat-smartphones", name: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", description: "The most advanced iPhone ever with A18 Pro chip, 48MP camera system, and titanium design.", status: "published", minPrice: 179900, maxPrice: 219900, rating: 4.8, reviewCount: 342, tags: ["flagship", "5g"], createdAt: "2025-09-15", images: [img("prod-iphone-16-pro-max", "iphone-16-pro-max", "cat-smartphones", "iPhone 16 Pro Max")] },
  { id: "prod-samsung-s24-ultra", brandId: "brand-samsung", categoryId: "cat-smartphones", name: "Samsung Galaxy S24 Ultra", slug: "samsung-galaxy-s24-ultra", description: "Galaxy AI powered flagship with S Pen, 200MP camera, and titanium frame.", status: "published", minPrice: 154900, maxPrice: 174900, rating: 4.7, reviewCount: 289, tags: ["flagship", "5g"], createdAt: "2025-01-20", images: [img("prod-samsung-s24-ultra", "samsung-galaxy-s24-ultra", "cat-smartphones", "Samsung S24 Ultra")] },
  { id: "prod-xiaomi-14", brandId: "brand-xiaomi", categoryId: "cat-smartphones", name: "Xiaomi 14", slug: "xiaomi-14", description: "Leica-tuned cameras with Snapdragon 8 Gen 3 in a compact flagship body.", status: "published", minPrice: 74900, maxPrice: 89900, rating: 4.5, reviewCount: 156, tags: ["flagship"], createdAt: "2025-02-10", images: [img("prod-xiaomi-14", "xiaomi-14", "cat-smartphones", "Xiaomi 14")] },
  { id: "prod-macbook-air-m3", brandId: "brand-apple", categoryId: "cat-laptops", name: "MacBook Air M3", slug: "macbook-air-m3", description: "Remarkably thin laptop with M3 chip, 18-hour battery, and Liquid Retina display.", status: "published", minPrice: 134900, maxPrice: 174900, rating: 4.9, reviewCount: 198, createdAt: "2024-03-05", images: [img("prod-macbook-air-m3", "macbook-air-m3", "cat-laptops", "MacBook Air")] },
  { id: "prod-samsung-qled-55", brandId: "brand-samsung", categoryId: "cat-tvs", name: "Samsung 55\" QLED 4K TV", slug: "samsung-55-qled-4k", description: "Quantum Dot technology with HDR10+ and smart TV features.", status: "published", minPrice: 89900, maxPrice: 99900, rating: 4.6, reviewCount: 87, createdAt: "2024-06-12", images: [img("prod-samsung-qled-55", "samsung-55-qled-4k", "cat-tvs", "Samsung QLED TV")] },
  { id: "prod-sony-wh1000xm5", brandId: "brand-sony", categoryId: "cat-audio", name: "Sony WH-1000XM5", slug: "sony-wh-1000xm5", description: "Industry-leading noise cancellation with 30-hour battery life.", status: "published", minPrice: 32900, maxPrice: 36900, rating: 4.8, reviewCount: 412, createdAt: "2023-05-18", images: [img("prod-sony-wh1000xm5", "sony-wh-1000xm5", "cat-audio", "Sony Headphones")] },
  { id: "prod-hunter-350", brandId: "brand-royal-enfield", categoryId: "cat-motorcycles", name: "Royal Enfield Hunter 350", slug: "royal-enfield-hunter-350", description: "Retro-modern roadster with 349cc engine and agile city handling.", status: "published", minPrice: 234000, maxPrice: 249000, rating: 4.4, reviewCount: 178, createdAt: "2023-08-01", images: [img("prod-hunter-350", "royal-enfield-hunter-350", "cat-motorcycles", "Royal Enfield Hunter 350")] },
  { id: "prod-yamaha-r15", brandId: "brand-yamaha", categoryId: "cat-motorcycles", name: "Yamaha R15 V4", slug: "yamaha-r15-v4", description: "Track-inspired sport bike with 155cc liquid-cooled engine and VVA.", status: "published", minPrice: 545000, maxPrice: 575000, rating: 4.6, reviewCount: 245, createdAt: "2023-03-22", images: [img("prod-yamaha-r15", "yamaha-r15-v4", "cat-motorcycles", "Yamaha R15")] },
  { id: "prod-corolla-cross", brandId: "brand-toyota", categoryId: "cat-cars", name: "Toyota Corolla Cross", slug: "toyota-corolla-cross", description: "Versatile compact SUV with hybrid option and Toyota Safety Sense.", status: "published", minPrice: 4200000, maxPrice: 4800000, rating: 4.5, reviewCount: 56, createdAt: "2024-01-10", images: [img("prod-corolla-cross", "toyota-corolla-cross", "cat-cars", "Toyota Corolla Cross")] },
  { id: "prod-rockrider-st530", brandId: "brand-rockrider", categoryId: "cat-cycling", name: "Rockrider ST 530", slug: "rockrider-st-530", description: "Entry-level mountain bike with 27.5\" wheels and 21-speed drivetrain.", status: "published", minPrice: 32900, maxPrice: 32900, rating: 4.3, reviewCount: 89, createdAt: "2024-04-05", images: [img("prod-rockrider-st530", "rockrider-st-530", "cat-cycling", "Rockrider ST 530")] },
  { id: "prod-lg-ac-15", brandId: "brand-lg", categoryId: "cat-ac", name: "LG Dual Inverter AC 1.5 Ton", slug: "lg-dual-inverter-ac-1-5-ton", description: "Energy-efficient split AC with dual inverter compressor and Wi-Fi control.", status: "published", minPrice: 68900, maxPrice: 74900, rating: 4.5, reviewCount: 134, createdAt: "2024-02-28", images: [img("prod-lg-ac-15", "lg-dual-inverter-ac-1-5-ton", "cat-ac", "LG AC")] },
  { id: "prod-walton-fridge", brandId: "brand-walton", categoryId: "cat-fridges", name: "Walton WNI-6E5-GD Double Door", slug: "walton-double-door-fridge", description: "425L frost-free refrigerator with inverter technology.", status: "published", minPrice: 54900, maxPrice: 59900, rating: 4.2, reviewCount: 67, createdAt: "2024-05-15", images: [img("prod-walton-fridge", "walton-double-door-fridge", "cat-fridges", "Walton Fridge")] },
  { id: "prod-samsung-washer", brandId: "brand-samsung", categoryId: "cat-washers", name: "Samsung 9kg Front Load Washer", slug: "samsung-9kg-front-load", description: "EcoBubble technology with Digital Inverter Motor and Add Wash.", status: "published", minPrice: 64900, maxPrice: 72900, rating: 4.4, reviewCount: 45, createdAt: "2024-07-01", images: [img("prod-samsung-washer", "samsung-9kg-front-load", "cat-washers", "Samsung Washer")] },
  { id: "prod-walton-phone", brandId: "brand-walton", categoryId: "cat-smartphones", name: "Walton NEXG N25", slug: "walton-nexg-n25", description: "Affordable 5G smartphone made in Bangladesh with 50MP camera.", status: "published", minPrice: 18999, maxPrice: 21999, rating: 4.0, reviewCount: 312, tags: ["budget", "5g"], createdAt: "2025-04-01", images: [img("prod-walton-phone", "walton-nexg-n25", "cat-smartphones", "Walton NEXG")] },
  { id: "prod-bosch-drill", brandId: "brand-bosch", categoryId: "cat-power-tools", name: "Bosch GSB 120-LI Cordless Drill", slug: "bosch-gsb-120-li", description: "12V cordless impact drill with 2-speed gearbox and LED light.", status: "published", minPrice: 8900, maxPrice: 10500, rating: 4.7, reviewCount: 203, createdAt: "2023-11-20", images: [img("prod-bosch-drill", "bosch-gsb-120-li", "cat-power-tools", "Bosch Drill")] },
  { id: "prod-nike-airmax", brandId: "brand-nike", categoryId: "cat-footwear", name: "Nike Air Max 90", slug: "nike-air-max-90", description: "Classic sneaker with visible Air cushioning and durable leather upper.", status: "published", minPrice: 12999, maxPrice: 14999, rating: 4.6, reviewCount: 528, createdAt: "2024-08-10", images: [img("prod-nike-airmax", "nike-air-max-90", "cat-footwear", "Nike Air Max")] },
  { id: "prod-honda-city", brandId: "brand-honda", categoryId: "cat-cars", name: "Honda City", slug: "honda-city", description: "Premium sedan with refined interior and excellent fuel efficiency.", status: "published", minPrice: 3800000, maxPrice: 4200000, rating: 4.4, reviewCount: 42, createdAt: "2024-09-01", images: [img("prod-honda-city", "honda-city", "cat-cars", "Honda City")] },
  { id: "prod-philips-airfryer", brandId: "brand-philips", categoryId: "cat-kitchen-appliances", name: "Philips Air Fryer XXL", slug: "philips-air-fryer-xxl", description: "Rapid Air technology for healthier frying with 1.4kg capacity.", status: "published", minPrice: 18999, maxPrice: 22999, rating: 4.5, reviewCount: 167, createdAt: "2024-03-18", images: [img("prod-philips-airfryer", "philips-air-fryer-xxl", "cat-kitchen-appliances", "Philips Air Fryer")] },
  { id: "prod-asus-rog", brandId: "brand-xiaomi", categoryId: "cat-laptops", name: "ASUS ROG Strix G16", slug: "asus-rog-strix-g16", description: "Gaming laptop with RTX 4060, 165Hz display, and RGB keyboard.", status: "published", minPrice: 189900, maxPrice: 219900, rating: 4.7, reviewCount: 78, createdAt: "2024-10-05", images: [img("prod-asus-rog", "asus-rog-strix-g16", "cat-laptops", "ROG Laptop")] },
  { id: "prod-walton-ac", brandId: "brand-walton", categoryId: "cat-ac", name: "Walton WSI-INVERTER-18A 1.5 Ton", slug: "walton-inverter-ac-1-5-ton", description: "Made in Bangladesh inverter AC with R32 refrigerant.", status: "published", minPrice: 52900, maxPrice: 58900, rating: 4.1, reviewCount: 98, createdAt: "2024-06-20", images: [img("prod-walton-ac", "walton-inverter-ac-1-5-ton", "cat-ac", "Walton AC")] },
  { id: "prod-trek-marlin", brandId: "brand-rockrider", categoryId: "cat-cycling", name: "Trek Marlin 5", slug: "trek-marlin-5", description: "Versatile hardtail mountain bike for trail and everyday riding.", status: "published", minPrice: 89900, maxPrice: 94900, rating: 4.5, reviewCount: 34, createdAt: "2024-11-01", images: [img("prod-trek-marlin", "trek-marlin-5", "cat-cycling", "Trek Marlin")] },
  { id: "prod-galaxy-a55", brandId: "brand-samsung", categoryId: "cat-smartphones", name: "Samsung Galaxy A55 5G", slug: "samsung-galaxy-a55", description: "Mid-range 5G phone with Super AMOLED display and IP67 rating.", status: "published", minPrice: 42900, maxPrice: 47900, rating: 4.3, reviewCount: 189, tags: ["mid-range", "5g"], createdAt: "2024-12-01", images: [img("prod-galaxy-a55", "samsung-galaxy-a55", "cat-smartphones", "Galaxy A55")] },
  { id: "prod-redmi-note", brandId: "brand-xiaomi", categoryId: "cat-smartphones", name: "Redmi Note 13 Pro", slug: "redmi-note-13-pro", description: "200MP camera phone with 120W HyperCharge at budget price.", status: "published", minPrice: 34999, maxPrice: 39999, rating: 4.4, reviewCount: 267, tags: ["budget"], createdAt: "2024-08-20", images: [img("prod-redmi-note", "redmi-note-13-pro", "cat-smartphones", "Redmi Note 13")] },
  { id: "prod-galaxy-s26", brandId: "brand-samsung", categoryId: "cat-smartphones", name: "Samsung Galaxy S26", slug: "samsung-galaxy-s26", description: "Next-gen Galaxy flagship with AI camera, Snapdragon 8 Elite, and all-day battery.", status: "published", minPrice: 89900, maxPrice: 124900, rating: 4.7, reviewCount: 124, tags: ["flagship", "5g"], createdAt: "2026-02-15", images: [img("prod-galaxy-s26", "samsung-galaxy-s26", "cat-smartphones", "Samsung Galaxy S26")] },
  { id: "prod-pran-miniket", brandId: "brand-walton", categoryId: "cat-rice-grains", name: "Pran Miniket Rice", slug: "pran-miniket-rice", description: "Premium Miniket rice — fragrant, long grain, ideal for daily meals.", status: "published", minPrice: 89, maxPrice: 2890, rating: 4.5, reviewCount: 892, createdAt: "2025-01-10", images: [img("prod-pran-miniket", "pran-miniket-rice", "cat-rice-grains", "Pran Miniket Rice")] },
];

const manualProducts: Product[] = [...baseProducts, ...additionalProducts];
const generatedProducts = generateCatalogProducts(manualProducts);

export const products: Product[] = [...manualProducts, ...generatedProducts];

const flagshipVariants: ProductVariant[] = [
  { id: "var-iphone-256", productId: "prod-iphone-16-pro-max", sku: "IP16PM-256-NT", name: "256GB Natural Titanium", slug: "256gb-natural-titanium", priceMsrp: 179900, isDefault: true, attributes: { storage: "256GB", color: "Natural Titanium", ram: "8GB" } },
  { id: "var-iphone-512", productId: "prod-iphone-16-pro-max", sku: "IP16PM-512-NT", name: "512GB Natural Titanium", slug: "512gb-natural-titanium", priceMsrp: 199900, isDefault: false, attributes: { storage: "512GB", color: "Natural Titanium", ram: "8GB" } },
  { id: "var-iphone-1tb", productId: "prod-iphone-16-pro-max", sku: "IP16PM-1TB-BT", name: "1TB Black Titanium", slug: "1tb-black-titanium", priceMsrp: 219900, isDefault: false, attributes: { storage: "1TB", color: "Black Titanium", ram: "8GB" } },
  { id: "var-hunter-red", productId: "prod-hunter-350", sku: "RE-H350-RED", name: "Rebel Red", slug: "rebel-red", priceMsrp: 234000, isDefault: true, attributes: { color: "Rebel Red" } },
  { id: "var-hunter-blue", productId: "prod-hunter-350", sku: "RE-H350-BLU", name: "Dapper Ash", slug: "dapper-ash", priceMsrp: 239000, isDefault: false, attributes: { color: "Dapper Ash" } },
  { id: "var-r15-racing", productId: "prod-yamaha-r15", sku: "Y-R15V4-RC", name: "Racing Blue", slug: "racing-blue", priceMsrp: 545000, isDefault: true, attributes: { color: "Racing Blue" } },
  { id: "var-rockrider-s", productId: "prod-rockrider-st530", sku: "RD-ST530-S", name: "S / Grey", slug: "size-s-grey", priceMsrp: 31900, isDefault: false, attributes: { frame_size: "S", frame: "Aluminum", wheel_size: "27.5\"", color: "Grey" } },
  { id: "var-rockrider-m", productId: "prod-rockrider-st530", sku: "RD-ST530-M", name: "M / Grey", slug: "size-m-grey", priceMsrp: 32900, isDefault: true, attributes: { frame_size: "M", frame: "Aluminum", wheel_size: "27.5\"", color: "Grey" } },
  { id: "var-rockrider-l", productId: "prod-rockrider-st530", sku: "RD-ST530-L", name: "L / Grey", slug: "size-l-grey", priceMsrp: 32900, isDefault: false, attributes: { frame_size: "L", frame: "Aluminum", wheel_size: "27.5\"", color: "Grey" } },
  { id: "var-trek-s", productId: "prod-trek-marlin", sku: "TRK-M5-S", name: "S / Marlin Red", slug: "trek-s-red", priceMsrp: 89900, isDefault: false, attributes: { frame_size: "S", frame: "Aluminum", wheel_size: "29\"" } },
  { id: "var-trek-m", productId: "prod-trek-marlin", sku: "TRK-M5-M", name: "M / Marlin Red", slug: "trek-m-red", priceMsrp: 91900, isDefault: true, attributes: { frame_size: "M", frame: "Aluminum", wheel_size: "29\"" } },
  { id: "var-trek-l", productId: "prod-trek-marlin", sku: "TRK-M5-L", name: "L / Marlin Red", slug: "trek-l-red", priceMsrp: 94900, isDefault: false, attributes: { frame_size: "L", frame: "Aluminum", wheel_size: "29\"" } },
  { id: "var-lg-ac-default", productId: "prod-lg-ac-15", sku: "LG-AC-15", name: "Standard", slug: "standard", priceMsrp: 68900, isDefault: true, attributes: { capacity: "1.5 Ton", type: "Split" } },
  { id: "var-s24-256", productId: "prod-samsung-s24-ultra", sku: "S24U-256", name: "256GB Titanium Gray", slug: "256gb-titanium-gray", priceMsrp: 154900, isDefault: true, attributes: { storage: "256GB", color: "Titanium Gray", ram: "12GB" } },
  { id: "var-s26-128-8", productId: "prod-galaxy-s26", sku: "S26-128-8-BLK", name: "128GB · 8GB · Black", slug: "128gb-8gb-black", priceMsrp: 89900, isDefault: false, attributes: { storage: "128GB", ram: "8GB", color: "Black" } },
  { id: "var-s26-256-12-v", productId: "prod-galaxy-s26", sku: "S26-256-12-VIO", name: "256GB · 12GB · Violet", slug: "256gb-12gb-violet", priceMsrp: 99900, isDefault: true, attributes: { storage: "256GB", ram: "12GB", color: "Violet" } },
  { id: "var-s26-256-12-s", productId: "prod-galaxy-s26", sku: "S26-256-12-SLV", name: "256GB · 12GB · Silver", slug: "256gb-12gb-silver", priceMsrp: 99900, isDefault: false, attributes: { storage: "256GB", ram: "12GB", color: "Silver" } },
  { id: "var-s26-512-12-b", productId: "prod-galaxy-s26", sku: "S26-512-12-BLK", name: "512GB · 12GB · Black", slug: "512gb-12gb-black", priceMsrp: 114900, isDefault: false, attributes: { storage: "512GB", ram: "12GB", color: "Black" } },
  { id: "var-s26-512-16-s", productId: "prod-galaxy-s26", sku: "S26-512-16-SLV", name: "512GB · 16GB · Silver", slug: "512gb-16gb-silver", priceMsrp: 124900, isDefault: false, attributes: { storage: "512GB", ram: "16GB", color: "Silver" } },
  { id: "var-rice-1kg", productId: "prod-pran-miniket", sku: "PRAN-MK-1KG", name: "1kg Pack", slug: "1kg", priceMsrp: 89, isDefault: false, attributes: { pack_size: "1kg", grain_type: "Miniket" } },
  { id: "var-rice-2kg", productId: "prod-pran-miniket", sku: "PRAN-MK-2KG", name: "2kg Pack", slug: "2kg", priceMsrp: 169, isDefault: false, attributes: { pack_size: "2kg", grain_type: "Miniket" } },
  { id: "var-rice-5kg", productId: "prod-pran-miniket", sku: "PRAN-MK-5KG", name: "5kg Pack", slug: "5kg", priceMsrp: 399, isDefault: true, attributes: { pack_size: "5kg", grain_type: "Miniket" } },
  { id: "var-rice-25kg", productId: "prod-pran-miniket", sku: "PRAN-MK-25KG", name: "25kg Bag", slug: "25kg", priceMsrp: 2890, isDefault: false, attributes: { pack_size: "25kg", grain_type: "Miniket" } },
  { id: "var-nike-9", productId: "prod-nike-airmax", sku: "NK-AM90-9", name: "Size 9 · White", slug: "size-9-white", priceMsrp: 12999, isDefault: true, attributes: { size: "9", color: "White" } },
  { id: "var-nike-10", productId: "prod-nike-airmax", sku: "NK-AM90-10", name: "Size 10 · Black", slug: "size-10-black", priceMsrp: 13499, isDefault: false, attributes: { size: "10", color: "Black" } },
  { id: "var-nike-11", productId: "prod-nike-airmax", sku: "NK-AM90-11", name: "Size 11 · Grey", slug: "size-11-grey", priceMsrp: 14999, isDefault: false, attributes: { size: "11", color: "Grey" } },
  { id: "var-macbook-256-mid", productId: "prod-macbook-air-m3", sku: "MBA-M3-256-M", name: "256GB · 8GB · Midnight", slug: "256gb-8gb-midnight", priceMsrp: 134900, isDefault: true, attributes: { storage: "256GB SSD", ram: "8GB", color: "Midnight" } },
  { id: "var-macbook-512-mid", productId: "prod-macbook-air-m3", sku: "MBA-M3-512-M", name: "512GB · 8GB · Midnight", slug: "512gb-8gb-midnight", priceMsrp: 154900, isDefault: false, attributes: { storage: "512GB SSD", ram: "8GB", color: "Midnight" } },
  { id: "var-macbook-256-star", productId: "prod-macbook-air-m3", sku: "MBA-M3-256-S", name: "256GB · 8GB · Starlight", slug: "256gb-8gb-starlight", priceMsrp: 134900, isDefault: false, attributes: { storage: "256GB SSD", ram: "8GB", color: "Starlight" } },
  { id: "var-macbook-512-silver", productId: "prod-macbook-air-m3", sku: "MBA-M3-512-SV", name: "512GB · 16GB · Silver", slug: "512gb-16gb-silver", priceMsrp: 174900, isDefault: false, attributes: { storage: "512GB SSD", ram: "16GB", color: "Silver" } },
  { id: "var-macbook-256-space", productId: "prod-macbook-air-m3", sku: "MBA-M3-256-SG", name: "256GB · 8GB · Space Gray", slug: "256gb-8gb-space-gray", priceMsrp: 134900, isDefault: false, attributes: { storage: "256GB SSD", ram: "8GB", color: "Space Gray" } },
  ...additionalVariants,
];

const catalogVariants = generateCatalogVariants(products, flagshipVariants);

export const variants: ProductVariant[] = [...flagshipVariants, ...catalogVariants];

export const productSpecs: Record<string, SpecRow[]> = {
  "prod-iphone-16-pro-max": [
    { name: "RAM", slug: "ram", value: "8GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "256GB – 1TB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "48MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "4685 mAh", group: "Battery", isComparable: true },
    { name: "Display", slug: "display", value: "6.9 inches", group: "Display", isComparable: true },
    { name: "5G Support", slug: "5g", value: "Yes", group: "Connectivity", isComparable: true },
    { name: "Chip", slug: "chip", value: "A18 Pro", group: "Performance", isComparable: true },
  ],
  "prod-hunter-350": [
    { name: "Engine", slug: "engine", value: "349 cc", group: "Engine", isComparable: true },
    { name: "Max Power", slug: "power", value: "20.2 bhp", group: "Engine", isComparable: true },
    { name: "Max Torque", slug: "torque", value: "27 Nm", group: "Engine", isComparable: true },
    { name: "Mileage", slug: "mileage", value: "35–40 km/l", group: "Performance", isComparable: true },
    { name: "Fuel Capacity", slug: "fuel", value: "13 L", group: "Performance", isComparable: true },
    { name: "Kerb Weight", slug: "weight", value: "177 kg", group: "Dimensions", isComparable: true },
  ],
  "prod-rockrider-st530": [
    { name: "Frame Material", slug: "frame", value: "Aluminum", group: "Frame", isComparable: true },
    { name: "Weight", slug: "weight", value: "14.5 kg", group: "Frame", isComparable: true },
    { name: "Wheel Size", slug: "wheels", value: "27.5\"", group: "Wheels", isComparable: true },
    { name: "Gears", slug: "gears", value: "21", group: "Drivetrain", isComparable: true },
    { name: "Suspension", slug: "suspension", value: "Front only", group: "Frame", isComparable: true },
  ],
  "prod-lg-ac-15": [
    { name: "Capacity", slug: "capacity", value: "1.5 Ton", group: "Cooling", isComparable: true },
    { name: "Type", slug: "type", value: "Split", group: "General", isComparable: true },
    { name: "Energy Rating", slug: "energy", value: "5 Star", group: "Efficiency", isComparable: true },
    { name: "Inverter", slug: "inverter", value: "Yes", group: "Efficiency", isComparable: true },
    { name: "Cooling Area", slug: "area", value: "150 sq ft", group: "Cooling", isComparable: true },
  ],
  "prod-samsung-s24-ultra": [
    { name: "RAM", slug: "ram", value: "12GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "256GB – 1TB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "200MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "5000 mAh", group: "Battery", isComparable: true },
    { name: "Display", slug: "display", value: "6.8 inches", group: "Display", isComparable: true },
    { name: "5G Support", slug: "5g", value: "Yes", group: "Connectivity", isComparable: true },
  ],
  "prod-yamaha-r15": [
    { name: "Engine", slug: "engine", value: "155 cc", group: "Engine", isComparable: true },
    { name: "Max Power", slug: "power", value: "18.4 bhp", group: "Engine", isComparable: true },
    { name: "Mileage", slug: "mileage", value: "40–45 km/l", group: "Performance", isComparable: true },
    { name: "Kerb Weight", slug: "weight", value: "142 kg", group: "Dimensions", isComparable: true },
  ],
  "prod-xiaomi-14": [
    { name: "RAM", slug: "ram", value: "12GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "256GB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "50MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "4610 mAh", group: "Battery", isComparable: true },
    { name: "Display", slug: "display", value: "6.36 inches", group: "Display", isComparable: true },
    { name: "5G Support", slug: "5g", value: "Yes", group: "Connectivity", isComparable: true },
  ],
  "prod-walton-phone": [
    { name: "RAM", slug: "ram", value: "6GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "128GB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "50MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "5000 mAh", group: "Battery", isComparable: true },
    { name: "5G Support", slug: "5g", value: "Yes", group: "Connectivity", isComparable: true },
  ],
  "prod-galaxy-a55": [
    { name: "RAM", slug: "ram", value: "8GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "128GB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "50MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "5000 mAh", group: "Battery", isComparable: true },
    { name: "5G Support", slug: "5g", value: "Yes", group: "Connectivity", isComparable: true },
  ],
  "prod-redmi-note": [
    { name: "RAM", slug: "ram", value: "8GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "256GB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "200MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "5100 mAh", group: "Battery", isComparable: true },
  ],
  "prod-galaxy-s26": [
    { name: "RAM", slug: "ram", value: "8GB – 16GB", group: "Performance", isComparable: true },
    { name: "Storage", slug: "storage", value: "128GB – 512GB", group: "Performance", isComparable: true },
    { name: "Main Camera", slug: "camera", value: "200MP", group: "Camera", isComparable: true },
    { name: "Battery", slug: "battery", value: "5000 mAh", group: "Battery", isComparable: true },
    { name: "5G Support", slug: "5g", value: "Yes", group: "Connectivity", isComparable: true },
  ],
  "prod-pran-miniket": [
    { name: "Grain Type", slug: "grain_type", value: "Miniket", group: "General", isComparable: true },
    { name: "Pack Size", slug: "pack_size", value: "1kg – 25kg", group: "General", isComparable: true },
  ],
  ...additionalSpecs,
  ...generateCatalogSpecs(products),
};

applyCategoryProductCounts(products);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getVariantsForProduct(productId: string): ProductVariant[] {
  return variants.filter((v) => v.productId === productId);
}

export function getSpecsForProduct(productId: string): SpecRow[] {
  return productSpecs[productId] ?? [
    { name: "Brand", slug: "brand", value: "See product", group: "General", isComparable: false },
    { name: "Warranty", slug: "warranty", value: "1 Year", group: "General", isComparable: true },
  ];
}

export function getProductsByCategory(categoryId: string): Product[] {
  const cat = categories.find((c) => c.id === categoryId);
  if (!cat) return [];
  const childIds = categories.filter((c) => c.parentId === categoryId).map((c) => c.id);
  const ids = [categoryId, ...childIds];
  return products.filter((p) => ids.includes(p.categoryId));
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 8);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  const tokens = q.split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.description,
      ...(p.tags ?? []),
      ...getVariantsForProduct(p.id).flatMap((v) => Object.values(v.attributes).map(String)),
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t)) || haystack.includes(q);
  });
}

export function getProductsByBrand(brandId: string): Product[] {
  return products.filter((p) => p.brandId === brandId);
}
