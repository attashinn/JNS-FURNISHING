import type { Product } from "./products.functions";

export type JnsCategory = {
  key: string;
  name: string;
  shortName: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  badge: string;
};

export const JNS_CATEGORIES: JnsCategory[] = [
  {
    key: "fragrance",
    name: "Curtains & Drapery",
    shortName: "Curtains",
    slug: "curtains",
    headline: "Made for Your Windows. Tailored for Your Home.",
    description: "Handcrafted blackout, linen sheers, velvet drapes, and artisan jacquards tailored to your exact window dimensions.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    badge: "Bespoke Sizing",
  },
  {
    key: "body",
    name: "Luxury Bedding & Linens",
    shortName: "Bedding",
    slug: "bedding",
    headline: "Five-Star Hotel Softness Every Night.",
    description: "400TC Egyptian cotton sateen, French washed linen duvet sets, and quilted heirloom bedcovers.",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1000&q=80",
    badge: "100% Cotton & Linen",
  },
  {
    key: "skin",
    name: "Sofa Covers & Living",
    shortName: "Sofa Covers",
    slug: "living",
    headline: "Reimagine Your Living Room.",
    description: "Stretch jacquard sofa slipcovers, Nordic bouclé throws, and designer tufted cushion collections.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    badge: "Universal Fit",
  },
  {
    key: "hair",
    name: "Table Linen & Upholstery Fabrics",
    shortName: "Fabrics & Dining",
    slug: "fabrics",
    headline: "Architectural Textiles & Dining Linens.",
    description: "Embroidered raw flax table runners, heavy-duty upholstery velvet, and commercial grade furnishing fabrics by the yard.",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1000&q=80",
    badge: "50,000+ Rubs",
  },
];

export const JNS_ROOMS = [
  {
    name: "Living Room",
    description: "Drapes, sofa slipcovers & plush velvet cushions",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    slug: "living",
  },
  {
    name: "Master Bedroom",
    description: "Blackout curtains, Egyptian cotton & duvet sets",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    slug: "bedding",
  },
  {
    name: "Dining & Entertaining",
    description: "Embroidered table runners & tailored chair slipcovers",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    slug: "fabrics",
  },
  {
    name: "Home Office & Study",
    description: "Acoustic insulated curtains & textured upholstery",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=800&q=80",
    slug: "curtains",
  },
];

export const JNS_STYLES = [
  { name: "Modern Minimalist", desc: "Clean lines, raw slub textures & muted earth tones" },
  { name: "Warm Neutral", desc: "Cozy beiges, oatmeal linen, warm creams & gold accents" },
  { name: "Classic Heritage", desc: "Damask jacquards, double pinch pleats & rich velvet" },
  { name: "Contemporary Luxury", desc: "High-sheen micro velvet, brass details & bold jewel tones" },
];

export function getCategoryMeta(categoryKey?: string) {
  return JNS_CATEGORIES.find((c) => c.key === categoryKey) ?? JNS_CATEGORIES[0];
}

export function formatPriceBDT(priceStr: string | number): string {
  if (typeof priceStr === "number") {
    return `৳${priceStr.toLocaleString("en-US")}`;
  }
  const clean = String(priceStr).replace(/[^\d.]/g, "");
  const num = parseFloat(clean);
  if (isNaN(num)) return String(priceStr);
  return `৳${num.toLocaleString("en-US")}`;
}

export function parsePriceNumber(priceStr: string | number): number {
  if (typeof priceStr === "number") return priceStr;
  const clean = String(priceStr).replace(/[^\d.]/g, "");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

export function calculateCustomCurtainPrice({
  widthInches,
  heightInches,
  fabricType = "blackout",
  lining = "standard",
  pleatStyle = "eyelet",
}: {
  widthInches: number;
  heightInches: number;
  fabricType?: "blackout" | "linen" | "velvet" | "jacquard";
  lining?: "standard" | "thermal" | "blackout";
  pleatStyle?: "eyelet" | "pinch-pleat" | "rod-pocket" | "wave-fold";
}): { basePrice: number; totalPrice: number; panels: number; estimatedDays: string } {
  const areaSqFt = (Math.max(24, widthInches) * Math.max(36, heightInches)) / 144;
  const panels = Math.max(1, Math.ceil(widthInches / 48));

  const fabricMultiplier: Record<string, number> = {
    blackout: 120,
    linen: 105,
    velvet: 160,
    jacquard: 140,
  };

  const liningExtra: Record<string, number> = {
    standard: 0,
    thermal: 350 * panels,
    blackout: 600 * panels,
  };

  const pleatExtra: Record<string, number> = {
    eyelet: 200 * panels,
    "pinch-pleat": 450 * panels,
    "rod-pocket": 100 * panels,
    "wave-fold": 500 * panels,
  };

  const fabricRate = fabricMultiplier[fabricType] ?? 120;
  const basePrice = Math.round(areaSqFt * fabricRate);
  const totalPrice = Math.round(basePrice + (liningExtra[lining] ?? 0) + (pleatExtra[pleatStyle] ?? 0));

  return {
    basePrice,
    totalPrice: Math.max(1600, totalPrice),
    panels,
    estimatedDays: "5 - 7 business days",
  };
}
