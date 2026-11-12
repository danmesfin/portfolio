import React from 'react';
import { Exploded, Relay, Sieve } from '@lucasmarkes/hairline/react';
import SectionHeading from '../SectionHeading';
import useNoHover from '../../utils/useNoHover';

const serviceCategories = [
  {
    category: 'Full-stack development',
    // An app window in layers — the whole stack, front to back.
    Figure: Exploded,
    services: [
      'Scalable web applications and SaaS platforms',
      'REST APIs and backend services',
      'Admin dashboards and internal tools',
      'E-commerce and payment integrations',
      'Multi-tenant and role-based systems',
    ],
  },
  {
    category: 'AI agents & automation',
    // A hub handing work down branches, hop by hop.
    Figure: Relay,
    services: [
      'Custom AI-powered tools and workflows',
      'LLM integrations and agentic systems',
      'Intelligent content generation pipelines',
      'Chatbots and conversational interfaces',
      'AI service orchestration across providers',
    ],
  },
  {
    category: 'Scraping & data engineering',
    // Stacked sieves — raw input filtered down to clean records.
    Figure: Sieve,
    services: [
      'Large-scale web scraping and data extraction',
      'Automated data collection pipelines',
      'Data transformation and cleaning workflows',
      'Scheduled scraping with monitoring',
      'Custom crawlers and API integrations',
    ],
  },
];

const Services = () => {
  // Touch devices have no pointer to answer, so the figures play themselves.
  const autoPlay = useNoHover();

  return (
    <section className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24" id="services">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What I build"
          title="Three things, done properly."
          intro="Focused engagements where you need the system itself — not another dashboard to check."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-border dark:bg-white/10 border border-paper-border dark:border-white/10">
          {serviceCategories.map((category, index) => (
            <div
              key={category.category}
              className="bg-base dark:bg-black p-6 lg:p-8"
            >
              {/* Interactive line figure (answers the pointer). Decorative: the
                heading below carries the meaning. */}
              <category.Figure
                aria-hidden="true"
                play={autoPlay}
                className="mx-auto mb-6 w-full max-w-[20rem]"
              />
              <div className="flex items-baseline gap-3">
                <span className="eyebrow">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl lg:text-2xl text-paper-text dark:text-paper-white">
                  {category.category}
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {category.services.map((service) => (
                  <li
                    key={service}
                    className="font-mono text-sm leading-relaxed text-paper-muted dark:text-gray-400"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
