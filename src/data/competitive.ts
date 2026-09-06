export interface CompetitiveMechanism {
  label:
  | 'Deliberate Constraint Advantage'
  | 'Ownership Compression'
  | 'Leverage Platform'
  | 'Output-to-Reputation Flywheel'
  | 'Selective Fit Flywheel';
  summary: string;
}

/**
 * Build-time snapshot of the five mechanisms named in the authorized
 * small-high-impact-companies archive. These are analytical mechanisms, not
 * employer-specific recommendations or universal recipes.
 */
export const COMPETITIVE_MECHANISMS: readonly CompetitiveMechanism[] = [
  {
    label: 'Deliberate Constraint Advantage',
    summary: 'Use an explicit constraint to protect prioritisation and strategic independence.',
  },
  {
    label: 'Ownership Compression',
    summary: 'Keep work, decision rights, and consequences close to reduce handoffs.',
  },
  {
    label: 'Leverage Platform',
    summary: 'Use a shared asset to increase output beyond the group’s human scale.',
  },
  {
    label: 'Output-to-Reputation Flywheel',
    summary: 'Let visible, verifiable output build credibility and attract mission-critical talent.',
  },
  {
    label: 'Selective Fit Flywheel',
    summary: 'Make the operating trade-off clear so better-fit talent can self-select.',
  },
] as const;
