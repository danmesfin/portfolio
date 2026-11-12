import React, { useState } from 'react';
import CustomFigure from './CustomFigure';
import useNoHover from '../../utils/useNoHover';

/**
 * Landing-page band under the hero: a short statement about shipping whole
 * products, beside the Gantry figure — a container crane that travels to the
 * bay under the pointer and hoists its top container. The figure's read-out
 * ("bay 3") is echoed in the caption.
 */
const ShippingBand: React.FC = () => {
  const autoPlay = useNoHover();
  const [reading, setReading] = useState('rest');

  return (
    <section
      className="px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24"
      aria-labelledby="shipping-heading"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center border-y border-paper-border dark:border-white/10 py-10 sm:py-14">
        <div className="min-w-0">
          <p id="shipping-heading" className="eyebrow">
            Built to ship
          </p>
          <p className="mt-4 max-w-md text-paper-muted dark:text-gray-400 leading-relaxed">
            I take a product the whole way: the interface, the backend, the
            infrastructure it runs on, and the launch.
          </p>
        </div>

        <figure className="min-w-0">
          <CustomFigure
            name="gantry"
            play={autoPlay}
            onRead={setReading}
            className="mx-auto w-full max-w-md"
          />
          <figcaption className="mt-2 text-center font-mono text-xs uppercase tracking-[0.18em] text-paper-muted dark:text-gray-500">
            {reading === 'rest' ? 'Move across the yard' : reading}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ShippingBand;
