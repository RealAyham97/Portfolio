export type Kpi = { value: number; suffix?: string; prefix?: string; label: string };

export const numbers: Kpi[] = [
  { value: 5, suffix: "+", label: "Years in data" },
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 4, label: "Industries served" },
  { value: 200, prefix: "$", suffix: "K", label: "Est. annual savings (Palantir)" },
];

export const numbersCaption = "Verified figures from shipped engagements.";
