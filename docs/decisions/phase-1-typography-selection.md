# Phase 1 Typography Selection

**Date:** 2026-09-02
**Status:** Approved through human visual review
**Scope:** Phase 1 / Task 7 — Controlled Typography Audition

## Decision

Gabriel Portfolio will use the following semantic typography roles:

| Role | Typeface | Primary use |
| --- | --- | --- |
| Display | Inter Variable | Large headings, structural typography, navigation-scale display |
| Editorial | Cormorant Garamond Variable | Editorial kickers, ledes, pull quotes, selective expressive moments |
| Body | Inter Variable | Functional prose, interface copy, general reading |
| Data | IBM Plex Mono | G.xxx / PH.xx identifiers, dates, metadata, index language |

## Design Principle

The typography system should express luxury through restraint rather than ornament.

The primary display voice is a quiet, lightweight sans serif with generous spacing. Serif typography is used selectively to add editorial character rather than dominate the page.

In short:

> Sans builds structure. Serif adds character.

The intended effect is refined, spacious, and editorial — luxurious without appearing deliberately decorative or performative.

## Audition Process

The first audition tested three serif faces as large display typography:

- Instrument Serif
- Bodoni Moda
- Cormorant Garamond

Human review found that large serif headlines felt too visually active. This changed the typography hypothesis from **serif-led display** to a **hybrid system**.

A second exploration tested serif type as a selective accent while Inter Variable carried the primary display role.

The search was then widened beyond the original three candidates. The serif archetype round compared:

- Cormorant Garamond
- EB Garamond
- Spectral
- Georgia
- Newsreader

Human review reduced the field to three finalists:

1. Spectral
2. Cormorant Garamond
3. Newsreader

The finalists were compared across three realistic editorial roles:

- small italic kicker
- editorial lede
- large pull quote

## Final Human Review

**Selected:** Cormorant Garamond

Cormorant Garamond was preferred because it retains more distinctive design character than Spectral while remaining elegant inside the restrained sans-led system.

At larger editorial sizes, particularly the pull-quote treatment, its finer and more delicate forms created the strongest sense of refinement and luxury.

The decision is therefore not to make Cormorant Garamond the dominant visual voice. Its strength comes from contrast with the quieter Inter-based structural system.

## Implementation Contract

Semantic font tokens:

    --font-display: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
    --font-editorial: 'Cormorant Garamond Variable', Georgia, serif;
    --font-body: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
    --font-data: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

The typography audition remains available at `/lab/typography` as design evidence for the selection process.

Spectral and Newsreader remain dependencies only for that controlled comparison page. They are not part of the production semantic typography system.

## Guardrail

Future visual work may tune weight, size, tracking, line height, and role-specific composition without reopening the font-family decision.

Changing the semantic font families themselves requires an explicit new design decision.
