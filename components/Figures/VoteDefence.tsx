import React, { useState } from 'react';
import CustomFigure from './CustomFigure';
import useNoHover from '../../utils/useNoHover';

/** The five defence layers of AI Creative Award, outermost first. */
const LAYERS = [
  'Layer 0 · Platform bot defence at the edge',
  'Layer 1 · Origin and session checks',
  'Layer 2 · Sliding-window rate limits',
  'Layer 3 · Integrity checks at write time',
  'Layer 4 · Fraud tooling and review',
];

/**
 * Turnstiles: a vote passing five gates, each taller than the last. The
 * figure reports "gate N" as the pointer moves; the caption names that layer.
 */
const VoteDefence: React.FC = () => {
  const autoPlay = useNoHover();
  const [gate, setGate] = useState(-1);

  return (
    <figure className="my-12 border-y border-paper-border dark:border-white/10 py-8">
      <CustomFigure
        name="turnstiles"
        play={autoPlay}
        onRead={(text) => {
          const match = text.match(/^gate (\d)$/);
          setGate(match ? Number(match[1]) - 1 : -1);
        }}
        className="mx-auto w-full max-w-md"
      />
      <figcaption className="mt-4 text-center font-mono text-sm text-paper-muted dark:text-gray-400">
        {LAYERS[gate] ??
          'Five layers of defence, cheapest first. Move along the lane to send a vote through.'}
      </figcaption>
    </figure>
  );
};

export default VoteDefence;
