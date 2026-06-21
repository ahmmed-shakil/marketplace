import type { LucideIcon } from "lucide-react";
import {
  Smartphone, Car, Wind, Bike, Shirt, Home, Wrench, Sparkles, Heart, BookOpen,
  Package, Refrigerator, Sofa, Baby, ShoppingBasket, PawPrint, Music, Factory,
  Laptop, Tv, Headphones, Tablet, Monitor, Camera, Watch, Gamepad2, Router,
  Printer, Truck, Cog, Microwave, Droplets, Fan, Utensils, Lamp,
  BedDouble, Paintbrush, Dumbbell, Tent, Trophy, Waves, Footprints,
  Puzzle, GraduationCap, Stethoscope, Scale, Hammer, HardHat, Pipette,
  Leaf, Wheat, Shield, Zap, Gem, Glasses, ShoppingBag, TreePine, Grid3X3,
} from "lucide-react";

/** Shared Lucide icon map for category UI */
export const categoryIconMap: Record<string, LucideIcon> = {
  Smartphone, Car, Wind, Bike, Shirt, Home, Wrench, Sparkles, Heart, BookOpen,
  Package, Refrigerator, Sofa, Baby, ShoppingBasket, PawPrint, Music, Factory,
  Laptop, Tv, Headphones, Tablet, Monitor, Camera, Watch, Gamepad2, Router,
  Printer, Truck, Cog, Microwave, Droplets, Fan, Utensils, Lamp,
  BedDouble, Paintbrush, Dumbbell, Tent, Trophy, Waves, Footprints,
  Puzzle, GraduationCap, Stethoscope, Scale, Hammer, HardHat, Pipette,
  Leaf, Wheat, Shield, Zap, Gem, Glasses, ShoppingBag, TreePine, Grid3X3,
  // Aliases for icons not available in this lucide-react version
  Stroller: Baby,
  Vacuum: Wind,
};

export function getCategoryIcon(name: string): LucideIcon {
  return categoryIconMap[name] ?? Grid3X3;
}

/** Prescription medicines & pharmaceuticals are intentionally excluded from the catalog. */
export const CATALOG_EXCLUSIONS = ["prescription-medicines", "pharmaceuticals"] as const;
