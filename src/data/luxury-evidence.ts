/** Source: research_slowdown_2023_2025/data/resilience_panel.csv.
 * Reported revenue in each entity's own currency; Chanel uses exact filed accounts.
 * These indices are separate from disclosed comparable/organic growth rates.
 */
export const peerRevenue = [
  { entity: 'Chanel / consolidated / USD', values: [19743.9, 18699.3, 19269.1] },
  { entity: 'LVMH F&LG / business group / EUR', values: [42169, 41060, 37770] },
  { entity: 'Gucci / brand / EUR', values: [9873, 7650, 5992] },
  { entity: 'Hermès / group / EUR', values: [13427, 15170, 16002] },
];

/** Regions are rounded USD millions; channels retain filed-account precision. */
export const regionalRevenue = [
  { name: 'Europe', values: [5606, 5676, 6054] },
  { name: 'Asia Pacific', values: [10178, 9233, 9182] },
  { name: 'Americas', values: [3960, 3790, 4033] },
];
export const channelRevenue = [
  { name: 'Retail', values: [15359.7, 14407.3, 14842.4] },
  { name: 'Wholesale', values: [4373.2, 4280, 4414.1] },
  { name: 'Other', values: [11, 12, 12.6] },
  { name: 'Group total', values: [19743.9, 18699.3, 19269.1] },
];

/** Source: competitive_pricing_calculations/price_band_summary.csv,
 * also reproduced in final_report_assets/02_price_band_battleground.svg.
 * Counts of numeric observations, not assortment or market shares.
 */
export const priceBands = [
  { market: 'France / EUR', rows: [
    ['Access / lower', 0, 1, 12, 0], ['Core', 2, 6, 8, 19],
    ['Premium core', 8, 9, 0, 0], ['High', 0, 4, 0, 0], ['Exceptional / icon', 7, 0, 0, 0],
  ] },
  { market: 'United States / USD', rows: [
    ['Access / lower', 0, 3, 19, 5], ['Core', 3, 11, 1, 8],
    ['Premium core', 8, 2, 0, 0], ['High', 0, 2, 0, 0], ['Exceptional / icon', 7, 2, 0, 0],
  ] },
];
