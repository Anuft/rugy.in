export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice: number;
  netWeight: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFlagship?: boolean;
  badge?: string;
  badgeColor?: "red" | "gold" | "green";
  shortDescription: string;
  fullDescription: string;
  images: string[];
  benefits: {
    number: string;
    title: string;
    description: string;
  }[];
  ritualSteps: {
    step: string;
    title: string;
    instruction: string;
    image: string;
  }[];
  purityPillars: {
    title: string;
    detail: string;
  }[];
  ingredients: string;
  keyActives: {
    name: string;
    purpose: string;
  }[];
  howToUse: string;
  shippingInfo: string;
}

export const products: Product[] = [
  {
    id: "rugby-white-10-days-challenge",
    slug: "10-days-challenge",
    name: "RUGBY WHITE 10 DAYS CHALLENGE",
    subtitle: "Radiance Nourishing Night Ritual Cream",
    category: "Night Cream",
    price: 599,
    originalPrice: 1200,
    netWeight: "65 g / 2.29 oz.",
    rating: 4.9,
    reviewCount: 328,
    inStock: true,
    isFlagship: true,
    badge: "LIMITED OFFER",
    badgeColor: "red",
    shortDescription:
      "Iconic 10 Days Challenge night cream. Brightens dull tone, fades dark spots, and restores glass-skin radiance.",
    fullDescription:
      "Crafted with pure botanicals, niacinamide, and deep moisture actives, Rugby White works overnight to clear sun tanning, calm blemishes, and reveal visibly luminous, unified skin in 10 days.",
    images: [
      "/images/rugby-skin-revival.jpg",
      "/images/rugby-skin-revival-jar.png",
      "/images/instagram/DTzQd3pEfsT.jpg",
      "/images/instagram/DXqFYBckZEu.jpg",
      "/images/instagram/DXNVS0gkyTQ_1.jpg",
      "/images/instagram/DcK0UwPRNUE.jpg",
    ],
    benefits: [
      {
        number: "01",
        title: "INSTANT RADIANCE",
        description: "Restores natural morning glass-skin luminosity.",
      },
      {
        number: "02",
        title: "EVEN SKIN TONE",
        description: "Fades dark spots, sun tanning & blemishes.",
      },
      {
        number: "03",
        title: "DEEP BARRIER HYDRATION",
        description: "Deep moisture lock with zero greasy residue.",
      },
      {
        number: "04",
        title: "BLEMISH & ACNE CARE",
        description: "Purifies pores and soothes active redness.",
      },
      {
        number: "05",
        title: "CONFIDENCE & COMFORT",
        description: "100% clean formula: 0% bleach, steroids, or parabens.",
      },
    ],
    ritualSteps: [
      {
        step: "01. PREPARE",
        title: "CLEANSE",
        instruction: "Wash face gently and pat dry.",
        image: "/images/instagram/DTzQd3pEfsT.jpg",
      },
      {
        step: "02. APPLY",
        title: "PEA-SIZED AMOUNT",
        instruction: "Warm a pea-sized amount on fingertips.",
        image: "/images/instagram/DXqFYBckZEu.jpg",
      },
      {
        step: "03. EMBRACE",
        title: "GENTLE MASSAGE",
        instruction: "Massage gently in upward circular motions until absorbed.",
        image: "/images/instagram/DXqFYBckZEu.jpg",
      },
    ],
    purityPillars: [
      { title: "PARABEN FREE", detail: "Thoughtful formulation crafted without parabens or sulfates." },
      { title: "NO HARSH BLEACH", detail: "Zero aggressive bleaching agents, hydroquinone, or steroids." },
      { title: "CRUELTY FREE", detail: "Never tested on animals. Ethically developed and produced." },
      { title: "DERMATOLOGICALLY TESTED", detail: "Carefully checked for skin safety across all Indian skin types." },
    ],
    ingredients:
      "Aqua (Purified Water), Caprylic/Capric Triglyceride, Vegetable Glycerin, Niacinamide (Vitamin B3), Cetearyl Olivate, Sorbitan Olivate, Camellia Sinensis (Green Tea) Leaf Extract, Centella Asiatica Leaf Extract, Aloe Barbadensis Leaf Juice, Sodium Hyaluronate, Squalane, Tocopheryl Acetate (Vitamin E), Allantoin, Ethylhexylglycerin, Phenoxyethanol.",
    keyActives: [
      { name: "Niacinamide (Vitamin B3)", purpose: "Evens skin tone, refines pores, and balances oil production." },
      { name: "Green Tea & Centella", purpose: "Soothes blemish-prone complexions and calms redness." },
      { name: "Botanical Squalane", purpose: "Weightless emollient that locks in moisture without clogging pores." },
      { name: "Sodium Hyaluronate", purpose: "Draws atmospheric hydration deep into multiple cellular skin layers." },
    ],
    howToUse:
      "For best results, use every night as part of your evening ritual. After cleansing, take a pea-sized amount and warm between fingertips. Smooth evenly over forehead, cheeks, jawline, and neck. Massage in gentle upward circular motions for 60 seconds until fully absorbed. Protect your skin with sunscreen during the day.",
    shippingInfo:
      "Complimentary Express Pan-India Delivery. Dispatched within 24 hours. Cash On Delivery (COD) available nationwide.",
  },
  {
    id: "rugby-white-buy-2-pack",
    slug: "buy-2-combo-pack",
    name: "BUY 2 COMBO PACK — SAVE MORE",
    subtitle: "2x 10 Days Challenge Radiance Creams",
    category: "Value Combos",
    price: 950,
    originalPrice: 1800,
    netWeight: "2x 65 g Jars",
    rating: 5.0,
    reviewCount: 184,
    inStock: true,
    badge: "BEST VALUE",
    badgeColor: "gold",
    shortDescription:
      "Buy 2 & Save ₹850! Keep one jar at home and one for travel, or share the 10 Days Challenge journey with a loved one.",
    fullDescription:
      "Our most popular bundle! The Buy 2 Combo Pack gives you two full-sized Rugby White 10 Days Challenge jars at a major discount. Consistent 20-30 day usage allows your skin to cycle through deep cellular renewal, fading stubborn marks and locking in a lasting natural glow.",
    images: [
      "/images/instagram/DcK0UwPRNUE.jpg",
      "/images/rugby-skin-revival.jpg",
      "/images/instagram/DXqFYBckZEu.jpg",
      "/images/instagram/DXNVS0gkyTQ_1.jpg",
    ],
    benefits: [
      { number: "01", title: "SAVE ₹850", description: "Special twin-pack pricing with maximum direct savings." },
      { number: "02", title: "EXTENDED CYCLE", description: "Enjoy uninterrupted 30-day continuous skin renewal." },
      { number: "03", title: "FREE EXPRESS DELIVERY", description: "Direct doorstep delivery with Cash On Delivery option." },
    ],
    ritualSteps: [
      {
        step: "STEP 01",
        title: "CONSISTENCY",
        instruction: "Use jar 1 for your first 10-14 days transformation phase.",
        image: "/images/instagram/DcK0UwPRNUE.jpg",
      },
      {
        step: "STEP 02",
        title: "MAINTENANCE",
        instruction: "Use jar 2 for ongoing barrier nourishment and lasting glow.",
        image: "/images/instagram/DXqFYBckZEu.jpg",
      },
    ],
    purityPillars: [
      { title: "PARABEN FREE", detail: "Clean safe formulas." },
      { title: "NO HARSH BLEACH", detail: "Zero toxic whitening chemicals." },
      { title: "CRUELTY FREE", detail: "100% cruelty-free formulation." },
      { title: "DOUBLE VALUE", detail: "Two full jars at wholesale direct discount." },
    ],
    ingredients: "Refer to primary Rugby White 10 Days Challenge formula for complete botanical actives list.",
    keyActives: [
      { name: "Dual Pack Supply", purpose: "Sustained night routine for 30+ days of transformative care." }
    ],
    howToUse: "Apply nightly after cleansing. Continue nightly usage through both jars for compounded radiance.",
    shippingInfo: "Complimentary Priority Express Shipping across India + Cash on Delivery."
  },
  {
    id: "rugby-white-wholesale-pack-5",
    slug: "wholesale-entry-pack-5",
    name: "WHOLESALE ENTRY PACK (PACK OF 5)",
    subtitle: "5x Full Size 10 Days Challenge Jars",
    category: "Wholesale & Bundles",
    price: 2250,
    originalPrice: 4000,
    netWeight: "5x 65 g Jars",
    rating: 4.9,
    reviewCount: 96,
    inStock: true,
    badge: "WHOLESALE PACK",
    badgeColor: "gold",
    shortDescription:
      "Ideal starter pack for salons, boutiques, and reseller partners. Just ₹450 per jar with massive retail margin.",
    fullDescription:
      "Enter the lucrative skincare market with the official Rugby White Wholesale Entry Pack. Contains 5 brand-new, tamper-sealed 10 Days Challenge jars ready for retail resale or salon client treatments. Guaranteed fast turnover backed by strong brand demand across India.",
    images: [
      "/images/rugby-skin-revival.jpg",
      "/images/instagram/DXqFYBckZEu.jpg",
      "/images/instagram/DcK0UwPRNUE.jpg",
    ],
    benefits: [
      { number: "01", title: "HUGE MARGIN", description: "Resell at MRP ₹1,200 for up to 160% retail profit." },
      { number: "02", title: "TAMPER SEALED", description: "Individual retail boxes ready for immediate client sale." },
      { number: "03", title: "PRIORITY DISPATCH", description: "Shipped via air express with real-time tracking." },
    ],
    ritualSteps: [
      {
        step: "SALON RITUAL",
        title: "CLIENT APPLICATION",
        instruction: "Recommended for post-facial brightening and glow finishing treatment.",
        image: "/images/instagram/DXqFYBckZEu.jpg",
      },
    ],
    purityPillars: [
      { title: "GENUINE STOCK", detail: "100% authentic directly from Rugby White manufacturer." },
      { title: "PARABEN FREE", detail: "Safe for all salon client skin types." },
      { title: "HIGH REPEAT", detail: "High customer retention rate due to quick 10-day results." },
      { title: "BUSINESS SUPPORT", detail: "Access to marketing creatives and WhatsApp catalog support." },
    ],
    ingredients: "Official Rugby White 10 Days Challenge Botanical Formulation.",
    keyActives: [
      { name: "Wholesale Distribution", purpose: "5 fresh jars at direct B2B pricing." }
    ],
    howToUse: "Retail to clients seeking blemish and sun tan solutions, or apply as a finishing cream in salon services.",
    shippingInfo: "Free Priority Pan-India Logistics. COD or Prepaid UPI accepted."
  },
  {
    id: "rugby-white-wholesale-pack-10",
    slug: "high-volume-pack-10",
    name: "HIGH VOLUME PACK (PACK OF 10)",
    subtitle: "10x Full Size 10 Days Challenge Jars",
    category: "Wholesale & Bundles",
    price: 4200,
    originalPrice: 8000,
    netWeight: "10x 65 g Jars",
    rating: 5.0,
    reviewCount: 64,
    inStock: true,
    badge: "SAVE 48%",
    badgeColor: "green",
    shortDescription:
      "Our best value wholesale bundle. Just ₹420 per jar for beauty parlours, aesthetic clinics, and bulk resellers.",
    fullDescription:
      "Maximize your business profits with our High Volume 10-Pack. Designed specifically for active beauty parlours, bridal makeup artists, aesthetic centers, and regional distributors. Every jar delivers consistent 10-day glowing satisfaction.",
    images: [
      "/images/rugby-skin-revival.jpg",
      "/images/instagram/DXqFYBckZEu.jpg",
      "/images/instagram/DcK0UwPRNUE.jpg",
    ],
    benefits: [
      { number: "01", title: "BEST UNIT RATE", description: "Lowest price per unit across India at just ₹420/jar." },
      { number: "02", title: "HIGH VOLUME ROI", description: "Turn ₹4,200 into ₹12,000+ retail value." },
      { number: "03", title: "FREE VIP SHIPPING", description: "Insured express delivery directly to your clinic or doorstep." },
    ],
    ritualSteps: [
      {
        step: "WHOLESALE",
        title: "BULK ORDER",
        instruction: "Track and manage inventory with official batch codes and fresh expiry dates.",
        image: "/images/rugby-skin-revival.jpg",
      },
    ],
    purityPillars: [
      { title: "LAB CERTIFIED", detail: "Strict quality control batches." },
      { title: "FRESH BATCH", detail: "Directly from current production line." },
      { title: "ZERO DAMAGE", detail: "Reinforced double-walled carton packaging." },
      { title: "WHATSAPP VIP", detail: "Dedicated relationship manager for reorders." },
    ],
    ingredients: "Official Rugby White 10 Days Challenge Botanical Formulation.",
    keyActives: [
      { name: "Bulk Reseller Tier", purpose: "10 full units with guaranteed freshness and maximum margin." }
    ],
    howToUse: "Recommend to clients for daily evening skincare routines and bridal glow preparations.",
    shippingInfo: "Complimentary Insured Air Express Cargo across all Indian pin codes."
  },
  {
    id: "rugby-white-hand-whitening-cream",
    slug: "hand-whitening-cream",
    name: "RUGBY WHITE HAND WHITENING CREAM",
    subtitle: "Dubai Formulation Deep Tanning & Spot Repair",
    category: "Hand & Body Care",
    price: 499,
    originalPrice: 799,
    netWeight: "30 ml",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    badge: "DUBAI IMPORT",
    badgeColor: "gold",
    shortDescription:
      "Specialized hand whitening & knuckle lightening cream. Formulated in UAE to eliminate stubborn hand tanning, dark knuckles, and sun spots.",
    fullDescription:
      "Glow starts with your hands. Sun exposure, driving, and hard water often leave hands deeply tanned with darkened knuckles. Rugby White Hand Whitening Cream is our specialized Dubai-mixing formula designed specifically for tough hand skin, rapidly fading pigmentation and leaving hands soft, bright, and unified.",
    images: [
      "/images/instagram/DT-8pRRkk_1.jpg",
      "/images/instagram/DU8ExFUEXwt.jpg",
    ],
    benefits: [
      { number: "01", title: "FADES DARK KNUCKLES", description: "Targeted action for tough knuckle pigmentation." },
      { number: "02", title: "REMOVES DRIVING TAN", description: "Clears deep sun damage from hands and wrists." },
      { number: "03", title: "VELVETY SOFTNESS", description: "Nourishes dry cuticle skin with deep botanical butters." },
    ],
    ritualSteps: [
      {
        step: "HAND RITUAL",
        title: "MASSAGE OVER HANDS",
        instruction: "Apply a small dot over knuckles and back of hands before sleeping.",
        image: "/images/instagram/DT-8pRRkk_1.jpg",
      },
    ],
    purityPillars: [
      { title: "MADE IN UAE", detail: "Imported Dubai mixing formulation." },
      { title: "FAST ABSORBING", detail: "Non-sticky, leaves no residue on linens." },
      { title: "CONCENTRATED", detail: "Small amount covers both hands completely." },
      { title: "DERMATOLOGY TESTED", detail: "Safe for daily use." },
    ],
    ingredients: "Aqua, Shea Butter, Niacinamide, Licorice Root Extract, Alpha Arbutin, Glyceryl Stearate, Glycerin, Tocopherol.",
    keyActives: [
      { name: "Licorice & Arbutin", purpose: "Proven brightening agents for stubborn knuckle melanin deposits." },
      { name: "Pure Shea Butter", purpose: "Intense moisture that keeps skin elastic and smooth." }
    ],
    howToUse: "Apply a small amount to clean hands every night. Pay special attention to knuckles and tanned zones.",
    shippingInfo: "Dispatched within 24 hours. Cash On Delivery available."
  }
];

export const flagshipProduct = products[0];
