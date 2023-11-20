import React from 'react';
import { motion } from 'framer-motion';

function anim() {
  return (
    <div className="container">
      <section className="snap-center scroll-m-1 h-screen flex justify-center items-center bg-blue-500">
        section one
      </section>
      <section className="snap-center scroll-m-1 h-screen flex justify-center bg-red-500">
        <div className="relative">
          <motion.div
            initial={{ x: -200, opacity: 0.5 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="transform bg-gray-300 h-96 w-60"
          ></motion.div>
        </div>
      </section>
    </div>
  );
}

export default anim;
