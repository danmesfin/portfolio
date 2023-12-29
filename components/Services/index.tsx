import React from 'react';
import {
  FaPalette,
  FaCode,
  FaMobileAlt,
  FaBullhorn,
  FaChalkboardTeacher,
} from 'react-icons/fa';

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
    {
      category: 'Branding and Digital Marketing',
      icon: <FaBullhorn />,
      services: [
        'Developing brand identity and strategy',
        'Executing digital marketing campaigns to enhance online presence',
      ],
    },
    {
      category: 'Technical Consultation and Training',
      icon: <FaChalkboardTeacher />,
      services: [
        'Providing expert advice on software architecture',
        'Guidance on selecting the right technology stack',
        'Assistance with project planning',
        'Offering training sessions to empower clients with technical skills',
      ],
    },
  ];

  return (
    <section className="bg-gray-100 py-16 dark:bg-zinc-800">
      <div className="container mx-auto">
        <h2
          className="text-5xl font-display font-bold text-center mb-16
         dark:text-white underline decoration-wavy text-orange-900"
        >
          what can I help you with ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-24 md:gap-16">
          {serviceCategories.map((category) => (
            <div
              key={category.category}
              className=" dark:bg-zinc-700 p-6 border-4 border-primary dark:border-gray-500
               rounded-md transition duration-300 hover:shadow-lg flex flex-col items-center"
            >
              <span className="text-6xl text-primary mb-4">
                {category.icon}
              </span>
              <h3
                className="text-2xl text-center font-display font-semibold
               text-orange-900 dark:text-orange-400 mb-4"
              >
                {category.category}
              </h3>
              <ul className="list-disc pl-6 ">
                {category.services.map((service, index) => (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="text-gray-600 dark:text-fuchsia-200  mb-2"
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
