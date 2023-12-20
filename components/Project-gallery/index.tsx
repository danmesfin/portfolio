import React, { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';
import ProjectCard from '../ProjectCard';

interface Project {
  imgurl: string;
  title: string;
  role: string;
  description: string;
  projecturl: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-base p-6 rounded-md max-w-xl w-full text-center">
      <h2 className="text-2xl font-display font-bold mb-2">{project.title}</h2>
      <p className="text-sm md:text-md font-hand mb-4">{project.role}</p>
      <div className="relative h-48 mb-4">
        <Image
          src={project.imgurl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col md:flex-row max-w-md w-full text-center border-t mx-auto">
        <p className="mt-4 text-center text-sm md:text-xl font-hand">
          {project.description}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <a
          href={project.projecturl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-primary hover:bg-primary text-white rounded-md mr-2"
        >
          Project Link
        </a>
        <button
          type="submit"
          onClick={onClose}
          className="px-4 py-2 border border-secondary hover:bg-secondary text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

interface ProjectGalleryProps {
  projects: Project[];
}
const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <Parallax speed={-10} translateY={[-20, 20]} className="">
      <div className="w-full grid grid-cols-2 col-span-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}

        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </div>
    </Parallax>
  );
};

export default ProjectGallery;
