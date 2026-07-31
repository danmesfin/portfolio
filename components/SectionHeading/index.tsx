import React from 'react';

interface SectionHeadingProps {
  /** Small mono uppercase label above the title. */
  eyebrow: string;
  title: React.ReactNode;
  /** Optional supporting line below the title. */
  intro?: React.ReactNode;
  /** Numeric marker shown at the far left (e.g. "02"). */
  index?: string;
  className?: string;
}

/**
 * The shared section header: mono eyebrow, serif title, optional intro,
 * closed by a hairline rule — the recurring editorial motif.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  intro,
  index,
  className = '',
}) => (
  <div className={className}>
    <div className="flex items-baseline gap-4">
      {index && <span className="eyebrow">{index}</span>}
      <p className="eyebrow">{eyebrow}</p>
    </div>
    <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-paper-text dark:text-paper-white max-w-3xl">
      {title}
    </h2>
    {intro && (
      <p className="mt-5 max-w-2xl text-paper-muted dark:text-gray-400 leading-relaxed">
        {intro}
      </p>
    )}
    <hr className="rule mt-8" />
  </div>
);

export default SectionHeading;
