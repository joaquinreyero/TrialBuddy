import React from 'react';

export const Hero = ({ scrollToProduct, scrollToPricing }) => {
  return (
    <div className="relative isolate px-6 pt-20 lg:px-8 tracking-widest">
      <div className="mx-auto max-w-2xl py-22 sm:py-38 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl  tracking-widest text-gray-900 sm:text-4xl">
            Never pay for an unwanted subscription again
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Tired of forgetting about free trials and ending up with unwanted
            charges? Our product notifies you before your free trials end, so
            you can cancel them hassle-free.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={scrollToPricing}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started
            </button>
            <button
              onClick={scrollToProduct}
              className="text-sm  leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
