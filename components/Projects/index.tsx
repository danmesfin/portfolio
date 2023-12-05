// @ts-nocheck

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectSlider from '../ProjectSlider';
import ProjectGallery from '../Project-gallery';

const webProjects = [
  {
    title: 'Covid-19 Tracker',
    projecturl: 'http://trackcovid19.vercel.app',
    role: 'web development',
    stack: ['React/Next.js', 'TailwindCss', 'TypeScript', 'Redux'],
    description:
      'trackCovid19 is a web  project that provides real time data on covid 19 distribution across the world. Users can get analysis of the data based on country and/or continent. I built the project using Next.js, Typescript,Tailwind, Charts.js, react-leaflet and reliable data from diseas.sh API endpoints',
    imgurl: '/images/project1.png',
  },
  {
    title: 'Shopx - ecommerce',
    projecturl: 'http://shopx.vercel.app',
    role: 'fullstack',
    stack: ['React/Next.js', 'TailwindCss', 'Redux', 'REST API'],
    description:
      'Shopx is an innovative e-commerce platform designed to provide a seamless online shopping experience for users. This web-based e-commerce website offers a wide range of products and services, catering to the diverse needs of shoppers. Shopx aims to revolutionize the way people shop online by providing a user-friendly interface, robust features, and efficient performance.I designed the user interface and also implemented the front end using Next.js Framework.',
    imgurl: '/images/shopx.jpg',
  },
  {
    title: 'Sebl: AI Farm Assist',
    projecturl: 'https://github.com/danmesfin/sebl-mobile',
    role: 'Sebl: AI Farm Assist',
    stack: ['React Native', 'TypeScript', 'Redux'],
    description:
      '"Sebl" Farm Assistant App, an innovative mobile application aimed at enhancing farming practices through the power of AI. The app offers features such as plant disease detection, crop yield prediction, cultivation tips, weather forecasts, and a community interaction platform. Technologies Used: React Native, Firebase, Node.js, Express.js.',
    imgurl: '/images/sebl-mobile-01.jpg',
  },
  {
    title: 'shopx - mobile',
    projecturl: 'https://github.com/danmesfin/shopx-mobile',
    role: 'Mobile development',
    stack: ['React Native', 'TypeScript', 'Redux'],
    description:
      'ShopX Mobile is a powerful e-commerce mobile application built using React Native. Enjoy a seamless shopping experience with features like user sign up and login, account information management, cart functionality, and easy browsing by category.',
    imgurl: '/images/shopx-mobile-01.jpg',
  },
];

const mobileProjects = [
  {
    title: 'Sebl: AI Farm Assist',
    projecturl: 'https://github.com/danmesfin/shopx-mobile',
    role: 'Sebl: AI Farm Assist',
    stack: ['React Native', 'TypeScript', 'Redux'],
    description:
      'shopx mobile shopx is an ecommerce mobile application built in react-native.',
    imgurl: '/images/sebl-mobile-01.jpg',
  },
  {
    title: 'shopx - mobile',
    projecturl: 'https://github.com/danmesfin/shopx-mobile',
    role: 'Mobile development',
    stack: ['React Native', 'TypeScript', 'Redux'],
    description:
      'shopx mobile shopx is an ecommerce mobile application built in react-native.',
    imgurl: '/images/shopx-mobile-01.jpg',
  },
];

export default function index() {
  return (
    <section
      className="w-full flex flex-col justify-center flex-wrap md:flex-nowrap
         pt-20 font-mono mx-auto bg-gray-300 py-8 md:py-20"
      id="projects"
    >
      <div className="flex flex-col items-center my-10" id="danmesfin projects">
        <div className="mx-auto">
          <div className="flex flex-col text-center my-5 pt-5 text-base">
            <span className="text-4xl md:text-9xl  font-display text-primary">
              Projects
            </span>
            <span className="text-lg md:text-2xl text-primary font-hand">
              Here are some of my works so far
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full mx-auto justify-center ">
        <ProjectGallery projects={webProjects} />
      </div>
    </section>
  );
}
