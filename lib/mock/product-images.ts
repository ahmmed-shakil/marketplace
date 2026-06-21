/** Deterministic product image URLs via Unsplash — stable per product slug */

/** Unsplash photo paths (photo-{timestamp}-{hash}) grouped by category theme */
const CATEGORY_PHOTOS: Record<string, string[]> = {
  smartphones: [
    "photo-1511707171634-c7825faf0f96",
    "photo-1598327100134-7b1a5e4c4e0a",
    "photo-1565849904461-04a58ad377e0",
    "photo-1585060544812-6b45742d7622",
  ],
  "feature-phones": [
    "photo-1556656793-08538906a9f8",
    "photo-1574944985070-8f3ebc6b79d2",
  ],
  tablets: [
    "photo-1544244015-0df4b3ffc6b0",
    "photo-1561154464-82e9adf32764",
    "photo-1631549916768-4119b2d58885",
  ],
  laptops: [
    "photo-1496181133206-80ce9b88a853",
    "photo-1517336714731-489689fd1ca8",
    "photo-1525547719578-a2d4ac9105f2",
  ],
  desktops: [
    "photo-1587831990711-23ca6441447b",
    "photo-1593640408182-31c70c8268f5",
  ],
  monitors: [
    "photo-1527443224154-c4a3942d7acf",
    "photo-1614624532983-4ce03382d63d",
  ],
  televisions: [
    "photo-159335967787-a-a3f8924a2d1",
    "photo-1461155691092-9255857812f7",
    "photo-1571410404757-af5819d4b0a1",
  ],
  audio: [
    "photo-1505740420928-5e560c06d30e",
    "photo-1484704849700-f032a568e944",
    "photo-1546435770-a3e426bf472b",
  ],
  cameras: [
    "photo-1516035069371-29a1b244cc32",
    "photo-1526170375885-4d8ecf77b99f",
  ],
  wearables: [
    "photo-1523275335684-37898b6baf30",
    "photo-1579586337278-3befd40fd17a",
  ],
  gaming: [
    "photo-1606144042614-b2417e99c4e9",
    "photo-1542751371-adc38448a05e",
  ],
  networking: [
    "photo-1558494949-ef010cbdcc31",
    "photo-1606904829466-fb3a8b4c5a0e",
  ],
  printers: [
    "photo-1612815154859-88b4b5a5b5e5",
    "photo-1586953208448-b95a79798f07",
  ],
  "tech-accessories": [
    "photo-1625842268584-8f3296236761",
    "photo-1587825140708-dfaf72ae4b04",
  ],
  motorcycles: [
    "photo-1558981806-ec527fa84c39",
    "photo-1449426468159-dbf9f2f0a0a0",
    "photo-1568772585407-9361f9bf3a87",
  ],
  scooters: [
    "photo-1532298229144-0ec0c57515c7",
    "photo-1568772585407-9361f9bf3a87",
  ],
  cars: [
    "photo-1494976388531-d1058498bdd8",
    "photo-1549317661-bd32c8ce0ad2",
    "photo-1503376780353-7e6692767b70",
  ],
  "commercial-vehicles": [
    "photo-1601584115197-04ecc0da31d7",
    "photo-1586528116311-ad8dd3c8310d",
  ],
  "electric-vehicles": [
    "photo-1593941707882-a5bba14938d7",
    "photo-1617788138017-80ad40651399",
  ],
  "vehicle-parts": [
    "photo-1486262715619-67b85a0c08a3",
    "photo-1492144534655-ae79c964c9d7",
  ],
  "air-conditioners": [
    "photo-1631546914468-a88d857477d1",
    "photo-1585771724684-f382f2c585b1",
    "photo-1631049307264-da0ec154d703",
  ],
  refrigerators: [
    "photo-1571175443880-49aa1e088f44",
    "photo-1584568694244-14fbdf83bd30",
  ],
  "washing-machines": [
    "photo-1626806787461-102c1bfaaea1",
    "photo-1604335399105-0e2cbb25a36d",
  ],
  "microwave-ovens": [
    "photo-1584269600458-37d2a6b4a413",
    "photo-1574269909862-7e1d70bb8078",
  ],
  "water-purifiers": [
    "photo-1548839140-29a749299164",
    "photo-1602143407151-7111542de6e8",
  ],
  fans: [
    "photo-1631546914468-a88d857477d1",
    "photo-1585771724684-f382f2c585b1",
  ],
  "vacuum-cleaners": [
    "photo-1558317374-067fb5f30001",
    "photo-1527515637462-cff94a753d73",
  ],
  "kitchen-appliances": [
    "photo-1556909114-f6e7ad7d3136",
    "photo-1574269909862-7e1d70bb8078",
  ],
  "small-appliances": [
    "photo-1574269909862-7e1d70bb8078",
    "photo-1556909114-f6e7ad7d3136",
  ],
  furniture: [
    "photo-1555041469-a586c61ea9bc",
    "photo-1493663284031-b7e3aefcae8e",
    "photo-1586023492125-27b2c045efd7",
  ],
  bedding: [
    "photo-1631049307264-da0ec154d703",
    "photo-1522771739844-6a9f6d5f14af",
  ],
  "kitchen-dining": [
    "photo-1556911220-e15b29be8c8f",
    "photo-1567538096630-e0c55bd6374c",
  ],
  "home-decor": [
    "photo-1616486338812-3adaada4a4cf",
    "photo-1586023492125-27b2c045efd7",
  ],
  lighting: [
    "photo-1513506003901-1e6a229e2d15",
    "photo-1565814636199-ae81330550c1",
  ],
  storage: [
    "photo-1595428774223-ef52624120b2",
    "photo-1558618666-fcd25c85cd64",
  ],
  bathroom: [
    "photo-1552321554-5fefe8c9ef14",
    "photo-1620626011761-996317b8d101",
  ],
  "mens-clothing": [
    "photo-1617137968427-85924c800a41",
    "photo-1490577862310-359cb3b6a4d0",
  ],
  "womens-clothing": [
    "photo-1483985988354-763728e1935b",
    "photo-1469334031218-e382a71b716b",
  ],
  "kids-clothing": [
    "photo-1503454537195-1dcabb73ffb9",
    "photo-1519457434796-aa173787ef5e",
  ],
  footwear: [
    "photo-1542291026-7eec264c27ff",
    "photo-1460353581641-37baddab0fa2",
    "photo-1606107557195-0f29cb4c6a0b",
  ],
  "bags-luggage": [
    "photo-1553062407-98eeb64c6a62",
    "photo-1548036328-c9fa89d128b2",
  ],
  "fashion-watches": [
    "photo-1523275335684-37898b6baf30",
    "photo-1524805445258-68469250b45b",
  ],
  "fashion-jewelry": [
    "photo-1515562141207-7a88fb7ce338",
    "photo-1611591437281-460bfbe1220a",
  ],
  eyewear: [
    "photo-1574253457107-8a6676a44391",
    "photo-1511499767150-a48a237f0083",
  ],
  skincare: [
    "photo-1556228720-195a672e8a03",
    "photo-1571781926291-c477ebfd024b",
  ],
  haircare: [
    "photo-1522338242992-e1a54906a8da",
    "photo-1535585209827-a15fc5094a2d",
  ],
  makeup: [
    "photo-1596462502278-27bfdc403348",
    "photo-1512496015851-a90fb38ba796",
  ],
  fragrances: [
    "photo-1541643600914-78b084683601",
    "photo-1587017539504-67cfbddac7ff",
  ],
  "mens-grooming": [
    "photo-1621607513569-7832704db4f2",
    "photo-1503951914875-452162b0f3f1",
  ],
  "beauty-devices": [
    "photo-1596755389378-c179d47f1b9a",
    "photo-1570172619644-dfd03ed5d881",
  ],
  cycling: [
    "photo-1576438670235-276d2293a8e8",
    "photo-1485965120188-e8f877d80467",
  ],
  "fitness-equipment": [
    "photo-1534438327276-14e5300c3a48",
    "photo-1571902943202-507ec2618ae8",
  ],
  "outdoor-camping": [
    "photo-1478131143081-80f7f84b64e7",
    "photo-1504280390367-361c66d9e369",
  ],
  "team-sports": [
    "photo-1461896836934-ff608b81e776",
    "photo-1574629810360-7dfebb20c8b7",
  ],
  swimming: [
    "photo-1530549387789-4c1017266635",
    "photo-1571902943202-507ec2618ae8",
  ],
  running: [
    "photo-1476480862126-209bfaa8edc8",
    "photo-1452626212852-811d58933cae",
  ],
  "baby-gear": [
    "photo-1515488042361-ee00e9450b9f",
    "photo-1587654780291-39c9404d746b",
  ],
  "diapers-feeding": [
    "photo-1584839135368-3d0d9c4b8d0b",
    "photo-1515488042361-ee00e9450b9f",
  ],
  "toys-games": [
    "photo-1558069455-135e417e4654",
    "photo-1566576912321-d58ddd7a6088",
  ],
  "school-supplies": [
    "photo-1583485088034-697b5b383937",
    "photo-1503676260728-1c00da094a0b",
  ],
  "kids-furniture": [
    "photo-1555041469-a586c61ea9bc",
    "photo-1503454537195-1dcabb73ffb9",
  ],
  "books-all": [
    "photo-1495446815901-a7297e633e8d",
    "photo-1512820790801-4153a464a0a9",
  ],
  "e-readers": [
    "photo-1544716278-ca5e3f4abd8c",
    "photo-1544244015-0df4b3ffc6b0",
  ],
  "office-supplies": [
    "photo-1586281380349-632531db7ed4",
    "photo-1503676260728-1c00da094a0b",
  ],
  "art-craft": [
    "photo-1452860606248-08befc0ff4b9",
    "photo-1513364776144-60967b0f800f",
  ],
  "medical-devices": [
    "photo-1576091160399-112ba8d25d1d",
    "photo-1584036564696-0edc12a48813",
  ],
  "weighing-scales": [
    "photo-1571902943202-507ec2618ae8",
    "photo-1517836357463-d25dfeac3438",
  ],
  "fitness-supplements": [
    "photo-1593095948071-9957434a3028",
    "photo-1571019614242-c5c5dee9f50b",
  ],
  "mobility-aids": [
    "photo-1584515933487-779824d29309",
    "photo-1576091160399-112ba8d25d1d",
  ],
  "power-tools": [
    "photo-1504147790338-5e94b21aba93",
    "photo-1581244279603-e5a669d2e8d9",
  ],
  "hand-tools": [
    "photo-1530124566582-a618bc2615dc",
    "photo-1504147790338-5e94b21aba93",
  ],
  "building-materials": [
    "photo-1504307651250-372120b33015",
    "photo-1581094794329-c8112a89af12",
  ],
  "plumbing-electrical": [
    "photo-1585704032915-e241ff0ae45f",
    "photo-1504307651250-372120b33015",
  ],
  "garden-tools": [
    "photo-1416879595882-3373a0480b5b",
    "photo-1464226184884-fa280b87c399",
  ],
  "rice-grains": [
    "photo-1586201375761-83865001e31c",
    "photo-1536304993881-ff6e9f526b47",
  ],
  "cooking-ingredients": [
    "photo-1596040033229-a9821ebd058d",
    "photo-1506368089636-ef8c7864a511",
  ],
  beverages: [
    "photo-1544145945-f90425340c7e",
    "photo-1434374357639-0ea4e5b5e0a0",
  ],
  snacks: [
    "photo-1621939514649-ee9724f57196",
    "photo-1600952841320-db92b404a298",
  ],
  "organic-specialty": [
    "photo-1542838132-92c53300491e",
    "photo-1488459716781-31db52582fe9",
  ],
  "pet-food": [
    "photo-1587300003388-59208cc962cb",
    "photo-1450778869180-41d0601e046e",
  ],
  "pet-accessories": [
    "photo-1450778869180-41d0601e046e",
    "photo-1583511655857-d19-40a0a0a0a0a0",
  ],
  aquarium: [
    "photo-1522069169874-c58eec4e76b5",
    "photo-1559827260-dc66d52bef19",
  ],
  guitars: [
    "photo-1516927047702-673a1776a78c",
    "photo-1511379932386-fbf6e1354f34",
  ],
  keyboards: [
    "photo-1520523839897-bd0b52f945a0",
    "photo-1558618666-fcd25c85cd64",
  ],
  drums: [
    "photo-1519899302929-cd9eee5b5ff7",
    "photo-1511379932386-fbf6e1354f34",
  ],
  "traditional-instruments": [
    "photo-1511379932386-fbf6e1354f34",
    "photo-1493225457124-a3eb161ffa5f",
  ],
  "recording-equipment": [
    "photo-1598488035139-bdbb2231bb04",
    "photo-1516280440614-379248eb5239",
  ],
  "office-equipment": [
    "photo-1497366216548-37526070297c",
    "photo-1497366754035-f200968a6e72",
  ],
  "generators-ups": [
    "photo-1621905252507-b35492cc74b4",
    "photo-1558618666-fcd25c85cd64",
  ],
  "safety-equipment": [
    "photo-1581094794329-c8112a89af12",
    "photo-1504307651250-372120b33015",
  ],
  tractors: [
    "photo-1621905251189-08b45d6a269e",
    "photo-1592982537075-d793136774a5",
  ],
  "pumps-irrigation": [
    "photo-1621905252507-b35492cc74b4",
    "photo-1416879595882-3373a0480b5b",
  ],
  "seeds-fertilizers": [
    "photo-1464226184884-fa280b87c399",
    "photo-1416879595882-3373a0480b5b",
  ],
  "plants-seeds": [
    "photo-1416879595882-3373a0480b5b",
    "photo-1464226184884-fa280b87c399",
  ],
  "lawn-care": [
    "photo-1558904541-efa843a96f01",
    "photo-1416879595882-3373a0480b5b",
  ],
  "outdoor-furniture": [
    "photo-1600210492486-724fe5c67fb0",
    "photo-1600585154340-be6161a56a0c",
  ],
  "bbq-outdoor": [
    "photo-1555939597-0b6c0a0a0a0a0",
    "photo-1556911220-bff31c812dba",
  ],
  "gold-jewelry": [
    "photo-1515562141207-7a88fb7ce338",
    "photo-1611591437281-460bfbe1220a",
  ],
  "silver-jewelry": [
    "photo-1611591437281-460bfbe1220a",
    "photo-1605100804763-247f67b3557e",
  ],
  watches: [
    "photo-1524805445258-68469250b45b",
    "photo-1523275335684-37898b6baf30",
  ],
};

const GENERAL_PHOTOS = [
  "photo-1505740420928-5e560c06d30e",
  "photo-1523275335684-37898b6baf30",
  "photo-1560472354-b33ff0c44a43",
  "photo-1556742049-0cfed4f6a45d",
  "photo-1441986300917-64674bd600d8",
  "photo-1472851294608-062e4518afbf",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1556745753-b290d2a0b0a0",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function productImageUrl(slug: string, categorySlug = "general"): string {
  const pool = CATEGORY_PHOTOS[categorySlug] ?? GENERAL_PHOTOS;
  const photo = pool[hashString(slug) % pool.length];
  return `https://images.unsplash.com/${photo}?w=800&h=600&fit=crop&q=80&auto=format`;
}

/** Distinct image per color/variant key — used for color swatch galleries. */
export function productVariantImageUrl(slug: string, categorySlug: string, variantKey: string): string {
  const pool = CATEGORY_PHOTOS[categorySlug] ?? GENERAL_PHOTOS;
  const photo = pool[hashString(`${slug}-${variantKey}`) % pool.length];
  return `https://images.unsplash.com/${photo}?w=800&h=600&fit=crop&q=80&auto=format`;
}

export function productThumbUrl(slug: string, categorySlug = "general"): string {
  return productImageUrl(slug, categorySlug).replace("w=800&h=600", "w=400&h=300");
}

export function vendorLogoUrl(name: string): string {
  const photo = GENERAL_PHOTOS[hashString(name) % GENERAL_PHOTOS.length];
  return `https://images.unsplash.com/${photo}?w=200&h=200&fit=crop&q=80&auto=format`;
}
