import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { FaReact, FaPython, FaDatabase, FaFire, FaRobot } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiRedux,
  SiGraphql,
  SiTypescript,
  SiNodedotjs,
  SiJavascript,
  SiTensorflow,
} from 'react-icons/si';

interface TechItemProps {
  icon: React.ReactNode;
  label: string;
}

const TechItem: React.FC<TechItemProps> = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 mt-4 hover:scale-105 transform transition-transform">
    {icon}
    <span className="text-center md:text-lg lg:text-xl block mt-2">
      {label}
    </span>
  </div>
);

const TechStack: React.FC = () => (
  <div
    className="h-[80rem] w-full flex flex-col justify-center mx-auto py-8 md:py-10 bg-gradient-to-b from-gray-300 to-base text-white dark:from-black"
    id="TechStack"
  >
    <div className="flex flex-wrap w-full justify-center">
      <div className="w-full flex px-4 my-8 md:my-16 justify-center mx-auto">
        <h2 className="self-center text-5xl font-extrabold mb-4 text-center font-display">
          My tech Stacks
        </h2>
      </div>
      <div className="flex flex-col flex-wrap md:flex-nowrap gap-6 font-normal font-display">
        <Parallax>
          <div className="flex gap-4 md:gap-12 items-center justify-center text-center parallax-container">
            <TechItem icon={<SiJavascript size={40} />} label="JavaScript" />
            <TechItem icon={<SiTypescript size={40} />} label="TypeScript" />
            <TechItem icon={<SiNodedotjs size={40} />} label="Node.js" />
            <TechItem icon={<SiNextdotjs size={40} />} label="Next.js" />
          </div>
        </Parallax>
        <Parallax>
          <div className="flex flex-wrap gap-4 md:gap-12 items-center justify-center text-center parallax-container">
            <Parallax>
              <TechItem icon={<SiGraphql size={40} />} label="GraphQL" />
            </Parallax>
            <Parallax>
              <TechItem icon={<SiRedux size={40} />} label="Redux" />
            </Parallax>
            <Parallax>
              <TechItem icon={<FaReact size={40} />} label="React.js" />
            </Parallax>
            <Parallax>
              <TechItem
                icon={<FaRobot size={40} />}
                label="Artificial Intelligence"
              />
            </Parallax>
          </div>
        </Parallax>
        <Parallax>
          <div className="flex gap-4 md:gap-12 items-center justify-center text-center parallax-container">
            <Parallax>
              <TechItem
                icon={<SiTensorflow size={40} />}
                label="TensorFlow.js"
              />
            </Parallax>
            <Parallax>
              <TechItem icon={<FaPython size={40} />} label="Python" />
            </Parallax>
            <Parallax>
              <TechItem icon={<FaDatabase size={40} />} label="Databases" />
            </Parallax>
            <Parallax>
              <TechItem icon={<FaFire size={40} />} label="Firebase" />
            </Parallax>
          </div>
        </Parallax>
      </div>
    </div>
  </div>
);

export default TechStack;
