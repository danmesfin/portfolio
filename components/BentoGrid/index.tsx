import React from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb } from 'react-icons/si';

interface BentoProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: React.ComponentType<{ size?: number; className?: string }>[];
  githubUrl?: string;
  liveUrl?: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  textColor: string;
}

const projects: BentoProject[] = [
  {
    id: '1',
    title: 'Hire Armada',
    description: 'Talent outsourcing and recruitment platform',
    image: '/images/arez-armada.png',
    technologies: [SiNextdotjs, SiTypescript],
    liveUrl: 'https://arezarmada.com',
    size: 'large',
    color: 'bg-blue-100',
    textColor: 'text-gray-900'
  },
  {
    id: '2',
    title: 'Sebl: AI Farm Assist',
    description: 'Farm Assistant App with AI-powered plant disease detection and crop yield prediction',
    image: '/images/sebl-mobile-01.webp',
    technologies: [FaReact, SiTypescript],
    githubUrl: 'https://github.com/danmesfin/sebl-mobile',
    size: 'small',
    color: 'bg-purple-100',
    textColor: 'text-gray-900'
  },
  // {
  //   id: '3',
  //   title: 'Shopx Mobile',
  //   description: 'E-commerce mobile app with cart functionality and category browsing',
  //   image: '/images/shopx-mobile-01.webp',
  //   technologies: [FaReact, SiTypescript],
  //   githubUrl: 'https://github.com/danmesfin/shopx-mobile',
  //   size: 'medium',
  //   color: 'bg-yellow-100',
  //   textColor: 'text-gray-900'
  // },
  {
    id: '4',
    title: 'Covid-19 Tracker',
    description: 'Real-time COVID-19 data tracker with analysis by country and continent',
    image: '/images/project1.webp',
    technologies: [FaReact, SiNextdotjs, SiTailwindcss, SiTypescript],
    liveUrl: 'http://trackcovid19.vercel.app',
    size: 'small',
    color: 'bg-orange-100',
    textColor: 'text-gray-900'
  },
  // {
  //   id: '5',
  //   title: 'Shopx - E-commerce',
  //   description: 'Innovative e-commerce platform with seamless shopping experience',
  //   image: '/images/shopx.webp',
  //   technologies: [FaReact, SiNextdotjs, SiTailwindcss],
  //   liveUrl: 'http://shopx.vercel.app',
  //   size: 'small',
  //   color: 'bg-cyan-100',
  //   textColor: 'text-red-900'
  // },
   {
    id: '6',
    title: 'The carbon games',
    description: 'Ride sharing app on blockchain maintaining sustainability. Meetups for Carpooling.',
    image: '/images/thecarbongames-eventcarpooling.png',
    technologies: [SiNextdotjs, FaReact],
    liveUrl: 'https://thecarbongames.com',
    size: 'large',
    color: 'bg-green-100',
    textColor: 'text-gray-900'
  }

];

const BentoCard: React.FC<{ project: BentoProject }> = ({ project }) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1 min-h-[280px] sm:min-h-[320px]',
    medium: 'col-span-2 row-span-1 md:col-span-1 md:row-span-2 min-h-[280px] md:min-h-[400px]',
    large: 'col-span-2 row-span-2 min-h-[400px] md:min-h-[500px]'
  };

  const getImageHeight = () => {
    switch (project.size) {
      case 'large':
        return 'h-40 sm:h-48 md:h-56 lg:h-64';
      case 'medium':
        return 'h-32 sm:h-40 md:h-48 lg:h-52';
      case 'small':
        return 'h-24 sm:h-32 md:h-36';
      default:
        return 'h-32 md:h-40 lg:h-48';
    }
  };

  const getTextSizes = () => {
    switch (project.size) {
      case 'large':
        return {
          title: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
          description: 'sm:text-md md:text-lg',
          techSize: 16,
          linkSize: 16
        };
      case 'medium':
        return {
          title: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
          description: 'sm:text-sm md:text-md',
          techSize: 14,
          linkSize: 14
        };
      case 'small':
        return {
          title: 'sm:text-lg md:text-xl',
          description: 'text-xs sm:text-sm',
          techSize: 12,
          linkSize: 12
        };
      default:
        return {
          title: 'text-lg md:text-xl lg:text-2xl',
          description: 'text-xs md:text-sm lg:text-md',
          techSize: 12,
          linkSize: 12
        };
    }
  };

  const textSizes = getTextSizes();

  return (
    <div className={`${sizeClasses[project.size]} ${project.color} rounded-2xl p-3 sm:p-4 md:p-6 cursor-pointer border border-black flex flex-col gap-3 sm:gap-4`}>
      {/* Project Image Frame */}
      {project.image && (
        <div className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-300 bg-white flex-shrink-0`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>
      )}
      
      {/* Content */}
      <div className={`flex-1 flex flex-col justify-between ${project.textColor} min-h-0`}>
        <div className="flex-1 space-y-2 sm:space-y-3">
          <h3 className={`${textSizes.title} font-bold font-display line-clamp-2`}>
            {project.title}
          </h3>
          <p className={`${textSizes.description} line-clamp-2 sm:line-clamp-3 leading-relaxed`}>
            {project.description}
          </p>
        </div>
        
        <div className="space-y-2 sm:space-y-3 mt-auto pt-2 sm:pt-3">
          {/* Technologies */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.technologies.slice(0, project.size === 'large' ? 6 : project.size === 'medium' ? 4 : 3).map((Tech, index) => (
              <div key={index} className="bg-white/80 rounded-full p-1 sm:p-1.5 border border-gray-300">
                <Tech size={textSizes.techSize} className="text-gray-700" />
              </div>
            ))}
            {project.technologies.length > (project.size === 'large' ? 6 : project.size === 'medium' ? 4 : 3) && (
              <div className="bg-white/80 rounded-full px-2 py-1 border border-gray-300">
                <span className="text-xs text-gray-700">
                  +{project.technologies.length - (project.size === 'large' ? 6 : project.size === 'medium' ? 4 : 3)}
                </span>
              </div>
            )}
          </div>
          
          {/* Links */}
          <div className="flex gap-1.5 sm:gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 rounded-full p-1 sm:p-1.5 border border-gray-300 hover:bg-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={textSizes.linkSize} className="text-gray-700" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 rounded-full p-1 sm:p-1.5 border border-gray-300 hover:bg-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt size={textSizes.linkSize} className="text-gray-700" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20" id="projects">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          {/* <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 lg:mb-6 text-paper-text dark:text-white font-display leading-tight">
            Featured Projects
          </h2> */}
          <p className="font-hand text-2xl sm:text-2xl lg:text-2xl text-paper-text dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A collection of projects I worked on showcasing different technologies and design approaches
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-min">
          {projects.map((project) => (
            <BentoCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
