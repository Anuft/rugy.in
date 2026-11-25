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
    id: "rugby-white-night-cream",
    slug: "rugby-white-night-cream",
    name: "RUGBY WHITE NIGHT CREAM",
    subtitle: "Radiance Nourishing Night Ritual Cream",
    category: "Night Cream",
    price: 599,
    originalPrice: 1200,
    netWeight: "35 g / 1.23 oz.",
    rating: 4.9,
    reviewCount: 328,
    inStock: true,
    isFlagship: true,
    badge: "SIGNATURE NIGHT CREAM",
    badgeColor: "red",
    shortDescription:
      "Signature radiance nourishing night cream. Brightens dull tone, fades dark spots, and restores glass-skin radiance.",
    fullDescription:
      "Crafted with pure botanicals, niacinamide, and deep moisture actives, Rugby White works overnight to clear sun tanning, calm blemishes, and reveal visibly luminous, unified skin.",
    images: [
      "/images/rugby-skin-revival.jpg",
      "/images/rugby-skin-revival-jar.png",
      "/images/instagram/DX-90AVkTAS.jpg",
      "/images/instagram/DZSAtQIxL-y.jpg",
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
        image: "/images/instagram/DX6C8-Skat0.jpg",
      },
      {
        step: "02. APPLY",
        title: "PEA-SIZED AMOUNT",
        instruction: "Warm a pea-sized amount on fingertips.",
        image: "/images/rugby-skin-revival.jpg",
      },
      {
        step: "03. EMBRACE",
        title: "GENTLE MASSAGE",
        instruction: "Massage gently in upward circular motions until absorbed.",
        image: "/images/instagram/DX-90AVkTAS.jpg",
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
      "Complimentary Express Pan-India Air Delivery. Dispatched within 24 hours.",
  },
];

export const flagshipProduct = products[0];
