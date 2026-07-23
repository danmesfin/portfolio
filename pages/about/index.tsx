import React from 'react';
import About from '../../components/About';
import Seo from '../../components/Seo';

const Page = () => (
  <div className="w-full flex">
    <Seo
      title="About"
      description="How Daniel Mesfin went from writing HTML on an Android phone in 2017 to building full-stack products for clients worldwide."
      path="/about"
    />
    <About />
  </div>
);

export default Page;
