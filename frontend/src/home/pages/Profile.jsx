import React from 'react';

import { Navbar } from '../components/Navbar';

export const Profile = () => {
  return (
    <div className="flex">
      <div className="flex">
        <Navbar />
      </div>
      <div className="w-full">
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Profile;
