export type Kpi = { value: number; suffix?: string; prefix?: string; label: string };

export const numbers: Kpi[] = [
  { value: 6, suffix: "+", label: "Years of experience" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 5, label: "Industries" },
  { value: 200, prefix: "$", suffix: "K", label: "Est. annual savings (Palantir)" },
];
