# Olist analysis trail evidence

Verified source revision: `gabriel232ch/olist-marketplace-analytics@84819c37b79ab7fcf7982e2f7063124432fee0cc`.

| Public step | Read evidence | Boundary |
| --- | --- | --- |
| Grain | README; sql/04_raw_quality_checks.sql; sql/08_create_measurement_foundations.sql | GMV proxy is not revenue or margin. |
| Population | sql/07_measurement_rule_profile.sql | Purchase cohorts and each outcome denominator remain distinct. |
| Growth | sql/10_marketplace_baseline.sql; docs/EXECUTIVE_SUMMARY.md | Symmetric accounting decomposition is not causality. |
| Reliability | docs/EXECUTIVE_SUMMARY.md; sql/12_opportunity_diagnostics.sql | Route exposure points to investigation, not carrier/distance attribution. |
| Priority | sql/14_create_priority_portfolios.sql; sql/16_headline_validation.sql | Current exposure is not uplift, losses or forecast impact. |

Five website links are pinned to this revision. Existing homepage and detail metric values are preserved.
