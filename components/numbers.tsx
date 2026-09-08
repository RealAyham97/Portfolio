import { numbers } from "@/content/numbers";
import { KpiTile } from "./kpi-tile";

/**
 * Four-up ruled KPI band. Replaces the old carded grid; cells are separated by
 * rules rather than gaps, matching the ledger vocabulary. On mobile the band
 * halves to 2×2, so the right rule follows odd cells instead of every cell.
 */
export function Numbers() {
  return (
    <section id="numbers" className="grid grid-cols-2 lg:grid-cols-4">
      {numbers.map((n) => (
        <KpiTile
          key={n.label}
          {...n}
          className="border-b border-border odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
        />
      ))}
    </section>
  );
}
