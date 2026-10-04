# Chanel preview revision — 2026-10-04

## Scope

Preview only. Production deployment requires the user's acceptance of this preview.
The earlier commit replaced a detailed case with a shorter narrative and omitted evidence that the handoff explicitly assigned to expandable background sections.

## What changed

- Restored price-tier definitions, family steps, tiered competitor observation counts and historical-panel context.
- Added reported-revenue indices for Chanel, LVMH F&LG, Gucci and Hermès, each FY2023=100 in its own currency and reporting scope. Disclosed growth definitions stay in a separate table.
- Replaced qualitative bridge summaries with regional and channel amounts and year-to-year changes. Regional rounding and channel precision remain explicit.
- Expanded product timing, CHANEL 25 use cases and counterexamples, third-party beauty scale, and boutique/craftsmanship/brand investment evidence.
- Restored the earlier Chanel, Hermès and LVMH charts and tables in an expandable appendix. Updated Chanel FY2023–FY2025 revenue and operating profit to the filed-account precision used in the new diagnostic.
- Preserved exploratory tote cells only in the method appendix, with strict R1 threshold failure and small-cell caveats.
- Reconnected financial-panel, claim-map, threshold and data links.

## Language review

Applied `writing-analyst-prose` and `humanize-ai` to the English page and revised homepage passages. The user authorized revision as part of the preview request.

Genre: analytical portfolio case. Formal metric labels and necessary reporting conditions were preserved. Existing personal opening passages on the homepage were kept as the author's voice; no new emotion, biographical episode or customer account was invented.

The initial draft's repeated limitation phrasing was the main language problem. The revision uses findings and concrete evidence before interpretation, with local boundaries for currency, reporting scope, selected ownership accounts, category estimates and timing. General non-inferences are consolidated in the closing evidence register.

Examples:

- “Public accounts do not isolate handbag sales, customer migration, or the return on individual investments” → “I can trace where group revenue returned and where the profit gap remains. I still cannot tell how much handbag demand or any individual investment contributed.” This keeps the established personal perspective and names the useful result before the unresolved issue.
- “The current Chanel sample contains 41 accepted observations…” → “The observed ladder starts at €4,850 in France and $5,400 in the United States…” Sample coverage follows the finding.
- “Continued investment does not identify its return” → “Lower gross profit and higher SG&A left the largest marks on the gap.” The accounting result leads; capex treatment follows where it changes interpretation.

Review result: ready for preview review. Claims, dates and quantities remain traceable to the handoff and research tables; no interview, category contribution, marketing ROI or pricing causality is asserted. The prose retains analytical restraint without requiring an invented emotional moment.

## Evidence provenance

Repository: https://github.com/gabriel232ch/luxury-handbag-price-architecture

- `website_handoff/{README.md,NARRATIVE_INTEGRATION_CN.md,CASE_STUDY_COPY_EN.md,IMPLEMENTATION_SPEC_CN.md,content.json}`
- `research_slowdown_2023_2025/data/{resilience_panel.csv,chanel_regional_panel.csv,chanel_channel_panel.csv,product_timing_ledger.csv,chanel_profit_bridge_inputs.csv}`
- `research_slowdown_2023_2025/reports/{CHANNEL_PRODUCT_REVIEW_CN.md,CUSTOMER_BEAUTY_REVIEW_CN.md}`
- `FINAL_LUXURY_HANDBAG_PRICING_STRATEGY_CN.md` and `final_report_assets/02_price_band_battleground.svg`
- Earlier portfolio page at commit `862e00d` for the restored background charts and tables.
