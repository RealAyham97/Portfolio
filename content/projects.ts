export type ProjectStatus = "deployed" | "in-progress" | "shipped";

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
    image: "/projects/palantir.png",
  },
  {
    slug: "ecompanio",
    title: "Ecompanio.com",
    status: "deployed",
    summary: "AI-driven ATS testing tool startup currently running LinkedIn ad campaigns.",
    description:
      "Co-founded an AI-driven ATS testing platform. Currently scaling acquisition through LinkedIn campaigns; planning supervised feedback loop on resume parsing accuracy.",
    stack: ["Python", "Jira", "Figma", "LinkedIn Ads"],
    image: "/projects/ecompanio.png",
    links: { live: "https://ecompanio.com" },
  },
  {
    slug: "crm-erp",
    title: "CRM / ERP Application",
    status: "in-progress",
    summary: "Local-business automation suite covering inventory, sales, and HR.",
    description:
      "Discovery + interface design phase for a Jordan-based SMB. Inventory ledger, sales pipeline, and HR workflows in one console; pursuing low operational overhead via static front-end + serverless functions.",
    stack: ["Figma", "Confluence", "SQL"],
    image: "/projects/crm-erp.png",
  },
  {
    slug: "churn-model",
    title: "Churn Prediction Model",
    status: "in-progress",
    summary: "SaaS customer churn predictor with Power BI activation surface.",
    description:
      "Feature engineering on usage telemetry and billing events; gradient-boosted classifier with calibrated probability output; Power BI scorecard for CS team triage.",
    stack: ["Python", "Scikit-learn", "Power BI"],
    image: "/projects/churn-model.png",
  },
];
