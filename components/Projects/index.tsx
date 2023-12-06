// @ts-nocheck

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectSlider from '../ProjectSlider';
import ProjectGallery from '../Project-gallery';
import ProjectCard from '../ProjectCard';

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
    <div
      className="w-full flex flex-col justify-center flex-wrap md:flex-nowrap
         py-20 font-mono mx-auto bg-gray-100"
      id="projects"
    >
      <div
        className="top-0 sticky flex flex-col items-center my-10"
        id="danmesfin projects"
      >
        <div className="mx-auto">
          <div className="flex flex-col text-center my-5 pt-5 text-base">
            <span className="text-4xl md:text-9xl  font-display text-sky">
              Projects
            </span>
            <span className="mt-16 text-lg md:text-2xl text-sky font-hand">
              Here are some of my works so far
            </span>
          </div>
        </div>
      </div>
      <div className="relative flex justify-between w-full md:pb-[100rem]">
        <div className="left-20 absolute border">
          <ProjectCard project={webProjects[0]} />
        </div>
        <div className="right-40 absolute top-[5rem] border">
          <ProjectCard project={webProjects[1]} />
        </div>
        <div className="left-28 top-[70rem] absolute border">
          <ProjectCard project={webProjects[2]} />
        </div>
        <div className="right-40 absolute top-[50rem] border">
          <ProjectCard project={webProjects[3]} />
        </div>
      </div>
    </div>
  );
}
// V0NY2M0DVFRH;
