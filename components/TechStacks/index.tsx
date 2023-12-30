import React from 'react';

import PartnersSection from './Scroll';

// interface TechItemProps {
//   icon: React.ReactNode;
//   label: string;
// }

// const TechItem: React.FC<TechItemProps> = ({ icon, label }) => (
//   <div className="flex flex-col items-center gap-2 mt-4 hover:scale-105 transform transition-transform">
//     {icon}
//     <span className="text-center text-sm md:text-lg lg:text-xl block mt-2">
//       {label}
//     </span>
//   </div>
// );

const TechStack: React.FC = () => (
  <div
    id="TechStack"
    className="h-[30rem] w-full overflow-hidden items-center justify-center bg-gray-100 dark:bg-zinc-800"
  >
    <div className="w-full flex px-4 my-8 md:my-16 justify-center mx-auto">
      <h2 className="self-center text-5xl font-extrabold mb-4 text-center font-display">
        My tech Stacks
      </h2>
    </div>
    <PartnersSection />
  </div>
);

export default TechStack;
