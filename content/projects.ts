export type ProjectStatus = "deployed" | "in-progress" | "shipped" | "early-stage";

export type Project = {
  slug: string;
  title: string;
  client?: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  stack: string[];
  metrics?: { label: string; value: string }[];
  image?: string;
  links?: { github?: string; live?: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "palantir-gargash",
    title: "Palantir (Next-Gen) Dashboard",
    client: "Gargash Enterprises",
    status: "shipped",
    featured: true,
    summary:
      "Collaborative dual-dashboard system with Palantir UK that tracks 3,500+ vehicles and 250+ properties across the Gargash group.",
    description:
      "Delivered with Palantir UK on Foundry. Unified telemetry from SecurePath and Navixy, surfaced operational KPIs in Power BI, and codified workflows in Jira. Estimated annual savings of ~$200K and 20–25% reduction in idle time.",
    stack: ["Palantir Foundry", "Power BI", "Figma", "Jira", "SecurePath", "Navixy"],
    metrics: [
      { label: "Annual savings", value: "~$200K" },
      { label: "Idle time reduction", value: "20–25%" },
      { label: "Vehicles tracked", value: "3,500+" },
      { label: "Properties tracked", value: "250+" },
    ],
    image: "/Main page.png",
  },
  {
    slug: "ecompanio",
    title: "Ecompanio.com",
    status: "deployed",
    summary: "AI-driven ATS testing tool startup currently running LinkedIn ad campaigns.",
    description:
      "Co-founded an AI-driven ATS testing platform. Currently scaling acquisition through LinkedIn campaigns; planning supervised feedback loop on resume parsing accuracy.",
    stack: ["Python", "Jira", "Figma", "LinkedIn Ads"],
    image: "/Ecompanio.png",
    links: { live: "https://ecompanio.com" },
  },
  {
    slug: "padel-score",
    title: "Padel Score",
    status: "in-progress",
    summary: "IoT wristband and app system for real-time padel scoring, from PCB design to business development.",
    description:
      "Came up with the idea and strategy, documented the infrastructure on Miro. Designed the wristband, screen, and app demo on Figma and Visual Code. Designed the PCB board for the wristband on Autodesk Fusion and met with vendors in Jordan and China. Defined a business methodology and met with Padel Arenas to build an initial client list.",
    stack: ["Figma", "Autodesk Fusion", "Miro", "Visual Code"],
    image: "/TBD.jpeg",
  },
  {
    slug: "blue-moon",
    title: "Blue Moon",
    status: "in-progress",
    summary: "Family-owned cloud kitchen venture targeting food delivery platforms across Amman.",
    description:
      "A family-owned business idea co-founded with my mother. Initially targeted businesses (coffee shops, restaurants) for daily and bi-weekly supply from home. Pivoted to a cloud kitchen model to sell on Talabat and other food delivery platforms, reaching end customers directly. Currently scouting for the optimal location in Amman to maximise delivery coverage.",
    stack: ["Business Strategy", "Talabat", "Cloud Kitchen"],
    image: "/Blue Moon.jpeg",
  },
  {
    slug: "crm-erp",
    title: "CRM / ERP Application",
    status: "early-stage",
    summary: "Local-business automation suite covering inventory, sales, and HR.",
    description:
      "Discovery + interface design phase for a Jordan-based SMB. Inventory ledger, sales pipeline, and HR workflows in one console; pursuing low operational overhead via static front-end + serverless functions.",
    stack: ["Figma", "Confluence", "SQL"],
    image: "/Daftara.webp",
  },
  {
    slug: "churn-model",
    title: "Churn Prediction Model",
    status: "early-stage",
    summary: "SaaS customer churn predictor with Power BI activation surface.",
    description:
      "Feature engineering on usage telemetry and billing events; gradient-boosted classifier with calibrated probability output; Power BI scorecard for CS team triage.",
    stack: ["Python", "Scikit-learn", "Power BI"],
    image: "/Churn Prediction Model.webp",
  },
];
