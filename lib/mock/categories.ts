import type { Category, CategoryAttribute } from "../data";

type CatSeed = {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  description?: string;
};

/** Full product taxonomy — all purchasable types except prescription medicines. */
const seeds: CatSeed[] = [
  // ─── Top-level (18 departments) ───────────────────────────────────────────
  { id: "cat-electronics", parentId: null, name: "Electronics & Tech", slug: "electronics", icon: "Smartphone", productCount: 8420, description: "Phones, laptops, TVs, audio, cameras, gaming, and more" },
  { id: "cat-vehicles", parentId: null, name: "Vehicles", slug: "vehicles", icon: "Car", productCount: 2150, description: "Motorcycles, cars, scooters, EVs, and parts" },
  { id: "cat-appliances", parentId: null, name: "Home Appliances", slug: "home-appliances", icon: "Refrigerator", productCount: 3200, description: "AC, fridge, washer, kitchen and cleaning appliances" },
  { id: "cat-home", parentId: null, name: "Home & Living", slug: "home-living", icon: "Sofa", productCount: 4100, description: "Furniture, decor, lighting, bedding, and bathroom" },
  { id: "cat-fashion", parentId: null, name: "Fashion & Accessories", slug: "fashion", icon: "Shirt", productCount: 6800, description: "Clothing, footwear, bags, watches, and jewelry" },
  { id: "cat-beauty", parentId: null, name: "Beauty & Personal Care", slug: "beauty", icon: "Sparkles", productCount: 2900, description: "Skincare, haircare, makeup, and grooming devices" },
  { id: "cat-sports", parentId: null, name: "Sports & Outdoors", slug: "sports", icon: "Bike", productCount: 1800, description: "Cycling, fitness, team sports, camping, and running" },
  { id: "cat-baby", parentId: null, name: "Baby & Kids", slug: "baby-kids", icon: "Baby", productCount: 1500, description: "Baby gear, toys, school supplies, kids furniture" },
  { id: "cat-books", parentId: null, name: "Books & Stationery", slug: "books", icon: "BookOpen", productCount: 2200, description: "Books, e-readers, office and art supplies" },
  { id: "cat-health", parentId: null, name: "Health & Wellness", slug: "health", icon: "Heart", productCount: 980, description: "Medical devices, monitors, supplements — no prescription medicines" },
  { id: "cat-tools", parentId: null, name: "Tools & Hardware", slug: "tools", icon: "Wrench", productCount: 1350, description: "Power tools, building materials, plumbing, garden" },
  { id: "cat-food", parentId: null, name: "Food & Grocery", slug: "food", icon: "ShoppingBasket", productCount: 4500, description: "Packaged food, beverages, cooking ingredients" },
  { id: "cat-pets", parentId: null, name: "Pet Supplies", slug: "pets", icon: "PawPrint", productCount: 620, description: "Pet food, accessories, and aquarium supplies" },
  { id: "cat-music", parentId: null, name: "Musical Instruments", slug: "music", icon: "Music", productCount: 480, description: "Guitars, keyboards, drums, and recording gear" },
  { id: "cat-industrial", parentId: null, name: "Industrial & Commercial", slug: "industrial", icon: "Factory", productCount: 340, description: "Office equipment, generators, safety gear" },
  { id: "cat-agriculture", parentId: null, name: "Agriculture & Farming", slug: "agriculture", icon: "Wheat", productCount: 280, description: "Tractors, pumps, seeds, and farm equipment" },
  { id: "cat-garden", parentId: null, name: "Garden & Outdoor", slug: "garden-outdoor", icon: "TreePine", productCount: 890, description: "Plants, lawn care, outdoor furniture, BBQ" },
  { id: "cat-jewelry", parentId: null, name: "Jewelry & Watches", slug: "jewelry-watches", icon: "Gem", productCount: 1240, description: "Gold, silver, fashion jewelry, and timepieces" },

  // ─── Electronics ──────────────────────────────────────────────────────────
  { id: "cat-smartphones", parentId: "cat-electronics", name: "Smartphones", slug: "smartphones", icon: "Smartphone", productCount: 3200 },
  { id: "cat-feature-phones", parentId: "cat-electronics", name: "Feature Phones", slug: "feature-phones", icon: "Smartphone", productCount: 420 },
  { id: "cat-tablets", parentId: "cat-electronics", name: "Tablets", slug: "tablets", icon: "Tablet", productCount: 680 },
  { id: "cat-laptops", parentId: "cat-electronics", name: "Laptops", slug: "laptops", icon: "Laptop", productCount: 1100 },
  { id: "cat-desktops", parentId: "cat-electronics", name: "Desktops & AIO", slug: "desktops", icon: "Monitor", productCount: 340 },
  { id: "cat-monitors", parentId: "cat-electronics", name: "Monitors", slug: "monitors", icon: "Monitor", productCount: 520 },
  { id: "cat-tvs", parentId: "cat-electronics", name: "Televisions", slug: "televisions", icon: "Tv", productCount: 890 },
  { id: "cat-audio", parentId: "cat-electronics", name: "Audio", slug: "audio", icon: "Headphones", productCount: 760 },
  { id: "cat-cameras", parentId: "cat-electronics", name: "Cameras", slug: "cameras", icon: "Camera", productCount: 410 },
  { id: "cat-wearables", parentId: "cat-electronics", name: "Wearables", slug: "wearables", icon: "Watch", productCount: 560 },
  { id: "cat-gaming", parentId: "cat-electronics", name: "Gaming", slug: "gaming", icon: "Gamepad2", productCount: 720 },
  { id: "cat-networking", parentId: "cat-electronics", name: "Networking & Storage", slug: "networking", icon: "Router", productCount: 380 },
  { id: "cat-printers", parentId: "cat-electronics", name: "Printers & Scanners", slug: "printers", icon: "Printer", productCount: 290 },
  { id: "cat-tech-accessories", parentId: "cat-electronics", name: "Tech Accessories", slug: "tech-accessories", icon: "Package", productCount: 1450 },

  // ─── Vehicles ─────────────────────────────────────────────────────────────
  { id: "cat-motorcycles", parentId: "cat-vehicles", name: "Motorcycles", slug: "motorcycles", icon: "Bike", productCount: 980 },
  { id: "cat-scooters", parentId: "cat-vehicles", name: "Scooters", slug: "scooters", icon: "Bike", productCount: 640 },
  { id: "cat-cars", parentId: "cat-vehicles", name: "Cars & SUVs", slug: "cars", icon: "Car", productCount: 420 },
  { id: "cat-commercial-vehicles", parentId: "cat-vehicles", name: "Commercial Vehicles", slug: "commercial-vehicles", icon: "Truck", productCount: 180 },
  { id: "cat-ev", parentId: "cat-vehicles", name: "Electric Vehicles", slug: "electric-vehicles", icon: "Zap", productCount: 95 },
  { id: "cat-vehicle-parts", parentId: "cat-vehicles", name: "Parts & Accessories", slug: "vehicle-parts", icon: "Cog", productCount: 1120 },

  // ─── Home Appliances ──────────────────────────────────────────────────────
  { id: "cat-ac", parentId: "cat-appliances", name: "Air Conditioners", slug: "air-conditioners", icon: "Wind", productCount: 680 },
  { id: "cat-fridges", parentId: "cat-appliances", name: "Refrigerators", slug: "refrigerators", icon: "Refrigerator", productCount: 540 },
  { id: "cat-washers", parentId: "cat-appliances", name: "Washing Machines", slug: "washing-machines", icon: "Cog", productCount: 380 },
  { id: "cat-microwaves", parentId: "cat-appliances", name: "Microwave Ovens", slug: "microwave-ovens", icon: "Microwave", productCount: 310 },
  { id: "cat-water-purifiers", parentId: "cat-appliances", name: "Water Purifiers", slug: "water-purifiers", icon: "Droplets", productCount: 420 },
  { id: "cat-fans", parentId: "cat-appliances", name: "Fans", slug: "fans", icon: "Fan", productCount: 890 },
  { id: "cat-vacuum", parentId: "cat-appliances", name: "Vacuum Cleaners", slug: "vacuum-cleaners", icon: "Vacuum", productCount: 240 },
  { id: "cat-kitchen-appliances", parentId: "cat-appliances", name: "Kitchen Appliances", slug: "kitchen-appliances", icon: "Utensils", productCount: 760 },
  { id: "cat-small-appliances", parentId: "cat-appliances", name: "Small Appliances", slug: "small-appliances", icon: "Package", productCount: 520 },

  // ─── Home & Living ────────────────────────────────────────────────────────
  { id: "cat-furniture", parentId: "cat-home", name: "Furniture", slug: "furniture", icon: "Sofa", productCount: 1820 },
  { id: "cat-bedding", parentId: "cat-home", name: "Bedding & Mattresses", slug: "bedding", icon: "BedDouble", productCount: 640 },
  { id: "cat-kitchen-dining", parentId: "cat-home", name: "Kitchen & Dining", slug: "kitchen-dining", icon: "Utensils", productCount: 980 },
  { id: "cat-home-decor", parentId: "cat-home", name: "Home Decor", slug: "home-decor", icon: "Paintbrush", productCount: 720 },
  { id: "cat-lighting", parentId: "cat-home", name: "Lighting", slug: "lighting", icon: "Lamp", productCount: 540 },
  { id: "cat-storage", parentId: "cat-home", name: "Storage & Organization", slug: "storage", icon: "Package", productCount: 410 },
  { id: "cat-bathroom", parentId: "cat-home", name: "Bathroom", slug: "bathroom", icon: "Droplets", productCount: 380 },

  // ─── Fashion ──────────────────────────────────────────────────────────────
  { id: "cat-mens-clothing", parentId: "cat-fashion", name: "Men's Clothing", slug: "mens-clothing", icon: "Shirt", productCount: 2100 },
  { id: "cat-womens-clothing", parentId: "cat-fashion", name: "Women's Clothing", slug: "womens-clothing", icon: "Shirt", productCount: 2800 },
  { id: "cat-kids-clothing", parentId: "cat-fashion", name: "Kids' Clothing", slug: "kids-clothing", icon: "Shirt", productCount: 890 },
  { id: "cat-footwear", parentId: "cat-fashion", name: "Footwear", slug: "footwear", icon: "Footprints", productCount: 1560 },
  { id: "cat-bags", parentId: "cat-fashion", name: "Bags & Luggage", slug: "bags-luggage", icon: "ShoppingBag", productCount: 720 },
  { id: "cat-fashion-watches", parentId: "cat-fashion", name: "Watches", slug: "fashion-watches", icon: "Watch", productCount: 480 },
  { id: "cat-fashion-jewelry", parentId: "cat-fashion", name: "Fashion Jewelry", slug: "fashion-jewelry", icon: "Gem", productCount: 620 },
  { id: "cat-eyewear", parentId: "cat-fashion", name: "Eyewear", slug: "eyewear", icon: "Glasses", productCount: 340 },

  // ─── Beauty ───────────────────────────────────────────────────────────────
  { id: "cat-skincare", parentId: "cat-beauty", name: "Skincare", slug: "skincare", icon: "Sparkles", productCount: 980 },
  { id: "cat-haircare", parentId: "cat-beauty", name: "Haircare", slug: "haircare", icon: "Sparkles", productCount: 720 },
  { id: "cat-makeup", parentId: "cat-beauty", name: "Makeup", slug: "makeup", icon: "Sparkles", productCount: 640 },
  { id: "cat-fragrances", parentId: "cat-beauty", name: "Fragrances", slug: "fragrances", icon: "Sparkles", productCount: 410 },
  { id: "cat-mens-grooming", parentId: "cat-beauty", name: "Men's Grooming", slug: "mens-grooming", icon: "Sparkles", productCount: 380 },
  { id: "cat-beauty-devices", parentId: "cat-beauty", name: "Personal Care Devices", slug: "beauty-devices", icon: "Package", productCount: 290 },

  // ─── Sports ───────────────────────────────────────────────────────────────
  { id: "cat-cycling", parentId: "cat-sports", name: "Cycling", slug: "cycling", icon: "Bike", productCount: 520 },
  { id: "cat-fitness", parentId: "cat-sports", name: "Fitness Equipment", slug: "fitness-equipment", icon: "Dumbbell", productCount: 380 },
  { id: "cat-outdoor", parentId: "cat-sports", name: "Outdoor & Camping", slug: "outdoor-camping", icon: "Tent", productCount: 290 },
  { id: "cat-team-sports", parentId: "cat-sports", name: "Team Sports", slug: "team-sports", icon: "Trophy", productCount: 420 },
  { id: "cat-swimming", parentId: "cat-sports", name: "Swimming", slug: "swimming", icon: "Waves", productCount: 180 },
  { id: "cat-running", parentId: "cat-sports", name: "Running & Athletics", slug: "running", icon: "Footprints", productCount: 240 },

  // ─── Baby & Kids ──────────────────────────────────────────────────────────
  { id: "cat-baby-gear", parentId: "cat-baby", name: "Baby Gear", slug: "baby-gear", icon: "Stroller", productCount: 420 },
  { id: "cat-diapers-feeding", parentId: "cat-baby", name: "Diapers & Feeding", slug: "diapers-feeding", icon: "Baby", productCount: 380 },
  { id: "cat-toys", parentId: "cat-baby", name: "Toys & Games", slug: "toys-games", icon: "Puzzle", productCount: 560 },
  { id: "cat-school-supplies", parentId: "cat-baby", name: "School Supplies", slug: "school-supplies", icon: "GraduationCap", productCount: 480 },
  { id: "cat-kids-furniture", parentId: "cat-baby", name: "Kids' Furniture", slug: "kids-furniture", icon: "Home", productCount: 220 },

  // ─── Books & Stationery ───────────────────────────────────────────────────
  { id: "cat-books-fiction", parentId: "cat-books", name: "Books", slug: "books-all", icon: "BookOpen", productCount: 1200 },
  { id: "cat-ebooks", parentId: "cat-books", name: "e-Readers", slug: "e-readers", icon: "Tablet", productCount: 80 },
  { id: "cat-office-supplies", parentId: "cat-books", name: "Office Supplies", slug: "office-supplies", icon: "Package", productCount: 640 },
  { id: "cat-art-craft", parentId: "cat-books", name: "Art & Craft", slug: "art-craft", icon: "Paintbrush", productCount: 380 },

  // ─── Health (devices & supplements only — no prescription medicines) ────────
  { id: "cat-medical-devices", parentId: "cat-health", name: "Medical Devices", slug: "medical-devices", icon: "Stethoscope", productCount: 420 },
  { id: "cat-weighing-scales", parentId: "cat-health", name: "Weighing Scales", slug: "weighing-scales", icon: "Scale", productCount: 180 },
  { id: "cat-supplements", parentId: "cat-health", name: "Fitness Supplements", slug: "fitness-supplements", icon: "Heart", productCount: 290 },
  { id: "cat-mobility", parentId: "cat-health", name: "Mobility Aids", slug: "mobility-aids", icon: "Heart", productCount: 90 },

  // ─── Tools & Hardware ─────────────────────────────────────────────────────
  { id: "cat-power-tools", parentId: "cat-tools", name: "Power Tools", slug: "power-tools", icon: "Wrench", productCount: 480 },
  { id: "cat-hand-tools", parentId: "cat-tools", name: "Hand Tools", slug: "hand-tools", icon: "Hammer", productCount: 620 },
  { id: "cat-building-materials", parentId: "cat-tools", name: "Building Materials", slug: "building-materials", icon: "HardHat", productCount: 890 },
  { id: "cat-plumbing", parentId: "cat-tools", name: "Plumbing & Electrical", slug: "plumbing-electrical", icon: "Pipette", productCount: 540 },
  { id: "cat-tools-garden", parentId: "cat-tools", name: "Garden Tools", slug: "garden-tools", icon: "Leaf", productCount: 320 },

  // ─── Food & Grocery ───────────────────────────────────────────────────────
  { id: "cat-rice-grains", parentId: "cat-food", name: "Rice & Grains", slug: "rice-grains", icon: "ShoppingBasket", productCount: 820 },
  { id: "cat-cooking-ingredients", parentId: "cat-food", name: "Cooking Ingredients", slug: "cooking-ingredients", icon: "Utensils", productCount: 1240 },
  { id: "cat-beverages", parentId: "cat-food", name: "Beverages", slug: "beverages", icon: "Droplets", productCount: 980 },
  { id: "cat-snacks", parentId: "cat-food", name: "Snacks & Packaged Food", slug: "snacks", icon: "ShoppingBasket", productCount: 1560 },
  { id: "cat-organic", parentId: "cat-food", name: "Organic & Specialty", slug: "organic-specialty", icon: "Leaf", productCount: 340 },

  // ─── Pets ─────────────────────────────────────────────────────────────────
  { id: "cat-pet-food", parentId: "cat-pets", name: "Pet Food", slug: "pet-food", icon: "PawPrint", productCount: 280 },
  { id: "cat-pet-accessories", parentId: "cat-pets", name: "Pet Accessories", slug: "pet-accessories", icon: "PawPrint", productCount: 240 },
  { id: "cat-aquarium", parentId: "cat-pets", name: "Aquarium", slug: "aquarium", icon: "Waves", productCount: 100 },

  // ─── Musical Instruments ────────────────────────────────────────────────────
  { id: "cat-guitars", parentId: "cat-music", name: "Guitars", slug: "guitars", icon: "Music", productCount: 180 },
  { id: "cat-keyboards", parentId: "cat-music", name: "Keyboards & Pianos", slug: "keyboards", icon: "Music", productCount: 120 },
  { id: "cat-drums", parentId: "cat-music", name: "Drums & Percussion", slug: "drums", icon: "Music", productCount: 80 },
  { id: "cat-traditional-instruments", parentId: "cat-music", name: "Traditional Instruments", slug: "traditional-instruments", icon: "Music", productCount: 60 },
  { id: "cat-recording", parentId: "cat-music", name: "Recording Equipment", slug: "recording-equipment", icon: "Headphones", productCount: 40 },

  // ─── Industrial ─────────────────────────────────────────────────────────────
  { id: "cat-office-equipment", parentId: "cat-industrial", name: "Office Equipment", slug: "office-equipment", icon: "Printer", productCount: 120 },
  { id: "cat-generators", parentId: "cat-industrial", name: "Generators & UPS", slug: "generators-ups", icon: "Zap", productCount: 180 },
  { id: "cat-safety", parentId: "cat-industrial", name: "Safety Equipment", slug: "safety-equipment", icon: "Shield", productCount: 140 },

  // ─── Agriculture ────────────────────────────────────────────────────────────
  { id: "cat-tractors", parentId: "cat-agriculture", name: "Tractors & Machinery", slug: "tractors", icon: "Truck", productCount: 45 },
  { id: "cat-pumps", parentId: "cat-agriculture", name: "Pumps & Irrigation", slug: "pumps-irrigation", icon: "Droplets", productCount: 120 },
  { id: "cat-seeds-fertilizers", parentId: "cat-agriculture", name: "Seeds & Fertilizers", slug: "seeds-fertilizers", icon: "Leaf", productCount: 115 },

  // ─── Garden & Outdoor ─────────────────────────────────────────────────────
  { id: "cat-plants", parentId: "cat-garden", name: "Plants & Seeds", slug: "plants-seeds", icon: "Leaf", productCount: 340 },
  { id: "cat-lawn-care", parentId: "cat-garden", name: "Lawn Care", slug: "lawn-care", icon: "TreePine", productCount: 210 },
  { id: "cat-outdoor-furniture", parentId: "cat-garden", name: "Outdoor Furniture", slug: "outdoor-furniture", icon: "Sofa", productCount: 280 },
  { id: "cat-bbq", parentId: "cat-garden", name: "BBQ & Outdoor Cooking", slug: "bbq-outdoor", icon: "Utensils", productCount: 60 },

  // ─── Jewelry & Watches (top-level dept) ───────────────────────────────────
  { id: "cat-gold-jewelry", parentId: "cat-jewelry", name: "Gold Jewelry", slug: "gold-jewelry", icon: "Gem", productCount: 420 },
  { id: "cat-silver-jewelry", parentId: "cat-jewelry", name: "Silver Jewelry", slug: "silver-jewelry", icon: "Gem", productCount: 280 },
  { id: "cat-watches", parentId: "cat-jewelry", name: "Watches", slug: "watches", icon: "Watch", productCount: 540 },
];

function buildPath(parentId: string | null, slug: string): { depth: number; path: string } {
  if (!parentId) return { depth: 0, path: slug };
  const parent = seeds.find((s) => s.id === parentId);
  if (!parent) return { depth: 1, path: slug };
  const parentBuilt = buildPath(parent.parentId, parent.slug);
  return { depth: parentBuilt.depth + 1, path: `${parentBuilt.path}.${slug}` };
}

export const categories: Category[] = seeds.map((s) => {
  const { depth, path } = buildPath(s.parentId, s.slug);
  return {
    id: s.id,
    parentId: s.parentId,
    name: s.name,
    slug: s.slug,
    depth,
    path,
    icon: s.icon,
    description: s.description,
    productCount: s.productCount,
    isActive: true,
  };
});

export const categoryAttributes: CategoryAttribute[] = [
  { id: "attr-ram", categoryId: "cat-smartphones", name: "RAM", slug: "ram", attrType: "enum", allowedValues: ["4GB", "6GB", "8GB", "12GB", "16GB"], isFilterable: true, isComparable: true, sortOrder: 1, group: "Performance" },
  { id: "attr-storage", categoryId: "cat-smartphones", name: "Storage", slug: "storage", attrType: "enum", allowedValues: ["64GB", "128GB", "256GB", "512GB", "1TB"], isFilterable: true, isComparable: true, sortOrder: 2, group: "Performance" },
  { id: "attr-camera", categoryId: "cat-smartphones", name: "Main Camera", slug: "camera", attrType: "number", unit: "MP", isFilterable: true, isComparable: true, sortOrder: 3, group: "Camera" },
  { id: "attr-battery", categoryId: "cat-smartphones", name: "Battery", slug: "battery", attrType: "number", unit: "mAh", isFilterable: true, isComparable: true, sortOrder: 4, group: "Battery" },
  { id: "attr-display", categoryId: "cat-smartphones", name: "Display", slug: "display", attrType: "dimension", unit: "inches", isFilterable: true, isComparable: true, sortOrder: 5, group: "Display" },
  { id: "attr-5g", categoryId: "cat-smartphones", name: "5G Support", slug: "5g", attrType: "boolean", isFilterable: true, isComparable: true, sortOrder: 6, group: "Connectivity" },
  { id: "attr-engine", categoryId: "cat-motorcycles", name: "Engine", slug: "engine", attrType: "number", unit: "cc", isFilterable: true, isComparable: true, sortOrder: 1, group: "Engine" },
  { id: "attr-power", categoryId: "cat-motorcycles", name: "Max Power", slug: "power", attrType: "number", unit: "bhp", isFilterable: false, isComparable: true, sortOrder: 2, group: "Engine" },
  { id: "attr-mileage", categoryId: "cat-motorcycles", name: "Mileage", slug: "mileage", attrType: "range", unit: "km/l", isFilterable: true, isComparable: true, sortOrder: 3, group: "Performance" },
  { id: "attr-frame", categoryId: "cat-cycling", name: "Frame Material", slug: "frame", attrType: "enum", allowedValues: ["Aluminum", "Carbon", "Steel", "Alloy"], isFilterable: true, isComparable: true, sortOrder: 1, group: "Frame" },
  { id: "attr-weight", categoryId: "cat-cycling", name: "Weight", slug: "weight", attrType: "number", unit: "kg", isFilterable: true, isComparable: true, sortOrder: 2, group: "Frame" },
  { id: "attr-ac-cap", categoryId: "cat-ac", name: "Capacity", slug: "capacity", attrType: "enum", allowedValues: ["1 Ton", "1.5 Ton", "2 Ton"], isFilterable: true, isComparable: true, sortOrder: 1, group: "Cooling" },
  { id: "attr-ac-type", categoryId: "cat-ac", name: "Type", slug: "type", attrType: "enum", allowedValues: ["Split", "Window", "Portable"], isFilterable: true, isComparable: true, sortOrder: 2, group: "General" },
  { id: "attr-laptop-ram", categoryId: "cat-laptops", name: "RAM", slug: "ram", attrType: "enum", allowedValues: ["8GB", "16GB", "32GB"], isFilterable: true, isComparable: true, sortOrder: 1, group: "Performance" },
  { id: "attr-laptop-storage", categoryId: "cat-laptops", name: "Storage", slug: "storage", attrType: "enum", allowedValues: ["256GB SSD", "512GB SSD", "1TB SSD"], isFilterable: true, isComparable: true, sortOrder: 2, group: "Performance" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getTopCategories(): Category[] {
  return categories.filter((c) => c.parentId === null);
}

export function getSubcategories(parentId: string): Category[] {
  return categories.filter((c) => c.parentId === parentId);
}

export function getCategoryAttributes(categoryId: string): CategoryAttribute[] {
  return categoryAttributes.filter((a) => a.categoryId === categoryId);
}

export function getTotalCategoryCount(): number {
  return categories.length;
}

export function getDepartmentCount(): number {
  return getTopCategories().length;
}

export function getTotalProductCount(): number {
  return getTopCategories().reduce((sum, c) => sum + c.productCount, 0);
}
