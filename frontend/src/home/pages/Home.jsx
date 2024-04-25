import React from 'react';

import { NoficationCreate } from '../components/NoficationCreate';
import { Navbar } from '../components/Navbar';

export const Home = () => {
  return (
    <div className="flex">
      <div className="flex">
        <Navbar />
      </div>
      <div className="w-full">
        <NoficationCreate />
      </div>
    </div>
  );
};

export default Home;
