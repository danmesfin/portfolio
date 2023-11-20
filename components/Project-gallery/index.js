import { useState } from 'react';
import Image from 'next/image';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition transform duration-300 hover:scale-105"
    >
      <div className="relative w-72 h-72 md:w-96 shadow-md shadow-gray-600 dark:shadow-gray-900">
        <Image
          src={project.imgurl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm">{project.role}</p>
      </div>
    </div>
  );
};
const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base p-6 rounded-md max-w-xl w-full text-center">
        <h2 className="text-2xl font-display font-bold mb-2">
          {project.title}
        </h2>
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
            onClick={onClose}
            className="px-4 py-2 border border-secondary hover:bg-secondary text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectGallery = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          onClick={() => openModal(project)}
        />
      ))}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProjectGallery;
