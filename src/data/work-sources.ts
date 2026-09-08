import { LUXURY_PRICE_SOURCE } from "./luxury";
import { OLIST_DATA_SOURCES } from "./olist";

export const WORK_SOURCES: Record<
  string,
  readonly { label: string; href: string; note: string }[]
> = {
  "luxury-handbag-pricing-architecture": [
    {
      label: "Brand price summary",
      href: LUXURY_PRICE_SOURCE,
      note: "Canonical calculation output; the figures below use the curated Home snapshot.",
    },
    {
      label: "Research repository",
      href: "https://github.com/gabriel232ch/luxury-handbag-price-architecture",
      note: "Underlying report, data and reproducible analysis. The source project may continue to evolve.",
    },
  ],
  "olist-marketplace-analysis": [
    {
      label: "Executive KPIs",
      href: OLIST_DATA_SOURCES.executiveKpis,
      note: "Source of the curated operating metrics.",
    },
    {
      label: "Analysis and decision framework",
      href: OLIST_DATA_SOURCES.readme,
      note: "Project overview and the interpretation behind the four decision portfolios.",
    },
  ],
  "competitive-positioning-against-giants": [
    {
      label: "Comparative research archive",
      href: "https://github.com/gabriel232ch/small-high-impact-companies/tree/main/06_outputs/portfolio_analysis.md",
      note: "Private repository — access required. This page retains only the already-curated portfolio summary, not the private case files.",
    },
  ],
};
