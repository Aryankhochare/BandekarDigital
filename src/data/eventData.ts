export interface EventItem {
  _id?: string;
  title: string;
  client: string;
  date: string;
  location: string;
  desc: string;
  images: string[];
  coverImage: string;
  tagClass: string;
  hoverClass: string;
  textClass: string;
  lqip?: string;
  categoryGroup?: string;
  categoryLabel?: string;
}

export const eventData: EventItem[] = [
  {
    title: "Sunburn Festival Goa",
    client: "Percept Live",
    date: "December 2025",
    location: "Vagator, Goa",
    desc: "Engineered and fabricated all major outdoor branding installations, including massive structural entry arches, luminous neon photo-op booths, stage backdrop signages, and glowing sponsor pavilions.",
    images: ["/Assets/events/sunburn.png"],
    coverImage: "/Assets/events/sunburn.png",
    tagClass: "tagPurple",
    hoverClass: "purpleHover",
    textClass: "purpleText",
    categoryGroup: "festivals",
    categoryLabel: "Festivals & Concerts"
  },
  {
    title: "Tech Summit & Expo",
    client: "Goa Technology Association",
    date: "February 2026",
    location: "Grand Hyatt, Bambolim",
    desc: "Designed and assembled sleek corporate exhibition spaces. Built double-sided backlit fabric backdrops, glassmorphic acrylic registration desks, high-resolution rollups, and digital directional standees.",
    images: ["/Assets/events/expo.png"],
    coverImage: "/Assets/events/expo.png",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    categoryGroup: "corporate",
    categoryLabel: "Corporate & summits"
  },
  {
    title: "Goa Food & Cultural Festival",
    client: "Goa Tourism Department",
    date: "November 2025",
    location: "DB Bandodkar Ground, Panaji",
    desc: "Bespoke event identity installation. Manufactured custom wood-engraved stall signs, waterproof outdoor promotional boards, glowing pathway directional bollards, and VIP lounge wall brandings.",
    images: ["/Assets/events/food_fest.png"],
    coverImage: "/Assets/events/food_fest.png",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    categoryGroup: "culture",
    categoryLabel: "Culture & Exhibitions"
  },
  {
    title: "Corporate Golf Championship",
    client: "Deloitte India",
    date: "January 2026",
    location: "The Lalit Golf & Spa Resort, South Goa",
    desc: "End-to-end tournament branding setup. Crafted durable tee-box advertisement signage, premium gloss acrylic trophies, step-and-repeat media press backdrops, and weather-resistant sponsor flags.",
    images: ["/Assets/events/golf.png"],
    coverImage: "/Assets/events/golf.png",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    categoryGroup: "sports",
    categoryLabel: "Sports Events"
  }
];
