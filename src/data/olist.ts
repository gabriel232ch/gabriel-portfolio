export interface OlistComparisonMetric {
  id: 'gmv' | 'on-time';
  label: string;
  fromLabel: string;
  toLabel: string;
  fromValue: number;
  toValue: number;
  scaleMax: number;
  context: string;
  note: string;
}

export interface OlistFixMetric {
  id: 'fix';
  label: string;
  segments: number;
  orders: string;
  gmvExposure: string;
  lateOrders: string;
  context: string;
  note: string;
}

/** Summary observations used by the existing homepage Olist chapter. */
export const OLIST_DATA_METRICS: readonly (OlistComparisonMetric | OlistFixMetric)[] = [
  {
    id: 'gmv',
    label: 'Delivered GMV proxy',
    fromLabel: 'R$2.99M',
    toLabel: 'R$7.22M',
    fromValue: 2.99,
    toValue: 7.22,
    scaleMax: 7.22,
    context: 'JAN–AUG / 2017 → 2018',
    note: '+141.13% / 99.40% of change allocated to order volume',
  },
  {
    id: 'on-time',
    label: 'On-time delivery',
    fromLabel: '96.50%',
    toLabel: '92.27%',
    fromValue: 96.5,
    toValue: 92.27,
    scaleMax: 100,
    context: 'JAN–AUG / 2017 → 2018',
    note: 'Operating quality weakened as scale grew',
  },
  {
    id: 'fix',
    label: 'Fix before growth',
    segments: 6,
    orders: '2,920 orders',
    gmvExposure: 'R$409K GMV exposure',
    lateOrders: '405 late orders',
    context: 'MATERIAL MARKETS / PRIORITY PORTFOLIO',
    note: 'Six material markets qualify for Fix before growth',
  },
] as const;

export const OLIST_ANALYSIS = {
  growth: {
    periods: ['Jan–Aug 2017', 'Jan–Aug 2018'],
    gmv: ['R$2.99M', 'R$7.22M'],
    gmvWidths: [41.5, 100],
    orders: ['21,998', '52,783'],
    orderWidths: [41.7, 100],
    gmvChange: '+141.13%',
    orderChange: '+139.94%',
    decomposition: {
      orderVolume: '99.40%',
      aovMix: '0.60%',
      aovChange: '+0.49%',
    },
    service: [
      { label: 'On-time delivery', from: '96.50%', to: '92.27%', change: '−4.23 pp' },
      { label: 'Low-review rate', from: '10.59%', to: '13.37%', change: '+2.78 pp' },
    ],
  },
  fixPortfolio: {
    segments: 6,
    orders: '2,920',
    gmv: 'R$409,170.12',
    lateOrders: '405',
    markets: [
      { market: 'Watches & gifts × RJ', orders: '488', gmv: 'R$100,773.88', onTime: '86.68%', lowReview: '21.16%', late: '65' },
      { market: 'Bed & bath × RJ', orders: '646', gmv: 'R$66,362.41', onTime: '83.59%', lowReview: '23.58%', late: '106' },
      { market: 'Bed & bath × MG', orders: '554', gmv: 'R$64,342.58', onTime: '90.43%', lowReview: '19.23%', late: '53' },
      { market: 'Office furniture × SP', orders: '286', gmv: 'R$60,553.92', onTime: '93.01%', lowReview: '21.13%', late: '20' },
      { market: 'Sports & leisure × RJ', orders: '456', gmv: 'R$58,815.48', onTime: '81.36%', lowReview: '23.73%', late: '85' },
      { market: 'Computers & accessories × RJ', orders: '490', gmv: 'R$58,321.85', onTime: '84.49%', lowReview: '24.22%', late: '76' },
    ],
  },
  route: {
    name: 'SP → RJ',
    orders: '4,155',
    gmv: 'R$514,114.29',
    lateOrders: '653',
    lateRate: '15.72%',
    routeMedian: '7.72%',
    highLateRouteShare: '45.38%',
  },
  delayReview: [
    { label: 'On time / within 6 days', rate: 9.90, display: '9.90%' },
    { label: '1–2 days late', rate: 24.10, display: '24.10%' },
    { label: '3–7 days late', rate: 64.79, display: '64.79%' },
    { label: '8+ days late', rate: 80.21, display: '80.21%' },
  ],
} as const;

const source = (path: string) => `https://github.com/gabriel232ch/olist-marketplace-analytics/blob/main/${path}`;

export const OLIST_DATA_SOURCES = {
  readme: source('README.md'),
  executiveSummary: source('docs/EXECUTIVE_SUMMARY.md'),
  measurementSql: source('sql/08_create_measurement_foundations.sql'),
  baselineSql: source('sql/10_marketplace_baseline.sql'),
  diagnosticsSql: source('sql/12_opportunity_diagnostics.sql'),
  prioritySql: source('sql/14_create_priority_portfolios.sql'),
  validationSql: source('sql/16_headline_validation.sql'),
  executiveKpisCsv: source('dashboard/data/executive_kpis.csv'),
  categoryStateCsv: source('dashboard/data/category_state.csv'),
  routeCsv: source('dashboard/data/route.csv'),
  delayBandCsv: source('dashboard/data/delay_band.csv'),
} as const;
