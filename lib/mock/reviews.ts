import type { Review, FAQ, Comparison, BuyingGuide } from "../data";

export const reviews: Review[] = [
  { id: "rev-1", productId: "prod-iphone-16-pro-max", userId: "u1", userName: "TechReview BD", userAvatar: "https://ui-avatars.com/api/?name=TR", type: "expert", rating: 5, title: "Best iPhone yet for Bangladesh", body: "The A18 Pro chip delivers desktop-class performance. Camera improvements are significant in low light. Battery easily lasts a full day.", isVerified: true, status: "approved", createdAt: "2025-10-01" },
  { id: "rev-2", productId: "prod-iphone-16-pro-max", userId: "u2", userName: "Rahim Ahmed", type: "user", rating: 5, title: "Worth the upgrade from 14 Pro", body: "Titanium build feels premium. Action button is useful. Pricey but the best phone I've owned.", isVerified: true, status: "approved", createdAt: "2025-11-15" },
  { id: "rev-3", productId: "prod-iphone-16-pro-max", userId: "u3", userName: "Fatima Khan", type: "user", rating: 4, title: "Great phone, high price", body: "Everything works flawlessly. Wish it was more affordable in Bangladesh market.", isVerified: true, status: "approved", createdAt: "2025-12-02" },
  { id: "rev-4", productId: "prod-hunter-350", userId: "u4", userName: "BikeWala BD", type: "expert", rating: 4, title: "Perfect city cruiser", body: "Lightweight for a 350cc, nimble handling, and that retro look turns heads. Service network is growing.", isVerified: true, status: "approved", createdAt: "2024-01-10" },
  { id: "rev-5", productId: "prod-hunter-350", userId: "u5", userName: "Arif Hossain", type: "user", rating: 5, title: "Love my Hunter!", body: "Daily commute is fun. Mileage is around 38 km/l. Comfortable seat for long rides.", isVerified: true, status: "approved", createdAt: "2024-06-20" },
  { id: "rev-6", productId: "prod-rockrider-st530", userId: "u6", userName: "Cyclist Dhaka", type: "user", rating: 4, title: "Great starter MTB", body: "Solid build for the price. Front suspension handles Dhaka roads well. Assembly was easy.", isVerified: true, status: "approved", createdAt: "2024-08-05" },
  { id: "rev-7", productId: "prod-lg-ac-15", userId: "u7", userName: "HomeComfort BD", type: "expert", rating: 5, title: "Best inverter AC in segment", body: "Dual inverter saves 40% electricity. Cools 150 sq ft room in 5 minutes. Quiet operation.", isVerified: true, status: "approved", createdAt: "2024-04-12" },
  { id: "rev-8", productId: "prod-samsung-s24-ultra", userId: "u8", userName: "Mobile Guru", type: "expert", rating: 5, title: "Galaxy AI is a game changer", body: "S Pen integration, 200MP zoom, and AI features make this the Android king.", isVerified: true, status: "approved", createdAt: "2025-02-01" },
  { id: "rev-9", productId: "prod-yamaha-r15", userId: "u9", userName: "Pending User", type: "user", rating: 3, title: "Needs review", body: "Draft review awaiting moderation.", isVerified: false, status: "pending", createdAt: "2026-06-20" },
  { id: "rev-10", productId: "prod-walton-phone", userId: "u10", userName: "Budget Tech", type: "user", rating: 4, title: "Best value 5G phone", body: "Made in Bangladesh, good camera, fast charging. Can't beat at this price.", isVerified: true, status: "approved", createdAt: "2025-05-10" },
];

export const faqs: FAQ[] = [
  { id: "faq-1", productId: "prod-iphone-16-pro-max", question: "Does iPhone 16 Pro Max support dual SIM in Bangladesh?", answer: "Yes, it supports nano-SIM + eSIM or dual eSIM configuration. Physical dual SIM is not available.", source: "expert", votes: 45 },
  { id: "faq-2", productId: "prod-iphone-16-pro-max", question: "What is the warranty in Bangladesh?", answer: "Apple provides 1 year limited warranty. AppleCare+ is available through authorized resellers.", source: "community", votes: 32 },
  { id: "faq-3", productId: "prod-iphone-16-pro-max", question: "Is the charger included in the box?", answer: "No, only USB-C cable is included. You need a 20W+ USB-C power adapter.", source: "auto", votes: 28 },
  { id: "faq-4", productId: "prod-hunter-350", question: "What is the service interval?", answer: "First service at 500 km, then every 5,000 km or 6 months.", source: "expert", votes: 18 },
  { id: "faq-5", productId: "prod-hunter-350", question: "Can I use regular petrol?", answer: "Yes, 91 octane or higher petrol is recommended.", source: "community", votes: 12 },
  { id: "faq-6", productId: "prod-lg-ac-15", question: "What room size is 1.5 Ton suitable for?", answer: "Ideal for rooms up to 150 sq ft (approx 12×12 feet).", source: "expert", votes: 22 },
  { id: "faq-7", productId: "prod-rockrider-st530", question: "Is assembly required?", answer: "Minimal assembly — attach pedals, handlebar, and front wheel. Tools included.", source: "community", votes: 8 },
];

export const comparisons: Comparison[] = [
  { id: "cmp-1", slug: "iphone-16-vs-samsung-s24", title: "iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra", productIds: ["prod-iphone-16-pro-max", "prod-samsung-s24-ultra"], summary: "Flagship showdown: iOS vs Android, titanium vs titanium, 48MP vs 200MP." },
  { id: "cmp-2", slug: "hunter-350-vs-r15", title: "Royal Enfield Hunter 350 vs Yamaha R15 V4", productIds: ["prod-hunter-350", "prod-yamaha-r15"], summary: "Classic cruiser vs sport commuter — different riding philosophies." },
  { id: "cmp-3", slug: "lg-ac-vs-walton-ac", title: "LG vs Walton 1.5 Ton Inverter AC", productIds: ["prod-lg-ac-15", "prod-walton-ac"], summary: "Premium Korean brand vs affordable Bangladesh-made inverter AC." },
  { id: "cmp-4", slug: "rockrider-vs-trek", title: "Rockrider ST 530 vs Trek Marlin 5", productIds: ["prod-rockrider-st530", "prod-trek-marlin"], summary: "Budget vs mid-range hardtail mountain bikes." },
];

export const buyingGuides: BuyingGuide[] = [
  { id: "guide-1", slug: "best-phones-under-50000", title: "Best Smartphones Under ৳50,000 in Bangladesh", categoryId: "cat-smartphones", excerpt: "Top budget and mid-range phones with 5G, good cameras, and long battery life.", content: "Finding the best smartphone under ৳50,000 in Bangladesh requires balancing camera quality, performance, and after-sales support.\n\n## Top Picks\n\n1. **Redmi Note 13 Pro** — 200MP camera, 120W charging\n2. **Samsung Galaxy A55** — IP67, 4 years of updates\n3. **Walton NEXG N25** — Made in Bangladesh, best value 5G\n\n## What to Look For\n- Minimum 8GB RAM for smooth multitasking\n- 5000mAh+ battery\n- Official warranty in Bangladesh", productIds: ["prod-redmi-note", "prod-galaxy-a55", "prod-walton-phone"], budgetLabel: "Under ৳50,000", coverImage: "https://images.unsplash.com/photo-1511707171634?w=800&q=80", readTime: 8, createdAt: "2026-05-01" },
  { id: "guide-2", slug: "best-bikes-under-150000", title: "Best Bicycles Under ৳150,000", categoryId: "cat-cycling", excerpt: "From entry-level MTB to quality hardtails for Bangladesh trails and city riding.", content: "Whether you're commuting in Dhaka or hitting trails in Sylhet, here's our guide to the best bicycles under ৳150,000.\n\n## Recommendations\n\n1. **Rockrider ST 530** — Best entry MTB\n2. **Trek Marlin 5** — Upgrade pick with better components\n\n## Buying Tips\n- Test ride before purchase\n- Check frame size chart\n- Consider local service availability", productIds: ["prod-rockrider-st530", "prod-trek-marlin"], budgetLabel: "Under ৳150,000", coverImage: "https://images.unsplash.com/photo-1576438670235?w=800&q=80", readTime: 6, createdAt: "2026-04-15" },
  { id: "guide-3", slug: "best-ac-for-home", title: "How to Choose the Right AC for Your Room", categoryId: "cat-ac", excerpt: "1 Ton vs 1.5 Ton, inverter vs non-inverter, and energy ratings explained.", content: "Bangladesh's hot summers demand the right air conditioner. This guide helps you pick the perfect AC.\n\n## Capacity Guide\n- Up to 120 sq ft → 1 Ton\n- 120–180 sq ft → 1.5 Ton\n- 180–250 sq ft → 2 Ton\n\n## Inverter vs Non-Inverter\nInverter ACs save 30–50% electricity despite higher upfront cost.", productIds: ["prod-lg-ac-15", "prod-walton-ac"], budgetLabel: "All Budgets", coverImage: "https://images.unsplash.com/photo-1631546914?w=800&q=80", readTime: 10, createdAt: "2026-03-20" },
  { id: "guide-4", slug: "best-motorcycles-350cc", title: "Best 350cc Motorcycles in Bangladesh", categoryId: "cat-motorcycles", excerpt: "Classic, retro, and modern 350cc bikes compared for city and highway riding.", content: "The 350cc segment is booming in Bangladesh. Here are the top choices.\n\n## Top Pick: Royal Enfield Hunter 350\nRetro styling, manageable weight, excellent for city commutes.\n\n## Consider Also\nCompare with Classic 350 and Meteor 350 from the same brand.", productIds: ["prod-hunter-350"], budgetLabel: "৳200,000 – ৳300,000", coverImage: "https://images.unsplash.com/photo-1558981403?w=800&q=80", readTime: 7, createdAt: "2026-02-10" },
];

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId && r.status === "approved");
}

export function getPendingReviews(): Review[] {
  return reviews.filter((r) => r.status === "pending");
}

export function getFaqsForProduct(productId: string): FAQ[] {
  return faqs.filter((f) => f.productId === productId);
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getGuideBySlug(slug: string): BuyingGuide | undefined {
  return buyingGuides.find((g) => g.slug === slug);
}

export function getAllGuides(): BuyingGuide[] {
  return buyingGuides;
}
