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

export default function TechStack() {
  return (
    <div
      className="w-full flex flex-col justify-center mx-auto  py-8 md:py-10 bg-base"
      id="TechStack"
    >
      <div className="flex flex-wrap w-full justify-center border">
        <div className="w-full flex px-4 my-8 md:my-16 justify-center mx-auto">
          <h2 className="self-center text-5xl font-extrabold mb-4 text-center font-display">
            My tech Stacks
          </h2>
        </div>
        <Parallax translateX={[-10, 10]} speed={2}>
          <div className="flex gap-12 left-24 border items-center justify-center text-center parallax-container">
            <TechItem icon={<SiJavascript size={40} />} label="JavaScript" />
            <TechItem icon={<SiTypescript size={40} />} label="TypeScript" />
          </div>{' '}
        </Parallax>
        <div className="w-full flex px-4 md:px-14 items-center font-hand ">
          <div className="flex gap-12 mx-auto items-center justify-center text-center parallax-container">
            <Parallax translateX={[-10, 10]} speed={2}>
              <TechItem icon={<SiJavascript size={40} />} label="JavaScript" />
            </Parallax>
            <Parallax translateX={[-15, 15]} speed={3}>
              <TechItem icon={<SiTypescript size={40} />} label="TypeScript" />
            </Parallax>
            <Parallax translateX={[-20, 20]} speed={4}>
              <TechItem icon={<SiNodedotjs size={40} />} label="Node.js" />
            </Parallax>
            <Parallax translateX={[-25, 25]} speed={5}>
              <TechItem icon={<SiNextdotjs size={40} />} label="Next.js" />
            </Parallax>
            <Parallax translateX={[-10, 10]} speed={2}>
              <TechItem icon={<SiGraphql size={40} />} label="GraphQL" />
            </Parallax>
            <Parallax translateX={[-15, 15]} speed={3}>
              <TechItem icon={<SiRedux size={40} />} label="Redux" />
            </Parallax>
            <Parallax translateX={[-20, 20]} speed={4}>
              <TechItem icon={<FaReact size={40} />} label="React.js" />
            </Parallax>
            <Parallax translateX={[-25, 25]} speed={5}>
              <TechItem
                icon={<FaRobot size={40} />}
                label="Artificial Intelligence"
              />
            </Parallax>
            <Parallax translateX={[-10, 10]} speed={2}>
              <TechItem
                icon={<SiTensorflow size={40} />}
                label="TensorFlow.js"
              />
            </Parallax>
            <Parallax translateX={[-15, 15]} speed={3}>
              <TechItem icon={<FaPython size={40} />} label="Python" />
            </Parallax>
            <Parallax translateX={[-20, 20]} speed={4}>
              <TechItem icon={<FaDatabase size={40} />} label="Databases" />
            </Parallax>
            <Parallax translateX={[-25, 25]} speed={5}>
              <TechItem icon={<FaFire size={40} />} label="Firebase" />
            </Parallax>
          </div>
        </div>
      </div>
    </div>
  );
}

const TechItem = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 mt-4 hover:scale-105 transform transition-transform">
    {icon}
    <span className="text-center text-xl block mt-2">{label}</span>
  </div>
);
