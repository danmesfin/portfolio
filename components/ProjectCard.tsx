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
    <div className="p-5 cursor-pointer transition transform duration-300 hover:scale-105 border border-sky rounded">
      <div className="relative w-72 h-72  md:w-96 shadow-md shadow-gray-600 dark:shadow-gray-900">
        <Image
          src={project.imgurl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className=" grayscale hover:grayscale-0 rounded-md"
        />
      </div>

      <div className="mt-16 text-center text-sky font-display">
        <h3 className="text-lg ">{project.title}</h3>
        <p className="text-sm">{project.role}</p>
      </div>
    </div>
  </Parallax>
);

export default ProjectCard;
