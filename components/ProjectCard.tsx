import React, { useState } from 'react';
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
  // onClick: () => void;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => (
  <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-75 z-50">
    <div className="bg-zinc-800 text-white p-6 rounded-t-2xl max-w-xl w-full transform transition-all duration-300 ease-out translate-y-full animate-slide-up">
      <h2 className="text-3xl font-display font-bold mb-2">{project.title}</h2>
      <p className="text-lg font-hand mb-4 text-gray-300">{project.role}</p>
      <div className="relative h-64 mb-4">
        <Image
          src={project.imgurl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p className="mt-4 text-lg font-hand mb-6">{project.description}</p>
      <div className="flex justify-end">
        <a
          href={project.projecturl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md mr-2 transition-colors"
        >
          View Project
        </a>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (item: Project) => {
    setSelectedProject(item);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="mb-8">
      <Parallax
        translateY={[-10, 10]}
        onClick={() => openModal(project)}
        className="cursor-pointer"
      >
        <div className="p-6 bg-paper-white rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="relative w-full h-48 md:h-64 lg:h-72 overflow-hidden rounded-md mb-4">
            <Image
              src={project.imgurl}
              alt={`Preview of ${project.title} project`}
              fill
              style={{ objectFit: 'cover' }}
              className="transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-paper-text">
            <h3 className="text-2xl font-display font-bold mb-2">
              {project.title}
            </h3>
            <p className="text-lg text-paper-muted font-hand">
              {project.role}
            </p>
          </div>
          <div className="mt-4">
            <div className="btn-primary inline-block" onClick={(e) => e.stopPropagation()}>
              <div className="btn-primary-bg"></div>
              <div className="btn-primary-shadow"></div>
              <a
                href={project.projecturl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-content block"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </Parallax>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProjectCard;
