// @ts-nocheck

import React from 'react';
import ProjectCard from '../ProjectCard';

const webProjects = [
  {
    title: 'Hire Armada',
    projecturl: 'https://arezarmada.com',
    role: 'Web developement',
    stack: ['Next.js', 'TypeScript', 'Redux'],
    description: 'talent outsourcing and recruitment platform.',
    imgurl: '/images/arez-armada.png',
  },
  {
    title: 'Thecarbongames',
    projecturl: 'https://thecarbongames.com',
    role: 'web/blockchain developer',
    stack: ['Next.js', 'web3', 'NEAR Protocol', 'Cairo', 'Particle Network'],
    description:
      'Ride sharing app on blockchain maintining sustainablity. Meetups for Carpooling.',
    imgurl: '/images/thecarbongames-eventcarpooling.png',
  },
  {
    title: 'Sebl: AI Farm Assist',
    projecturl: 'https://github.com/danmesfin/sebl-mobile',
    role: 'Fullstack developer',
    stack: ['React Native', 'TypeScript', 'Redux'],
    description:
      '"Sebl" Farm Assistant App, an innovative mobile application aimed at enhancing farming practices through the power of AI. The app offers features such as plant disease detection, crop yield prediction, cultivation tips, weather forecasts, and a community interaction platform. Technologies Used: React Native, Firebase, Node.js, Express.js.',
    imgurl: '/images/sebl-mobile-01.webp',
  },
  {
    title: 'Covid-19 Tracker',
    projecturl: 'http://trackcovid19.vercel.app',
    role: 'web development',
    stack: ['React/Next.js', 'TailwindCss', 'TypeScript', 'Redux'],
    description:
      'trackCovid19 is a web  project that provides real time data on covid 19 distribution across the world. Users can get analysis of the data based on country and/or continent. I built the project using Next.js, Typescript,Tailwind, Charts.js, react-leaflet and reliable data from diseas.sh API endpoints',
    imgurl: '/images/project1.webp',
  },
  {
    title: 'Shopx - ecommerce',
    projecturl: 'http://shopx.vercel.app',
    role: 'fullstack',
    stack: ['React/Next.js', 'TailwindCss', 'Redux', 'REST API'],
    description:
      'Shopx is an innovative e-commerce platform designed to provide a seamless online shopping experience for users. This web-based e-commerce website offers a wide range of products and services, catering to the diverse needs of shoppers. Shopx aims to revolutionize the way people shop online by providing a user-friendly interface, robust features, and efficient performance.I designed the user interface and also implemented the front end using Next.js Framework.',
    imgurl: '/images/shopx.webp',
  },

  {
    title: 'shopx - mobile',
    projecturl: 'https://github.com/danmesfin/shopx-mobile',
    role: 'Mobile development',
    stack: ['React Native', 'TypeScript', 'Redux'],
    description:
      'ShopX Mobile is a powerful e-commerce mobile application built using React Native. Enjoy a seamless shopping experience with features like user sign up and login, account information management, cart functionality, and easy browsing by category.',
    imgurl: '/images/shopx-mobile-01.webp',
  },
];

export default function Projects() {
  return (
    <section
      className="w-full py-20 bg-gradient-to-b from-white via-orange-100 to-white dark:from-black dark:via-zinc-900 dark:to-black"
      id="projects"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-display text-zinc-800 dark:text-white mb-4">
            Projects
          </h2>
          <p className="text-2xl md:text-3xl font-hand text-zinc-600 dark:text-zinc-300">
            Here are some of my works so far
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
// V0NY2M0DVFRH;
