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
      <div className="p-5 cursor-pointer transition transform duration-300 hover:scale-105 border border-base">
        <div className="relative w-60 h-60 md:h-72 md:w-72 lg:w-96 lg:h-96 shadow-md shadow-gray-600 dark:shadow-gray-900">
          <Image
            src={project.imgurl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transform delay-150 duration-75 grayscale hover:grayscale-0 "
          />
        </div>

        <div className=" mt-14 md:mt-24 text-center text-base font-display">
          <h3 className="text-lg ">{project.title}</h3>
          <p className="text-sm">{project.role}</p>
        </div>
      </div>
    </a>
  </Parallax>
);

export default ProjectCard;
