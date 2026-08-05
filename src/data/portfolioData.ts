import assetsData from './assetsData.json';

export interface PortfolioCategory {
  _id?: string;
  category: string; // original folder name
  title: string;     // user-friendly title
  desc: string;      // description of work
  images: string[];  // array of image paths
  coverImage: string; // main thumbnail image
  tagClass: string;
  hoverClass: string;
  textClass: string;
  sizeClass?: string; // for Portfolio bento grid styling
  filterGroup: string;
  filterLabel: string;
  lqip?: string;
}

const metadataMap: Record<string, {
  title: string;
  desc: string;
  tagClass: string;
  hoverClass: string;
  textClass: string;
  sizeClass?: string;
  filterGroup: 'signs' | 'printing' | 'gifts' | 'other';
  filterLabel: string;
}> = {
  "3d model": {
    title: "3D Models & Signages",
    desc: "Precision 3D modeling and structural mockups for complex visual projects.",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    sizeClass: "bentoWide",
    filterGroup: "other",
    filterLabel: "Specialized"
  },
  "acrylic": {
    title: "Acrylic Signs & Logos",
    desc: "Premium laser-cut acrylic logo signages with polished glassmorphic finishes.",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    sizeClass: "bentoLarge",
    filterGroup: "signs",
    filterLabel: "Sign Boards & Acrylic"
  },
  "batches": {
    title: "Custom Badges",
    desc: "Metallic, acrylic, and button badges for corporate identification and events.",
    tagClass: "tagPurple",
    hoverClass: "purpleHover",
    textClass: "purpleText",
    filterGroup: "gifts",
    filterLabel: "Corporate Gifting"
  },
  "digital": {
    title: "Digital Printing",
    desc: "High-resolution wide-format and commercial prints on premium media.",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    filterGroup: "printing",
    filterLabel: "Branding & Printing"
  },
  "DTF PRINTING": {
    title: "DTF Printing",
    desc: "Direct-to-Film transfer printing for vivid, stretch-resistant apparel graphics.",
    tagClass: "tagPurple",
    hoverClass: "purpleHover",
    textClass: "purpleText",
    filterGroup: "printing",
    filterLabel: "Branding & Printing"
  },
  "facade and channel board": {
    title: "Facade & Channel Boards",
    desc: "Architectural storefront frontages and illuminated 3D channel letters.",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    sizeClass: "bentoLarge",
    filterGroup: "signs",
    filterLabel: "Sign Boards & Acrylic"
  },
  "frames": {
    title: "Custom Photo Frames",
    desc: "Bespoke framing solutions for corporate awards, artwork, and portraits.",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    filterGroup: "other",
    filterLabel: "Specialized"
  },
  "hoarding": {
    title: "Hoardings & Billboards",
    desc: "Massive outdoor advertising billboards and safety construction hoardings.",
    tagClass: "tagPurple",
    hoverClass: "purpleHover",
    textClass: "purpleText",
    sizeClass: "bentoWide",
    filterGroup: "printing",
    filterLabel: "Branding & Printing"
  },
  "key chain": {
    title: "Custom Keychains",
    desc: "Laser-cut acrylic and engraved metal keyrings for promotional giveaways.",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    filterGroup: "gifts",
    filterLabel: "Corporate Gifting"
  },
  "mug": {
    title: "Mug Printing",
    desc: "High-grade sublimation print coffee mugs for office merchandise and gifting.",
    tagClass: "tagPurple",
    hoverClass: "purpleHover",
    textClass: "purpleText",
    filterGroup: "gifts",
    filterLabel: "Corporate Gifting"
  },
  "packading": {
    title: "Custom Packaging",
    desc: "Tailored brand packaging boxes, product pouches, and luxury bags.",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    sizeClass: "bentoWide",
    filterGroup: "printing",
    filterLabel: "Branding & Printing"
  },
  "qr sanner": {
    title: "QR Code Standees",
    desc: "Branded acrylic payment standees and digital desk directories.",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    filterGroup: "other",
    filterLabel: "Specialized"
  },
  "sign boards": {
    title: "Sign Boards",
    desc: "Custom directionals, safety hazard signs, and promotional display panels.",
    tagClass: "tagCyan",
    hoverClass: "cyanHover",
    textClass: "cyanText",
    sizeClass: "bentoTall",
    filterGroup: "signs",
    filterLabel: "Sign Boards & Acrylic"
  },
  "trophy": {
    title: "Trophies & Awards",
    desc: "Precision engraved glass, acrylic, and wood trophies for corporate milestones.",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    filterGroup: "gifts",
    filterLabel: "Corporate Gifting"
  },
  "tshirts": {
    title: "T-Shirt & Apparel",
    desc: "Custom corporate uniforms, hoodies, and event t-shirts with high-quality printing.",
    tagClass: "tagPurple",
    hoverClass: "purpleHover",
    textClass: "purpleText",
    sizeClass: "bentoTall",
    filterGroup: "printing",
    filterLabel: "Branding & Printing"
  },
  "wood engraving": {
    title: "Wood Engraving",
    desc: "Laser precision etching on organic wood surfaces for logos and signage.",
    tagClass: "tagOrange",
    hoverClass: "orangeHover",
    textClass: "orangeText",
    filterGroup: "other",
    filterLabel: "Specialized"
  }
};

// Filter out categories with 0 images
export const portfolioData: PortfolioCategory[] = assetsData
  .filter(item => item.images.length > 0 && metadataMap[item.category])
  .map(item => {
    const meta = metadataMap[item.category];
    return {
      category: item.category,
      title: meta.title,
      desc: meta.desc,
      images: item.images,
      // Select the first image as the cover, or a specific one if needed
      coverImage: item.images[0],
      tagClass: meta.tagClass,
      hoverClass: meta.hoverClass,
      textClass: meta.textClass,
      sizeClass: meta.sizeClass,
      filterGroup: meta.filterGroup,
      filterLabel: meta.filterLabel
    };
  });

// Retrieve a list of active filter tabs dynamically based on the active groups
export const getActiveFilters = () => {
  const filterMap = new Map<string, string>();
  portfolioData.forEach(item => {
    if (item.filterGroup && item.filterGroup !== 'all') {
      filterMap.set(item.filterGroup, item.filterLabel);
    }
  });

  const defaultOrder = ['signs', 'printing', 'gifts', 'other'];
  const orderedFilters: { value: string; label: string }[] = [
    { value: 'all', label: 'All Work' }
  ];

  defaultOrder.forEach(key => {
    if (filterMap.has(key)) {
      orderedFilters.push({ value: key, label: filterMap.get(key)! });
      filterMap.delete(key);
    }
  });

  filterMap.forEach((label, value) => {
    orderedFilters.push({ value, label });
  });

  return orderedFilters;
};
