import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaDatabase } from 'react-icons/fa';

const Services = () => {
  const serviceCategories = [
    {
      category: 'Full-Stack Development',
      icon: <FaCode />,
      services: [
        'Scalable web applications and SaaS platforms',
        'REST APIs and backend services',
        'Admin dashboards and internal tools',
        'E-commerce and payment integrations',
        'Multi-tenant and role-based systems',
      ],
    },
    {
      category: 'AI Agents & Automation',
      icon: <FaRobot />,
      services: [
        'Custom AI-powered tools and workflows',
        'LLM integrations and agentic systems',
        'Intelligent content generation pipelines',
        'Chatbots and conversational interfaces',
        'AI service orchestration across providers',
      ],
    },
    {
      category: 'Web Scraping & Data Engineering',
      icon: <FaDatabase />,
      services: [
        'Large-scale web scraping and data extraction',
        'Automated data collection pipelines',
        'Data transformation and cleaning workflows',
        'Scheduled scraping with monitoring',
        'Custom crawlers and API integrations',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-16" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-paper-text dark:text-white"
        >
          What can I help you with?
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceCategories.map((category) => (
            <motion.div
              key={category.category}
              className="bg-paper-white dark:bg-zinc-900 p-8 border border-paper-border dark:border-gray-700 rounded-2xl shadow-paper hover:shadow-paper-hover transition-shadow duration-200 flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <span className="text-5xl text-accent-coral mb-5" aria-hidden>
                {category.icon}
              </span>
              <h3 className="text-2xl text-center font-display font-semibold text-paper-text dark:text-white mb-5">
                {category.category}
              </h3>
              <ul className="space-y-2.5 self-stretch">
                {category.services.map((service) => (
                  <li
                    key={service}
                    className="flex gap-2.5 text-paper-muted dark:text-gray-300 leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-coral"
                      aria-hidden
                    />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
