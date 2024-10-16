import React from 'react';

import { HomeLayout } from '../layout/HomeLayout';
import { TrialCreation } from '../components/trialCreation/TrialCreation';

export const Home = () => {
  return (
    <HomeLayout>
      <>
        <TrialCreation />
      </>
    </HomeLayout>
  );
};

export default Home;
