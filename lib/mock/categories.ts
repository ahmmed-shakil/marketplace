import type { Category, CategoryAttribute } from "../data";

export const categories: Category[] = [
  { id: "cat-electronics", parentId: null, name: "Electronics & Tech", slug: "electronics", depth: 0, path: "electronics", icon: "Smartphone", productCount: 8420, isActive: true, description: "Phones, laptops, TVs, audio, and more" },
  { id: "cat-vehicles", parentId: null, name: "Vehicles", slug: "vehicles", depth: 0, path: "vehicles", icon: "Car", productCount: 2150, isActive: true, description: "Motorcycles, cars, scooters, and parts" },
  { id: "cat-appliances", parentId: null, name: "Home Appliances", slug: "home-appliances", depth: 0, path: "home-appliances", icon: "Refrigerator", productCount: 3200, isActive: true },
  { id: "cat-home", parentId: null, name: "Home & Living", slug: "home-living", depth: 0, path: "home-living", icon: "Sofa", productCount: 4100, isActive: true },
  { id: "cat-fashion", parentId: null, name: "Fashion & Accessories", slug: "fashion", depth: 0, path: "fashion", icon: "Shirt", productCount: 6800, isActive: true },
  { id: "cat-beauty", parentId: null, name: "Beauty & Personal Care", slug: "beauty", depth: 0, path: "beauty", icon: "Sparkles", productCount: 2900, isActive: true },
  { id: "cat-sports", parentId: null, name: "Sports & Outdoors", slug: "sports", depth: 0, path: "sports", icon: "Bike", productCount: 1800, isActive: true },
  { id: "cat-baby", parentId: null, name: "Baby & Kids", slug: "baby-kids", depth: 0, path: "baby-kids", icon: "Baby", productCount: 1500, isActive: true },
  { id: "cat-books", parentId: null, name: "Books & Stationery", slug: "books", depth: 0, path: "books", icon: "BookOpen", productCount: 2200, isActive: true },
  { id: "cat-health", parentId: null, name: "Health & Wellness", slug: "health", depth: 0, path: "health", icon: "Heart", productCount: 980, isActive: true },
  { id: "cat-tools", parentId: null, name: "Tools & Hardware", slug: "tools", depth: 0, path: "tools", icon: "Wrench", productCount: 1350, isActive: true },
  { id: "cat-food", parentId: null, name: "Food & Grocery", slug: "food", depth: 0, path: "food", icon: "ShoppingBasket", productCount: 4500, isActive: true },
  { id: "cat-pets", parentId: null, name: "Pet Supplies", slug: "pets", depth: 0, path: "pets", icon: "PawPrint", productCount: 620, isActive: true },
  { id: "cat-music", parentId: null, name: "Musical Instruments", slug: "music", depth: 0, path: "music", icon: "Music", productCount: 480, isActive: true },
  { id: "cat-industrial", parentId: null, name: "Industrial & Commercial", slug: "industrial", depth: 0, path: "industrial", icon: "Factory", productCount: 340, isActive: true },
  { id: "cat-smartphones", parentId: "cat-electronics", name: "Smartphones", slug: "smartphones", depth: 1, path: "electronics.smartphones", icon: "Smartphone", productCount: 3200, isActive: true },
  { id: "cat-laptops", parentId: "cat-electronics", name: "Laptops", slug: "laptops", depth: 1, path: "electronics.laptops", icon: "Laptop", productCount: 1100, isActive: true },
  { id: "cat-tvs", parentId: "cat-electronics", name: "Televisions", slug: "televisions", depth: 1, path: "electronics.televisions", icon: "Tv", productCount: 890, isActive: true },
  { id: "cat-audio", parentId: "cat-electronics", name: "Audio", slug: "audio", depth: 1, path: "electronics.audio", icon: "Headphones", productCount: 760, isActive: true },
  { id: "cat-motorcycles", parentId: "cat-vehicles", name: "Motorcycles", slug: "motorcycles", depth: 1, path: "vehicles.motorcycles", icon: "Bike", productCount: 980, isActive: true },
  { id: "cat-cars", parentId: "cat-vehicles", name: "Cars & SUVs", slug: "cars", depth: 1, path: "vehicles.cars", icon: "Car", productCount: 420, isActive: true },
  { id: "cat-cycling", parentId: "cat-sports", name: "Cycling", slug: "cycling", depth: 1, path: "sports.cycling", icon: "Bike", productCount: 520, isActive: true },
  { id: "cat-ac", parentId: "cat-appliances", name: "Air Conditioners", slug: "air-conditioners", depth: 1, path: "home-appliances.air-conditioners", icon: "Wind", productCount: 680, isActive: true },
  { id: "cat-fridges", parentId: "cat-appliances", name: "Refrigerators", slug: "refrigerators", depth: 1, path: "home-appliances.refrigerators", icon: "Refrigerator", productCount: 540, isActive: true },
  { id: "cat-washers", parentId: "cat-appliances", name: "Washing Machines", slug: "washing-machines", depth: 1, path: "home-appliances.washing-machines", icon: "WashingMachine", productCount: 380, isActive: true },
];

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
