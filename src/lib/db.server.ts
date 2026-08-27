import { neon } from "@neondatabase/serverless";

let _sql: any = null;
let _initPromise: Promise<void> | null = null;

export const SEED_PRODUCTS: Array<{
  id?: number;
  slug: string;
  name: string;
  brand: string;
  price: string;
  img: string;
  tag: string;
  notes: string;
  category: "fragrance" | "body" | "skin" | "hair";
  description?: string | null;
  details?: string | null;
  how_to_use?: string | null;
  shipping_text?: string | null;
  authenticity_text?: string | null;
  returns_text?: string | null;
  ugc_videos?: string[];
  created_at?: string;
  updated_at?: string;
}> = [
  // Curtains (Mapped to fragrance / primary category)
  {
    slug: "luxury-blackout-curtain",
    name: "Luxury Triple-Weave Blackout Curtain",
    brand: "JNS Curate",
    price: "৳2,490",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    tag: "100% Blackout",
    notes: "Triple-Weave Polyester, Thermal Insulating, Noise Dampening",
    category: "fragrance",
    description: "Our signature Triple-Weave Blackout Curtains block 99% of sunlight and UV rays while regulating room temperature. Tailored with meticulous attention to drape and flow.",
    details: "Includes 2 panels. Size: 52\"W x 84\"L or Custom Sizing available. Header: Eyelet / Pinch Pleat. Handcrafted in Dhaka.",
    how_to_use: "Machine wash cold on gentle cycle. Warm iron or steam on reverse side before hanging.",
    shipping_text: "Standard delivery: 2-3 days in Dhaka, 3-5 days nationwide. Express custom sizing dispatched in 5-7 business days.",
    authenticity_text: "100% Genuine JNS Furnishing weave. Sourced from certified high-density mills.",
    returns_text: "7-day hassle-free exchange on standard sizes.",
    ugc_videos: []
  },
  {
    slug: "belgian-linen-sheer",
    name: "Belgian Flax Linen Sheer Curtain",
    brand: "JNS Curate",
    price: "৳1,850",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    tag: "Airy & Light",
    notes: "100% Organic Flax Linen, Semi-Transparent, Soft Slub",
    category: "fragrance",
    description: "Infuse your home with soft, diffused sunlight. Crafted from natural Belgian flax linen, offering a timeless relaxed drape.",
    details: "Sold per panel. Light filtration: Sheer. Header: Rod pocket with hidden back tabs.",
    how_to_use: "Hand wash or gentle machine wash in cold water with mild detergent. Hang to dry naturally for natural linen texture.",
    shipping_text: "Free nationwide shipping on orders over ৳5,000.",
    authenticity_text: "Masterfully woven from pure natural flax fibers.",
    returns_text: "7-day exchange guarantee.",
    ugc_videos: []
  },
  {
    slug: "royal-velvet-drape",
    name: "Royal Plush Velvet Insulated Drape",
    brand: "JNS Signature",
    price: "৳3,450",
    img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80",
    tag: "Luxury Velvet",
    notes: "High-Pile Micro Velvet, Heavyweight Lining, Rich Sheen",
    category: "fragrance",
    description: "Impart instant opulence to your living rooms and bedrooms with our weighted Turkish-style plush velvet drapes.",
    details: "Weight: 380 GSM. Header: Double Pinch Pleat with included brass pin hooks.",
    how_to_use: "Professional dry clean recommended or low-heat vertical steaming.",
    shipping_text: "Nationwide doorstep delivery with live tracking.",
    authenticity_text: "High-grade Turkish velvet blend with anti-fade finish.",
    returns_text: "7-day exchange policy.",
    ugc_videos: []
  },
  {
    slug: "artisan-jacquard-curtain",
    name: "Artisan Damask Jacquard Curtain",
    brand: "JNS Signature",
    price: "৳2,800",
    img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80",
    tag: "Woven Jacquard",
    notes: "Embossed Damask, Structured Fold, Satin Finish",
    category: "fragrance",
    description: "Intricately woven damask motifs with a subtle satin luster, designed for grand master suites and formal drawing rooms.",
    details: "Available in Champagne Gold, Slate Charcoal, and Forest Olive.",
    how_to_use: "Dry clean or gentle spot clean.",
    shipping_text: "Fast delivery across all 64 districts in Bangladesh.",
    authenticity_text: "Precision jacquard woven by JNS master weavers.",
    returns_text: "7-day return policy.",
    ugc_videos: []
  },

  // Bedding Sets (Mapped to body)
  {
    slug: "egyptian-cotton-bedding-set",
    name: "400TC Egyptian Cotton Bedding Set",
    brand: "JNS Bedding",
    price: "৳3,990",
    img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1000&q=80",
    tag: "400 Thread Count",
    notes: "100% Long-Staple Cotton, Silky Sateen Weave, Breathable",
    category: "body",
    description: "Experience five-star hotel comfort every night. Silky smooth 400 thread count long-staple cotton that gets softer with every wash.",
    details: "King Set includes: 1 Fitted Sheet (78x80+16\"), 1 Flat Sheet (102x108\"), 2 Pillowcases (20x36\").",
    how_to_use: "Machine wash warm with like colors. Tumble dry low.",
    shipping_text: "Same-day dispatch in Dhaka.",
    authenticity_text: "Certified 100% long-staple Egyptian cotton.",
    returns_text: "Exchange within 7 days in original packaging.",
    ugc_videos: []
  },
  {
    slug: "washed-linen-duvet-set",
    name: "Pure French Washed Linen Duvet Set",
    brand: "JNS Bedding",
    price: "৳4,800",
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
    tag: "Pre-Washed Linen",
    notes: "100% French Flax, Natural Temperature Regulating",
    category: "body",
    description: "Pre-washed for extraordinary softness from night one. Naturally moisture-wicking and cool during hot summer nights.",
    details: "Includes 1 Duvet Cover with coconut shell button closure and 2 Oxford pillow shams.",
    how_to_use: "Wash at 40°C. Do not bleach. Air dry for relaxed rumpled aesthetic.",
    shipping_text: "Nationwide delivery via Pathao & Steadfast.",
    authenticity_text: "Eco-friendly natural flax European harvest.",
    returns_text: "7-day exchange guarantee.",
    ugc_videos: []
  },
  {
    slug: "quilted-sateen-bedcover",
    name: "Heritage Quilted Sateen Bedcover",
    brand: "JNS Bedding",
    price: "৳5,200",
    img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80",
    tag: "Hand-Quilted",
    notes: "Cotton Sateen, Hypoallergenic Microfiber Filling",
    category: "body",
    description: "A tailored focal piece for your bedroom. Detailed geometric hand-guided quilting with a featherweight warm loft.",
    details: "Size: 90\" x 100\" (Fits King & Queen beds). Includes 2 matched quilted shams.",
    how_to_use: "Gentle cycle machine wash or dry clean.",
    shipping_text: "Free delivery on this item.",
    authenticity_text: "Crafted by JNS master artisans.",
    returns_text: "7-day return policy.",
    ugc_videos: []
  },

  // Living & Sofa Covers (Mapped to skin)
  {
    slug: "sofa-cover-series",
    name: "Tailored Textured Sofa Slipcover Series",
    brand: "JNS Living",
    price: "৳2,190",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    tag: "Universal Fit",
    notes: "High-Stretch Jacquard, Anti-Slip Foam Anchors, Water Repellent",
    category: "skin",
    description: "Transform and protect your sofa instantly. Stretch waffle jacquard fabric with all-around elastic hem for a snug, custom-upholstered look.",
    details: "Available for 1-Seater (৳1,490), 2-Seater (৳1,890), 3-Seater (৳2,190), and L-Shape Sectionals.",
    how_to_use: "Slip over sofa, tuck excess fabric into crevices using provided foam cylinders.",
    shipping_text: "Quick shipping nationwide.",
    authenticity_text: "Premium heavy-stretch polyester-spandex blend.",
    returns_text: "7-day size exchange available.",
    ugc_videos: []
  },
  {
    slug: "boucle-accent-sofa-cover",
    name: "Nordic Bouclé Textured Sofa Throw & Cover",
    brand: "JNS Living",
    price: "৳2,850",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
    tag: "Bouclé Texture",
    notes: "Plush Loop Yarn, Heavyweight 450 GSM, Anti-Pilling",
    category: "skin",
    description: "Modern tactile warmth for your living area. Drapes effortlessly over armchairs and sofas with cozy tactile loop yarn.",
    details: "Dimensions: 180cm x 260cm. Machine washable.",
    how_to_use: "Drape casually or tuck tightly. Wash cold.",
    shipping_text: "Nationwide delivery.",
    authenticity_text: "Original JNS design.",
    returns_text: "7-day return policy.",
    ugc_videos: []
  },
  {
    slug: "velvet-throw-cushion-set",
    name: "Velvet Decorative Cushion Trio Collection",
    brand: "JNS Living",
    price: "৳990",
    img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
    tag: "Set of 3",
    notes: "Micro Velvet, Invisible Zipper, Contrast Piping",
    category: "skin",
    description: "Rich jewel tones and soft neutrals to elevate your sofa, accent chair, or bed. Finished with refined piped borders.",
    details: "Size: 18\" x 18\" (45x45 cm). Cushion covers only (Fillers available separately).",
    how_to_use: "Hand wash or gentle spot clean.",
    shipping_text: "Ships in 24 hours.",
    authenticity_text: "Handmade in our studio.",
    returns_text: "7-day exchange.",
    ugc_videos: []
  },
  {
    slug: "boho-tufted-cushion",
    name: "Artisanal Tufted Cotton Cushion Cover",
    brand: "JNS Living",
    price: "৳850",
    img: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1000&q=80",
    tag: "Hand Tufted",
    notes: "100% Heavy Cotton Canvas, Textured Wool Tufting",
    category: "skin",
    description: "Bohemian geometric patterns created with dimensional hand-tufted yarns on a durable neutral cotton canvas base.",
    details: "Size: 16\" x 16\" and 18\" x 18\".",
    how_to_use: "Spot clean only.",
    shipping_text: "Fast doorstep courier.",
    authenticity_text: "Hand-tufted by rural artisan cooperatives.",
    returns_text: "7-day exchange.",
    ugc_videos: []
  },

  // Table Linen & Upholstery Fabrics (Mapped to hair)
  {
    slug: "raw-linen-table-runner",
    name: "Raw Slub Linen Embroidered Table Runner",
    brand: "JNS Dining",
    price: "৳1,250",
    img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
    tag: "Table Decor",
    notes: "Natural Flax Linen, Delicate Hemstitch Border, Neutral Hue",
    category: "hair",
    description: "Elevate everyday dining and dinner parties. Pure flax linen runner featuring understated hemstitched border detailing.",
    details: "Dimensions: 14\" x 72\" (Seats 6-8) and 14\" x 90\" (Seats 8-10).",
    how_to_use: "Gentle machine wash cold. Iron damp.",
    shipping_text: "Nationwide shipping.",
    authenticity_text: "100% natural unbleached flax linen.",
    returns_text: "7-day return policy.",
    ugc_videos: []
  },
  {
    slug: "heavyweight-upholstery-fabric",
    name: "Commercial Grade Textured Upholstery Fabric",
    brand: "JNS Fabrics",
    price: "৳1,450",
    img: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1000&q=80",
    tag: "Per Yard",
    notes: "50,000 Double Rubs, Stain-Resistant Coating, Heavyweight",
    category: "hair",
    description: "Architectural textile with high rub count for custom sofas, dining chairs, headboards, and commercial interior projects.",
    details: "Width: 54 inches (137 cm). Sold by the running yard. Swatches available.",
    how_to_use: "Wipe clean with damp cloth or mild upholstery shampoo.",
    shipping_text: "Rolled and shipped in protective heavy plastic sleeves.",
    authenticity_text: "Heavy-duty commercial rub rating certified.",
    returns_text: "Cut fabric yardage is non-refundable; swatches recommended.",
    ugc_videos: []
  },
  {
    slug: "turkish-velvet-upholstery",
    name: "Imperial Matte Velvet Upholstery Fabric",
    brand: "JNS Fabrics",
    price: "৳1,890",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    tag: "Per Yard",
    notes: "Matte Finish Velvet, Water Repellent, Pet-Friendly Weave",
    category: "hair",
    description: "Supple, ultra-dense velvet with subtle matte finish that resists liquid absorption and claw snags. Ideal for luxury furniture.",
    details: "Width: 56 inches. Martindale rating: 65,000 rubs.",
    how_to_use: "Professional upholstery care.",
    shipping_text: "Nationwide delivery.",
    authenticity_text: "Direct import from Bursa, Turkey textile mills.",
    returns_text: "Sample swatches available upon request.",
    ugc_videos: []
  },
  {
    slug: "custom-curtain-service",
    name: "Bespoke Custom Window Treatment Concierge",
    brand: "JNS Bespoke",
    price: "৳3,200",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    tag: "Custom Sizing",
    notes: "Tailored to Any Window Height/Width, 200+ Fabric Choices",
    category: "fragrance",
    description: "Custom-made curtains tailored precisely to your window measurements. Includes complimentary fabric consultation in Dhaka.",
    details: "Choose your exact width, height, pleat style, and blackout lining options.",
    how_to_use: "Enter your window dimensions in our online calculator or book a home visit.",
    shipping_text: "Handcrafted and delivered in 5 to 7 days.",
    authenticity_text: "Backed by JNS 100% Perfect Fit Guarantee.",
    returns_text: "Full adjustment support if sizing needs fine-tuning.",
    ugc_videos: []
  }
];

// In-memory tables for standalone/local development
const memDb = {
  products: SEED_PRODUCTS.map((p, idx) => ({
    id: idx + 1,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    price: p.price,
    img: p.img,
    tag: p.tag,
    notes: p.notes,
    category: p.category,
    description: p.description ?? null,
    details: p.details ?? null,
    how_to_use: p.how_to_use ?? null,
    shipping_text: p.shipping_text ?? null,
    authenticity_text: p.authenticity_text ?? null,
    returns_text: p.returns_text ?? null,
    ugc_videos: p.ugc_videos ?? [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })),
  orders: [] as any[],
  users: [
    { id: 1, email: "admin@sanvogue.com", name: "Admin", created_at: new Date().toISOString() },
  ] as any[],
  verification_codes: [] as any[],
  reviews: [
    { id: 1, product_slug: "luxury-blackout-curtain", user_id: 1, user_name: "Farhana R.", rating: 5, title: "Total Room Blackout & Beautiful Drape", body: "Ordered 6 panels for our Gulshan apartment. Blocks the afternoon Dhaka heat completely and looks magnificent.", created_at: new Date().toISOString() },
    { id: 2, product_slug: "belgian-linen-sheer", user_id: 1, user_name: "Zubair H.", rating: 5, title: "Natural Sunlight Filtration", body: "The linen texture is top tier. Gives our living room a breezy Scandinavian luxury feel.", created_at: new Date().toISOString() },
    { id: 3, product_slug: "egyptian-cotton-bedding-set", user_id: 1, user_name: "Tahmina S.", rating: 5, title: "Silky Hotel Grade Comfort", body: "Extraordinarily soft and stays cool all night. The 400TC quality is noticeable immediately.", created_at: new Date().toISOString() },
    { id: 4, product_slug: "sofa-cover-series", user_id: 1, user_name: "Mahir A.", rating: 5, title: "Saved our 3-Seater Sofa", body: "Fits like custom upholstery. The textured stretch waffle fabric doesn't slip at all.", created_at: new Date().toISOString() },
  ] as any[],
  nextId: {
    products: 100,
    orders: 1,
    users: 2,
    verification_codes: 1,
    reviews: 5,
  },
};

function createMemorySql() {
  return async function sql(strings: TemplateStringsArray, ...values: any[]) {
    const rawSql = strings.reduce((acc, str, i) => acc + str + (i < values.length ? `$${i + 1}` : ""), "").trim();
    const normalized = rawSql.replace(/\s+/g, " ").trim();

    // DDL operations
    if (/^(CREATE TABLE|ALTER TABLE|CREATE INDEX)/i.test(normalized)) {
      return [];
    }

    // SELECT COUNT(*)::int AS c FROM products
    if (/SELECT COUNT\(\*\)::int AS c FROM products/i.test(normalized)) {
      return [{ c: memDb.products.length }];
    }

    // INSERT INTO products
    if (/INSERT INTO products/i.test(normalized)) {
      const slugVal = values[0];
      const nameVal = values[1];
      const brandVal = values[2];
      const priceVal = values[3];
      const imgVal = values[4];
      const tagVal = values[5];
      const notesVal = values[6];
      const categoryVal = values[7];
      const descVal = values[8] ?? null;
      const detVal = values[9] ?? null;
      const howVal = values[10] ?? null;
      const shipVal = values[11] ?? null;
      const authVal = values[12] ?? null;
      const retVal = values[13] ?? null;
      let ugcVal: string[] = [];
      try {
        ugcVal = typeof values[14] === "string" ? JSON.parse(values[14]) : (values[14] ?? []);
      } catch {
        ugcVal = [];
      }

      const existingIdx = memDb.products.findIndex((p) => p.slug === slugVal);
      if (existingIdx >= 0) {
        if (!/ON CONFLICT/i.test(normalized)) {
          memDb.products[existingIdx] = {
            ...memDb.products[existingIdx],
            name: nameVal,
            brand: brandVal,
            price: priceVal,
            img: imgVal,
            tag: tagVal,
            notes: notesVal,
            category: categoryVal,
            description: descVal,
            details: detVal,
            how_to_use: howVal,
            shipping_text: shipVal,
            authenticity_text: authVal,
            returns_text: retVal,
            ugc_videos: ugcVal,
            updated_at: new Date().toISOString(),
          };
        }
      } else {
        memDb.products.push({
          id: memDb.nextId.products++,
          slug: slugVal,
          name: nameVal,
          brand: brandVal,
          price: priceVal,
          img: imgVal,
          tag: tagVal,
          notes: notesVal,
          category: categoryVal,
          description: descVal,
          details: detVal,
          how_to_use: howVal,
          shipping_text: shipVal,
          authenticity_text: authVal,
          returns_text: retVal,
          ugc_videos: ugcVal,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      return [];
    }

    // UPDATE products
    if (/UPDATE products/i.test(normalized)) {
      const origSlug = values[values.length - 1];
      const pIdx = memDb.products.findIndex((p) => p.slug === origSlug);
      if (pIdx >= 0) {
        let ugcVal: string[] = [];
        try {
          ugcVal = typeof values[13] === "string" ? JSON.parse(values[13]) : (values[13] ?? []);
        } catch {
          ugcVal = [];
        }
        memDb.products[pIdx] = {
          ...memDb.products[pIdx],
          slug: values[0],
          name: values[1],
          brand: values[2],
          price: values[3],
          img: values[4],
          tag: values[5],
          notes: values[6],
          category: values[7],
          description: values[8] ?? null,
          details: values[9] ?? null,
          how_to_use: values[10] ?? null,
          shipping_text: values[11] ?? null,
          authenticity_text: values[12] ?? null,
          returns_text: values[13] ?? null,
          ugc_videos: ugcVal,
          updated_at: new Date().toISOString(),
        };
      }
      return [];
    }

    // DELETE FROM products
    if (/DELETE FROM products WHERE slug =/i.test(normalized)) {
      const targetSlug = values[0];
      memDb.products = memDb.products.filter((p) => p.slug !== targetSlug);
      return [];
    }

    // SELECT ... FROM products WHERE slug = ...
    if (/FROM products WHERE slug =/i.test(normalized)) {
      const targetSlug = values[0];
      const found = memDb.products.find((p) => p.slug === targetSlug);
      return found ? [{ ...found, ugc_videos: found.ugc_videos ?? [] }] : [];
    }

    // SELECT ... FROM products ORDER BY id ASC
    if (/FROM products/i.test(normalized)) {
      return [...memDb.products].sort((a, b) => a.id - b.id).map((p) => ({
        ...p,
        ugc_videos: p.ugc_videos ?? [],
      }));
    }

    // SELECT AVG(rating) / reviews stats
    if (/SELECT product_slug AS slug, AVG\(rating\)/i.test(normalized)) {
      const grouped: Record<string, { total: number; count: number }> = {};
      for (const r of memDb.reviews) {
        if (!grouped[r.product_slug]) grouped[r.product_slug] = { total: 0, count: 0 };
        grouped[r.product_slug].total += Number(r.rating) || 5;
        grouped[r.product_slug].count += 1;
      }
      return Object.entries(grouped).map(([slug, { total, count }]) => ({
        slug,
        avg: count ? Number((total / count).toFixed(1)) : 0,
        count,
      }));
    }

    // SELECT ... FROM reviews WHERE product_slug = ...
    if (/FROM reviews WHERE product_slug =/i.test(normalized)) {
      const targetSlug = values[0];
      return memDb.reviews
        .filter((r) => r.product_slug === targetSlug)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 50);
    }

    // SELECT ... FROM reviews (all for admin)
    if (/FROM reviews/i.test(normalized)) {
      return [...memDb.reviews].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    // INSERT INTO reviews
    if (/INSERT INTO reviews/i.test(normalized)) {
      const newReview = {
        id: memDb.nextId.reviews++,
        product_slug: values[0],
        user_id: values[1],
        user_name: values[2],
        rating: values[3],
        title: values[4],
        body: values[5],
        created_at: new Date().toISOString(),
      };
      memDb.reviews.unshift(newReview);
      return [];
    }

    // DELETE FROM reviews
    if (/DELETE FROM reviews WHERE id =/i.test(normalized)) {
      const targetId = Number(values[0]);
      memDb.reviews = memDb.reviews.filter((r) => r.id !== targetId);
      return [];
    }

    // Orders: SELECT 1 FROM orders WHERE order_number = ...
    if (/FROM orders WHERE order_number =/i.test(normalized)) {
      const num = values[0];
      const found = memDb.orders.find((o) => o.order_number === num);
      return found ? [found] : [];
    }

    // INSERT INTO orders
    if (/INSERT INTO orders/i.test(normalized)) {
      let itemsVal = [];
      try {
        itemsVal = typeof values[7] === "string" ? JSON.parse(values[7]) : (values[7] ?? []);
      } catch {
        itemsVal = [];
      }
      const newOrder = {
        id: memDb.nextId.orders++,
        order_number: values[0],
        customer_name: values[1],
        phone: values[2],
        email: values[3] ?? null,
        address: values[4],
        city: values[5],
        notes: values[6] ?? null,
        items: itemsVal,
        total: String(values[8]),
        payment_method: values[9] ?? "cod",
        status: values[10] ?? "pending",
        created_at: new Date().toISOString(),
      };
      memDb.orders.unshift(newOrder);
      return [];
    }

    // UPDATE orders SET status = ...
    if (/UPDATE orders SET status =/i.test(normalized)) {
      const statusVal = values[0];
      const orderNum = values[1];
      const o = memDb.orders.find((ord) => ord.order_number === orderNum);
      if (o) o.status = statusVal;
      return [];
    }

    // SELECT ... FROM orders WHERE LOWER(email) = ...
    if (/FROM orders WHERE LOWER\(email\) =/i.test(normalized)) {
      const email = String(values[0]).toLowerCase();
      return memDb.orders.filter((o) => (o.email ?? "").toLowerCase() === email);
    }

    // SELECT ... FROM orders
    if (/FROM orders/i.test(normalized)) {
      return [...memDb.orders].sort((a, b) => b.id - a.id);
    }

    // Users: INSERT INTO users ...
    if (/INSERT INTO users/i.test(normalized)) {
      const email = String(values[0]).toLowerCase();
      const name = String(values[1]);
      const existing = memDb.users.find((u) => u.email === email);
      if (existing) {
        existing.name = name;
      } else {
        memDb.users.push({ id: memDb.nextId.users++, email, name, created_at: new Date().toISOString() });
      }
      return [];
    }

    // SELECT name / SELECT id, email, name FROM users WHERE email = ...
    if (/FROM users WHERE email =/i.test(normalized)) {
      const email = String(values[0]).toLowerCase();
      const found = memDb.users.find((u) => u.email === email);
      return found ? [found] : [];
    }

    // INSERT INTO verification_codes
    if (/INSERT INTO verification_codes/i.test(normalized)) {
      memDb.verification_codes.push({
        id: memDb.nextId.verification_codes++,
        email: String(values[0]).toLowerCase(),
        code: String(values[1]),
        expires_at: String(values[2]),
        used: false,
        created_at: new Date().toISOString(),
      });
      return [];
    }

    // SELECT id FROM verification_codes ...
    if (/FROM verification_codes/i.test(normalized)) {
      const email = String(values[0]).toLowerCase();
      const code = String(values[1]);
      const now = new Date().toISOString();
      const found = memDb.verification_codes
        .filter((c) => c.email === email && c.code === code && !c.used && c.expires_at > now)
        .sort((a, b) => b.id - a.id);
      return found.slice(0, 1);
    }

    // UPDATE verification_codes SET used = TRUE WHERE id = ...
    if (/UPDATE verification_codes SET used = TRUE/i.test(normalized)) {
      const targetId = Number(values[0]);
      const item = memDb.verification_codes.find((c) => c.id === targetId);
      if (item) item.used = true;
      return [];
    }

    return [];
  };
}

export function getSql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (url && url.trim().length > 0) {
      try {
        _sql = neon(url);
      } catch (err) {
        console.warn("Neon initialization failed, falling back to in-memory store:", err);
        _sql = createMemorySql();
      }
    } else {
      _sql = createMemorySql();
    }
  }
  return _sql;
}

export async function ensureDb() {
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        price TEXT NOT NULL,
        img TEXT NOT NULL,
        tag TEXT NOT NULL,
        notes TEXT NOT NULL,
        category TEXT NOT NULL CHECK (category IN ('fragrance','body','skin','hair')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS details TEXT`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS how_to_use TEXT`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS shipping_text TEXT`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS authenticity_text TEXT`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS returns_text TEXT`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS ugc_videos JSONB NOT NULL DEFAULT '[]'::jsonb`;
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number TEXT UNIQUE NOT NULL,
        customer_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        notes TEXT,
        items JSONB NOT NULL,
        total NUMERIC(12,2) NOT NULL,
        payment_method TEXT NOT NULL DEFAULT 'cod',
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS verification_codes (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        code TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_verification_email ON verification_codes(email)`;
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_slug TEXT NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_slug ON reviews(product_slug)`;
    const rows = (await sql`SELECT COUNT(*)::int AS c FROM products`) as { c: number }[];
    if (rows[0]?.c === 0) {
      for (const p of SEED_PRODUCTS) {
        await sql`
          INSERT INTO products (slug, name, brand, price, img, tag, notes, category)
          VALUES (${p.slug}, ${p.name}, ${p.brand}, ${p.price}, ${p.img}, ${p.tag}, ${p.notes}, ${p.category})
          ON CONFLICT (slug) DO NOTHING
        `;
      }
    }
  })().catch((e) => {
    _initPromise = null;
    throw e;
  });
  return _initPromise;
}

export type ProductRow = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: string;
  img: string;
  tag: string;
  notes: string;
  category: "fragrance" | "body" | "skin" | "hair";
};

