import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaCode, FaMobileAlt } from 'react-icons/fa';

const Services = () => {
  const serviceCategories = [
    {
      category: 'UI/UX Design',
      icon: <FaPalette />,
      services: [
        'Creating cool and stylish designs',
        'Landing Pages for Organizations',
        'Portfolio or Personal Websites',
        'Product Landing Pages',
        'Other customized design solutions based on client needs',
      ],
    },
    {
      category: 'Web Application Development',
      icon: <FaCode />,
      services: [
        'Building scalable and responsive web applications',
        'Booking systems',
        'Reservation systems',
        'Content Management Systems (CMS)',
        'Other customized web application solutions',
      ],
    },
    {
      category: 'Mobile Application Development',
      icon: <FaMobileAlt />,
      services: [
        'Crafting mobile applications for iOS and Android platforms',
        'Other customized mobile application solutions',
      ],
    },
    // {
    //   category: 'Branding and Digital Marketing',
    //   icon: <FaBullhorn />,
    //   services: [
    //     'Developing brand identity and strategy',
    //     'Executing digital marketing campaigns to enhance online presence',
    //   ],
    // },
    // {
    //   category: 'Technical Consultation and Training',
    //   icon: <FaChalkboardTeacher />,
    //   services: [
    //     'Providing expert advice on software architecture',
    //     'Guidance on selecting the right technology stack',
    //     'Assistance with project planning',
    //     'Offering training sessions to empower clients with technical skills',
    //   ],
    // },
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
    <section className="bg-gray-100 py-16 dark:bg-zinc-800">
      <div className="container mx-auto">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-16 dark:text-white underline decoration-wavy text-orange-900"
        >
          What can I help you with?
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {serviceCategories.map((category) => (
            <motion.div
              key={category.category}
              className="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="text-6xl text-primary mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.span>
              <h3 className="text-2xl text-center font-display font-semibold text-orange-900 dark:text-orange-400 mb-4">
                {category.category}
              </h3>
              <ul className="list-disc pl-6">
                {category.services.map((service, index) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="text-gray-600 dark:text-fuchsia-200 mb-2"
                  >
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
