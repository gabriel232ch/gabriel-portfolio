# Chanel visual upgrade — preview only

## Baseline and scope

- Latest origin/main fetched before branching: `34939ec` (published Olist evidence-led case, PR #6). Local main matched this commit; starting tree was clean.
- New branch: `codex/chanel-visual-upgrade`, created from origin/main. No historical preview or branch restored.
- Actual website checked: Chanel retains the approved eight-part research; Olist shows Growth, delivery & marketplace priorities and its six sections; Smaller Companies retains the full inquiry and its current opening sequence.
- User requested upgraded animation, charts and data presentation on this current baseline, then preview. Production publication and merge await preview confirmation under AGENTS.md.

## Direction and implementation

Refined editorial data presentation using existing typography, paper/dark surfaces and restrained bronze, teal and rose series. No new runtime dependency. frontend-design-direction applied. The request authorizes producing a concrete reviewable preview; routine presentation choices were resolved during implementation.

- Financial trajectory: three reported-dollar FY2023=100 series; select observed year, highlight a series, inspect exact reported amounts and indices. Point inspection temporarily previews an observation; leaving restores the selected year. Connecting lines add no measured intermediate observation.
- Operating-profit waterfall: original $6,407.0m → $4,711.5m arithmetic, with −$773.0m gross profit, −$984.8m SG&A effect, +$62.3m expense savings. Select a step or restore the full bridge. Small-screen plot scrolls locally.
- Revenue change: switch region/channel and FY2024/FY2025 changes. Shared zero-centred ±$1,000m scale; regional rounding and channel precision kept distinct. No group-total double counting in the channel component chart.
- French price history: actual year spacing for 2022, 2023, 2024, 2026; no fabricated 2025 observation. Exact-year readout and series focus.
- Existing price endpoints and appendix marks gain exact selection readouts. Zero-width endpoint buttons corrected to real pointer targets; mobile endpoints use a two-column layout with all observed values.
- Homepage recovery ratios receive animated thin meters using the existing FY2023 denominator. Homepage prose and order remain unchanged.
- Entrance transitions, SVG line drawing, stepped waterfall reveal, active contents navigation and focused states. Finite animations, no scroll hijacking. CSS reduced-motion path disables motion; runtime preference changes reveal content immediately. Static new SVGs/readouts are rendered server-side.

## Evidence and project protection

Actual DOM comparison against the live approved Chanel case: direct section prose/lists, every table, and body source links are identical. Only presentation graphs and local labels were added/replaced. Original financial and price data, financial appendix, project content metadata and research files unchanged.

Baseline build hashes for Olist and Smaller Companies case HTML exactly match the upgraded build. Their supporting source/data/styles and homepage copy/components are unchanged. Only the Chanel homepage signal and its scoped CSS changed on Home.

New chart copy reviewed with humanize-ai and writing-analyst-prose: labels describe existing findings; no invented personal story, new research conclusion, attribution, transaction or causal outcome. Source and measurement boundaries remain next to the original evidence.

## Verification

- Astro check: 70 files, 0 errors, 0 warnings, 0 hints.
- Astro build: 7 routes; existing empty phases-content warning remains.
- ESLint on changed Astro and script files passed.
- Desktop and 390×844 actual-browser checks: no page horizontal overflow; waterfall uses bounded local scrolling; mobile tick positions now align with zero-centred bar rails.
- Financial FY2024 selected by keyboard Enter: $18,699.3m / $4,478.6m / $1,842m, indices 94.7 / 69.9 / 49.1. Series focus verified.
- Revenue switch to channels/FY2024: Retail −952.4, Wholesale −93.2, Other +1.0; period/group state verified.
- Profit SG&A selection: increased expense of $984.8m, reducing operating profit. Full-bridge reset implemented.
- Price 2022 selection: €8,720 and €4,250. France icon mouse selection: EUR 10,000. Corrected scroll-induced pointer previews and zero-width targets during checks.
- Actual light/dark screenshots inspected; chart series remain distinct. Reduced-motion CSS/JS reviewed; no system-preference emulation was performed.
- No automated tests added or run under the session developer instruction.

## Release gate

Preview upload and remote verification pending. Do not merge or deploy production until the user confirms this concrete preview. After confirmation: reconcile with then-current origin/main, merge through PR, build approved main, compare with reviewed preview, publish main build and verify live.

Initial remote candidate `9cc3914e` was superseded after inspecting mobile price endpoints: the legacy parent retained a 36rem minimum width. The Chanel-only small-screen override now clears that minimum so endpoint cards fit the available width.
