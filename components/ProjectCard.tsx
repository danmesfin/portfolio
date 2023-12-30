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
    <a
      href={project.projecturl}
      target="_blank"
      rel="noreferrer"
      className="transition-transform duration-300 transform hover:scale-101"
    >
      <div className="p-5 border-2 border-gray-700 dark:border-gray-300 bg-gradient-to-br from-orange-800 to-zinc-900 rounded-md bg-opacity-80 ">
        <div className="relative w-60 h-60 md:h-72 md:w-72 lg:w-96 lg:h-96 overflow-hidden rounded-md">
          <Image
            src={project.imgurl}
            alt={`Preview of ${project.title} project`}
            fill
            style={{ objectFit: 'contain' }}
            blurDataURL="data:..."
            placeholder="blur"
            className="transform delay-150 duration-75"
          />
        </div>

        <div className="mt-4 md:mt-6 text-center text-white">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.role}</p>
        </div>
      </div>
    </a>
  </Parallax>
);

export default ProjectCard;
