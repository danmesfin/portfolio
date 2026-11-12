import { ComponentType } from 'react';
import VoteDefence from './VoteDefence';

/**
 * Illustrations attached to individual content pages, keyed by route. The
 * case-study and blog templates render the entry for their page, if any,
 * above the body.
 */
const pageFigures: Record<string, ComponentType> = {
  '/case-studies/aicreativeaward': VoteDefence,
  '/blogs/stopping-vote-fraud-at-scale': VoteDefence,
};

export default pageFigures;
