import React from 'react';
import Image from 'next/image';
import { Parallax } from 'react-scroll-parallax';

interface Project {
  imgurl: string;
  title: string;
  role: string;
  description: string;
  projecturl: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <Parallax translateY={[-10, 10]} onClick={onClick}>
    <a href={project.projecturl} target="_blank" rel="noreferrer">
      <div
        className="p-5 cursor-pointer transition transform delay-75 duration-300 
      hover:scale-[1.01] bg-gray-200 rounded-lg dark:bg-zinc-600 dark:bg-opacity-80 bg-opacity-90 "
      >
        <div
          className="relative w-60 h-60 md:h-72 md:w-72 lg:w-96 lg:h-96 
         dark:shadow-gray-900"
        >
          <Image
            src={project.imgurl}
            alt={project.title}
            fill
            style={{ objectFit: 'contain' }}
            blurDataURL="data:..."
            placeholder="blur"
            className="transform rounded-md delay-75 duration-75  "
          />
        </div>

        <div className="mt-14 md:mt-16 text-center text-orangish dark:text-white font-display">
          <h3 className="text-lg ">{project.title}</h3>
          <p className="text-sm">{project.role}</p>
        </div>
      </div>
    </a>
  </Parallax>
);

export default ProjectCard;
