export type IconName =
  | "calendar"
  | "clock"
  | "location"
  | "investment"
  | "users"
  | "building"
  | "landmark"
  | "briefcase"
  | "globe"
  | "workspace"
  | "trending";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SummaryItem {
  label: string;
  value: string;
  icon: IconName;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SnapshotItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface JourneyStep {
  week: string;
  title: string;
  description: string;
}

export interface Benefit {
  eyebrow: string;
  title: string;
  accent: string;
  bullets: string[];
  image: string;
  fallback: string;
  alt: string;
  imageFirst: boolean;
  width: number;
  height: number;
}

export interface Partner {
  name: string;
  image: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
}

export interface LandingContent {
  brand: {
    name: string;
    poweredBy: string;
    mark: string;
    markFallback: string;
  };
  navigation: NavigationItem[];
  applyLabel: string;
  applyHref: string;
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    storyLabel: string;
    storyHref: string;
    summaryTitle: string;
    summaryMeta: string;
    version: string;
    summaryItems: SummaryItem[];
    cohortLabel: string;
    cohortValue: string;
    knowMoreLabel: string;
    knowMoreHref: string;
    metrics: Metric[];
  };
  origin: {
    label: string;
    titleStart: string;
    titleAccent: string;
    meta: string;
    paragraphs: string[];
    emphasized: string[];
    image: string;
    fallback: string;
    alt: string;
    width: number;
    height: number;
  };
  snapshot: {
    label: string;
    titleStart: string;
    titleAccent: string;
    items: SnapshotItem[];
    marketLabel: string;
    marketTitle: string;
    mapImage: string;
    mapFallback: string;
    mapAlt: string;
    mapWidth: number;
    mapHeight: number;
    visionTitle: string;
    visionDescription: string;
    sectors: string[];
  };
  journey: {
    label: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    steps: JourneyStep[];
  };
  benefits: {
    label: string;
    titleStart: string;
    titleAccent: string;
    items: Benefit[];
  };
  cohort: {
    label: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    names: string[];
    image: string;
    fallback: string;
    alt: string;
    width: number;
    height: number;
  };
  partners: {
    label: string;
    titleStart: string;
    titleAccent: string;
    items: Partner[];
  };
  finalCta: {
    label: string;
    titleStart: string;
    titleAccent: string;
    descriptionLines: string[];
    briefLabel: string;
    briefHref: string;
  };
  footer: {
    poweredBy: string;
    navigation: NavigationItem[];
    copyright: string;
  };
}

const assetRoot = "/assets/landing";

export const landingContent: LandingContent = {
  brand: {
    name: "Arabian Accelerator",
    poweredBy: "Powered by India Accelerator",
    mark: `${assetRoot}/brand-mark.webp`,
    markFallback: `${assetRoot}/brand-mark.png`,
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "The Journey", href: "#journey" },
    { label: "For Founders", href: "#founders" },
    { label: "KSA Ecosystem", href: "#ecosystem" },
  ],
  applyLabel: "Apply Now",
  applyHref: "/apply",
  hero: {
    eyebrow: "Cohort 01 · Applications Open",
    titleStart: "Expand into",
    titleAccent: "Saudi Arabia.",
    description:
      "A 6-month soft-landing program for Indian startups entering the Kingdom — mentorship, market access, and capital in one runway.",
    storyLabel: "Watch the story",
    storyHref: "#about",
    summaryTitle: "Program Summary",
    summaryMeta: "Cohort 01 · Riyadh",
    version: "V. 2026",
    summaryItems: [
      { label: "Dates", value: "8 Dec 2025 →\n28 Feb 2026", icon: "calendar" },
      { label: "Duration", value: "6 Months\nintensive", icon: "clock" },
      { label: "Format", value: "Hybrid · Riyadh\n+ Remote", icon: "location" },
      { label: "Investment", value: "$15M fund pool", icon: "investment" },
    ],
    cohortLabel: "Cohort Composition",
    cohortValue: "10 Early → Growth-stage Indian startups",
    knowMoreLabel: "Know More",
    knowMoreHref: "#about",
    metrics: [
      { value: "$15M", label: "Target fund pool" },
      { value: "10", label: "Startups selected" },
      { value: "6 mo", label: "Program length" },
      { value: "150+", label: "Network members" },
    ],
  },
  origin: {
    label: "Start of the journey",
    titleStart: "How it",
    titleAccent: "began.",
    meta: "Riyadh · 2025",
    paragraphs: [
      "Arabian Accelerator, powered by India Accelerator and NTDP — a national program contributing to the Kingdom's technology ecosystem — empowers Indian startup founders building in",
      "with funding, mentorship and market access to scale beyond borders.",
    ],
    emphasized: [
      "Artificial Intelligence",
      "Sustainability",
      "Electric Mobility",
      "PropTech",
      "DeepTech",
    ],
    image: `${assetRoot}/origin-art.webp`,
    fallback: `${assetRoot}/origin-art.png`,
    alt: "Abstract figures representing India Accelerator and NTDP founders",
    width: 1100,
    height: 770,
  },
  snapshot: {
    label: "The roadmap",
    titleStart: "Program",
    titleAccent: "Snapshot.",
    items: [
      { title: "Access to 150+ Members", description: "Founders, mentors, operators and enablers across the network.", icon: "users" },
      { title: "Soft Landing & Entity Setup", description: "Legal, banking and licensing support to operate in the Kingdom.", icon: "building" },
      { title: "Direct Access to Government", description: "Warm intros to the ministries and public entities that matter.", icon: "landmark" },
      { title: "Corporate Pilots", description: "Structured POCs with regional anchor enterprises across sectors.", icon: "briefcase" },
      { title: "Access to Local Experts", description: "Domain specialists in AI, EV, PropTech, DeepTech and Sustainability.", icon: "globe" },
      { title: "Workspace + Execution", description: "Dedicated pods in Riyadh plus on-ground operator support.", icon: "workspace" },
      { title: "GCC Entry Pathway", description: "A launchpad into UAE, Bahrain, Qatar and the wider GCC.", icon: "trending" },
    ],
    marketLabel: "Target market",
    marketTitle: "The Kingdom of Saudi Arabia",
    mapImage: `${assetRoot}/saudi-map.webp`,
    mapFallback: `${assetRoot}/saudi-map.png`,
    mapAlt: "Saudi Arabia market map highlighting Riyadh, Jeddah, Neom, and Dammam",
    mapWidth: 766,
    mapHeight: 650,
    visionTitle: "Vision 2030",
    visionDescription: "Aligned with KSA's national transformation agenda across digital, sustainability and mobility sectors.",
    sectors: ["AI", "EV", "PropTech", "DeepTech", "Sustainability"],
  },
  journey: {
    label: "The roadmap",
    titleStart: "Program",
    titleAccent: "Journey.",
    description:
      "Twenty-two weeks from selection to demo day — a structured runway from pre-launch validation through capacity building, market enablement and graduation.",
    steps: [
      { week: "Week 0", title: "Pre-Launch", description: "Selection, onboarding, founder diagnostics and cohort orientation." },
      { week: "Week 1", title: "Program Launch", description: "Kick-off in Riyadh — mentor pairing, workspace access, ecosystem intros." },
      { week: "Week 2 → 4", title: "Capacity Building", description: "Deep-dives on GTM, regulatory, hiring, product-market fit for the region." },
      { week: "Week 5 → 18", title: "Market Enablement", description: "Corporate pilots, ministry intros, investor meetings, LEAP showcase." },
      { week: "Week 19 → 22", title: "Graduation & Demo Day", description: "Term sheets, follow-on rounds, GCC expansion planning, demo day." },
    ],
  },
  benefits: {
    label: "The value",
    titleStart: "What's in it for",
    titleAccent: "founders.",
    items: [
      {
        eyebrow: "Mentorship",
        title: "Hands-on mentorship from",
        accent: "operators who've done it.",
        bullets: ["1:1 mentor pairing across GTM, regulatory, product", "Weekly office hours with regional operators", "Founder-to-founder peer circles"],
        image: `${assetRoot}/mentorship-art.webp`, fallback: `${assetRoot}/mentorship-art.png`,
        alt: "Two founders in a mentorship session", imageFirst: true, width: 1028, height: 830,
      },
      {
        eyebrow: "B2B / B2G engagements",
        title: "Warm intros to",
        accent: "corporates and government.",
        bullets: ["Curated intros to anchor enterprises", "Structured POC frameworks with ministries", "Procurement fast-track pathways"],
        image: `${assetRoot}/engagement-art.webp`, fallback: `${assetRoot}/engagement-art.png`,
        alt: "Corporate and government engagement illustration", imageFirst: false, width: 1034, height: 920,
      },
      {
        eyebrow: "Showcase",
        title: "Showcase at LEAP,",
        accent: "the region's largest tech stage.",
        bullets: ["Dedicated cohort pavilion at LEAP", "Curated investor & media meetings", "Dedicated pods and demo booths"],
        image: `${assetRoot}/showcase-art.webp`, fallback: `${assetRoot}/showcase-art.png`,
        alt: "LEAP 2026 showcase stage illustration", imageFirst: true, width: 1028, height: 830,
      },
      {
        eyebrow: "Investment opportunities",
        title: "Access to a",
        accent: "$15M target fund pool.",
        bullets: ["Pre-committed cheques from regional VCs", "Family office & sovereign co-invest", "Follow-on into Series A rounds"],
        image: `${assetRoot}/fund-art.webp`, fallback: `${assetRoot}/fund-art.png`,
        alt: "$15M target fund pool illustration", imageFirst: false, width: 1034, height: 890,
      },
    ],
  },
  cohort: {
    label: "Our cohort",
    titleStart: "Selected",
    titleAccent: "cohort.",
    description: "Ten early-to-growth stage startups, hand-picked across Artificial Intelligence, Sustainability, Electric Mobility, PropTech and DeepTech.",
    names: ["SATSURE", "INDRAJAAL", "CTRUH", "AquaAirX", "CONSTEMS-AI", "LivNSense"],
    image: `${assetRoot}/cohort-strip.webp`, fallback: `${assetRoot}/cohort-strip.png`,
    alt: "Selected cohort: SATSURE, INDRAJAAL, CTRUH, AquaAirX, CONSTEMS-AI, and LivNSense",
    width: 2880,
    height: 380,
  },
  partners: {
    label: "Supported by",
    titleStart: "Special thanks to our",
    titleAccent: "partners.",
    items: [
      { name: "NTDP National Program", image: `${assetRoot}/partner-ntdp-program.webp`, fallback: `${assetRoot}/partner-ntdp-program.png`, alt: "National Technology Development Program — National Program", width: 752, height: 432 },
      { name: "NTDP Accelerator Partner", image: `${assetRoot}/partner-ntdp-accelerator.webp`, fallback: `${assetRoot}/partner-ntdp-accelerator.png`, alt: "NTDP Empowering Accelerators — Accelerator Partner", width: 752, height: 432 },
      { name: "Ministry of Investment", image: `${assetRoot}/partner-misa.webp`, fallback: `${assetRoot}/partner-misa.png`, alt: "Saudi Ministry of Investment — Government Partner", width: 752, height: 432 },
    ],
  },
  finalCta: {
    label: "Cohort 01 · Applications close 30 Nov 2025",
    titleStart: "Ready to expand",
    titleAccent: "beyond borders?",
    descriptionLines: [
      "Ten seats. Six months. One runway into the Kingdom and the wider GCC.",
      "If you're building in AI, EV, PropTech, DeepTech or Sustainability — we want to hear from you.",
    ],
    briefLabel: "Download the Program Brief",
    briefHref: "/assets/landing/arabian-accelerator-program-brief.pdf",
  },
  footer: {
    poweredBy: "Powered by India Accelerator × NTDP",
    navigation: [
      { label: "About", href: "#about" },
      { label: "Journey", href: "#journey" },
      { label: "Founders", href: "#founders" },
      { label: "Cohort", href: "#cohort" },
      { label: "Apply", href: "/apply" },
    ],
    copyright: "© 2026 · Riyadh · New Delhi",
  },
};
