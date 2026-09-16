export interface LuxuryPriceSummary {
  brand: 'CHANEL' | 'Hermès' | 'Louis Vuitton' | 'Dior';
  market: 'FR' | 'US';
  currency: 'EUR' | 'USD';
  numericObservations: number;
  minimum: number;
  lowerQuartile: number;
  median: number;
  upperQuartile: number;
  maximum: number;
}

export interface LuxuryArchitectureEndpoint {
  market: 'FR' | 'US';
  name: string;
  currency: 'EUR' | 'USD';
  minimum: number;
  preIcon: number;
  icon: number;
  maximum: number;
  observationNote: string;
}

/**
 * Public portfolio facts from the R1 release of the canonical repository.
 * Keep the evidence boundary visible: these are observed endpoints and
 * reported business signals, not causal estimates.
 */
export const LUXURY_FLAGSHIP = {
  release: {
    label: 'R1 portfolio release',
    date: '14 SEP 2026',
    commit: 'b59f90e',
    commitUrl:
      'https://github.com/gabriel232ch/luxury-handbag-price-architecture/commit/b59f90e9a4b34bcbf81eb626935396899982c832',
  },
  snapshot: {
    year: '2026',
    capturedAt: '2026-08-15',
    acceptedObservations: 41,
    numericPrices: 35,
    financialWindow: 'FY2020–FY2025',
  },
  architecture: [
    {
      market: 'FR',
      name: 'France',
      currency: 'EUR',
      minimum: 4850,
      preIcon: 6700,
      icon: 10000,
      maximum: 12250,
      observationNote: 'Largest visible pre-icon → icon gap: €3,300',
    },
    {
      market: 'US',
      name: 'United States',
      currency: 'USD',
      minimum: 5400,
      preIcon: 7400,
      icon: 11000,
      maximum: 13500,
      observationNote: 'Largest visible pre-icon → icon gap: $3,600',
    },
  ] satisfies readonly LuxuryArchitectureEndpoint[],
  historical: {
    period: '2022–2026 aligned Chanel France lines',
    miniShift: 16.5,
    classicShift: 18.1,
    ratioFrom: 2.052,
    ratioTo: 2.081,
    gapFrom: 4470,
    gapTo: 5350,
  },
  financial: {
    period: 'Chanel consolidated / FY2020–FY2025',
    revenueCagr: 13.8,
    marginFrom: 20.0,
    marginTo: 24.5,
    shockYear: '2024',
    comparableGrowth: -4.3,
    operatingProfit: -30.1,
    fcfChange: -50.9,
    reboundYear: '2025',
    reboundFcf: 43.6,
    brandSupportRange: '11.5–13.5% of revenue',
  },
} as const;

export const LUXURY_FLAGSHIP_SOURCES = {
  readme: 'https://github.com/gabriel232ch/luxury-handbag-price-architecture',
  report:
    'https://github.com/gabriel232ch/luxury-handbag-price-architecture/blob/main/FINAL_LUXURY_HANDBAG_PRICING_STRATEGY_CN.md',
  methodology:
    'https://github.com/gabriel232ch/luxury-handbag-price-architecture/blob/main/docs/METHODOLOGY_CN.md',
  validation:
    'https://github.com/gabriel232ch/luxury-handbag-price-architecture/blob/main/docs/VALIDATION.md',
  currentPanel:
    'https://github.com/gabriel232ch/luxury-handbag-price-architecture/tree/main/chanel_fr_us_handbags_current',
  financialPanel:
    'https://github.com/gabriel232ch/luxury-handbag-price-architecture/tree/main/financial_business_performance',
} as const;

/**
 * Curated verbatim from the canonical calculation output. This is a build-time
 * snapshot for the static Home; the source path remains visible in the UI.
 */
export const LUXURY_PRICE_SUMMARY: readonly LuxuryPriceSummary[] = [
  {
    brand: 'CHANEL',
    market: 'FR',
    currency: 'EUR',
    numericObservations: 17,
    minimum: 4850,
    lowerQuartile: 5800,
    median: 6500,
    upperQuartile: 10100,
    maximum: 12250,
  },
  {
    brand: 'Hermès',
    market: 'FR',
    currency: 'EUR',
    numericObservations: 20,
    minimum: 2170,
    lowerQuartile: 4125,
    median: 5500,
    upperQuartile: 6137.5,
    maximum: 9100,
  },
  {
    brand: 'Louis Vuitton',
    market: 'FR',
    currency: 'EUR',
    numericObservations: 20,
    minimum: 1800,
    lowerQuartile: 2350,
    median: 2800,
    upperQuartile: 3275,
    maximum: 3800,
  },
  {
    brand: 'Dior',
    market: 'FR',
    currency: 'EUR',
    numericObservations: 19,
    minimum: 3000,
    lowerQuartile: 3200,
    median: 3450,
    upperQuartile: 3650,
    maximum: 4500,
  },
  {
    brand: 'CHANEL',
    market: 'US',
    currency: 'USD',
    numericObservations: 18,
    minimum: 5400,
    lowerQuartile: 6350,
    median: 7100,
    upperQuartile: 11225,
    maximum: 13500,
  },
  {
    brand: 'Hermès',
    market: 'US',
    currency: 'USD',
    numericObservations: 20,
    minimum: 3075,
    lowerQuartile: 4700,
    median: 5500,
    upperQuartile: 7050,
    maximum: 13200,
  },
  {
    brand: 'Louis Vuitton',
    market: 'US',
    currency: 'USD',
    numericObservations: 20,
    minimum: 1950,
    lowerQuartile: 2225,
    median: 2480,
    upperQuartile: 2852.5,
    maximum: 4150,
  },
  {
    brand: 'Dior',
    market: 'US',
    currency: 'USD',
    numericObservations: 13,
    minimum: 3600,
    lowerQuartile: 3900,
    median: 4000,
    upperQuartile: 4400,
    maximum: 5200,
  },
];

export const LUXURY_PRICE_SOURCE =
  'https://github.com/gabriel232ch/luxury-handbag-price-architecture/blob/main/competitive_pricing_calculations/brand_price_summary.csv';
