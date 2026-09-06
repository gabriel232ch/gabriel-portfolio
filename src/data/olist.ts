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

/**
 * Build-time values transcribed from the canonical Olist analysis outputs.
 * The UI may animate these observations, but must not interpolate or change
 * the underlying claims.
 */
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

export const OLIST_DATA_SOURCES = {
  readme: 'https://github.com/gabriel232ch/olist-marketplace-analytics/blob/main/README.md',
  executiveKpis:
    'https://github.com/gabriel232ch/olist-marketplace-analytics/blob/main/dashboard/data/executive_kpis.csv',
} as const;
