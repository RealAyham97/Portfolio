export type StackItem = { label: string; iconKey: string };
export type StackCategory = { name: string; items: StackItem[] };

export const stack: StackCategory[] = [
  {
    name: "Visualization",
    items: [
      { label: "Power BI", iconKey: "powerbi" },
      { label: "Advanced Excel", iconKey: "excel" },
      { label: "Power Query", iconKey: "powerquery" },
    ],
  },
  {
    name: "Programming",
    items: [
      { label: "Python", iconKey: "python" },
      { label: "SQL", iconKey: "sql" },
      { label: "Statistical Analysis", iconKey: "stats" },
      { label: "Cucumber", iconKey: "cucumber" },
    ],
  },
  {
    name: "Automation & Cloud",
    items: [
      { label: "Power Automate", iconKey: "powerautomate" },
      { label: "Microsoft Azure", iconKey: "azure" },
      { label: "Selenium", iconKey: "selenium" },
    ],
  },
  {
    name: "Tools",
    items: [
      { label: "Jira", iconKey: "jira" },
      { label: "Agile", iconKey: "agile" },
      { label: "Figma", iconKey: "figma" },
      { label: "SharePoint", iconKey: "sharepoint" },
      { label: "Miro", iconKey: "miro" },
      { label: "Slack", iconKey: "slack" },
      { label: "Canva", iconKey: "canva" },
      { label: "Visual Studio", iconKey: "vscode" },
    ],
  },
  {
    name: "Digital Marketing",
    items: [
      { label: "Google Analytics", iconKey: "analytics" },
      { label: "LinkedIn Ads", iconKey: "linkedin" },
      { label: "SEO", iconKey: "seo" },
      { label: "A/B Testing", iconKey: "abtesting" },
      { label: "Content Strategy", iconKey: "content" },
    ],
  },
];
