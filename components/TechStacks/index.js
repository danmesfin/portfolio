import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaFire,
  FaRobot,
} from 'react-icons/fa';
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
      <div className="flex flex-wrap w-full justify-center">
        <div className="w-full flex px-4 my-8 md:my-16 justify-center mx-auto">
          <h2 className="self-center text-5xl font-extrabold mb-4 text-center font-display">
            My tech Stacks
          </h2>
        </div>
        <div className="w-full flex px-4 md:px-14 items-center font-hand">
          <div className="grid grid-cols-2 md:grid-cols-4 mx-auto items-center justify-center text-center">
            <TechItem icon={<SiJavascript size={40} />} label="JavaScript" />
            <TechItem icon={<SiTypescript size={40} />} label="TypeScript" />
            <TechItem icon={<SiNodedotjs size={40} />} label="Node.js" />
            <TechItem icon={<SiNextdotjs size={40} />} label="Next.js" />
            <TechItem icon={<SiGraphql size={40} />} label="GraphQL" />
            <TechItem icon={<SiRedux size={40} />} label="Redux" />
            <TechItem icon={<FaReact size={40} />} label="React.js" />
            <TechItem
              icon={<FaRobot size={40} />}
              label="Artificial Intelligence"
            />
            <TechItem icon={<SiTensorflow size={40} />} label="TensorFlow.js" />
            <TechItem icon={<FaPython size={40} />} label="Python" />
            <TechItem icon={<FaDatabase size={40} />} label="Databases" />
            <TechItem icon={<FaFire size={40} />} label="Firebase" />
          </div>
        </div>
      </div>
    </div>
  );
}

const TechItem = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-4 hover:scale-105 transform transition-transform">
      {icon}
      <span className="text-center text-xl block mt-2">{label}</span>
    </div>
  );
};
