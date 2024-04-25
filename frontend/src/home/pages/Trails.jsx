import React from 'react';

import { Navbar } from '../components/Navbar';
import { NoficationCreate } from '../components/NoficationCreate';

export const Trails = () => {
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

export default Trails;
