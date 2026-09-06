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
