import React from 'react';
import {
  Parallax,
  ParallaxProvider,
  ParallaxBanner,
} from 'react-scroll-parallax';

// function Component() {
//   return (
//     <ParallaxProvider>
//       <Parallax speed={10}>
//         <div className="flex w-48 h-48 bg-red-500">text</div>
//       </Parallax>
//     </ParallaxProvider>
//   );
// }
const Component = () => (
  <ParallaxBanner
    layers={[
      { image: '/banner.jpg', speed: -20 },
      // { image: '/static/banner-foreground.png', speed: -10 },
    ]}
    className="aspect-[2/1]"
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-8xl text-white font-thin">Hello World!</h1>
    </div>
  </ParallaxBanner>
);

function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Parallax translateY={[20, -20]}>
        <div className="bg-blue-500 p-10 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            React Scroll Parallax Example
          </h1>
          <p className="text-lg">Scroll down to see the parallax effect!</p>
        </div>
      </Parallax>

      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <Parallax translateY={[-80, 80]} speed={-30}>
          <div className="bg-green-500 p-10 text-white text-center">
            <p className="text-lg">This is a parallax section!</p>
          </div>
        </Parallax>
      </div>
      {/* <Component /> */}
    </div>
  );
}

export default Page;
