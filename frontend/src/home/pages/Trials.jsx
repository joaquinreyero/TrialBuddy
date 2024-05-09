import React from 'react';

import { HomeLayout } from '../layout/HomeLayout';
import { TrialList } from '../components/TrialList';

export const Trials = () => {
  return (
    <HomeLayout>
      <>
        <TrialList />
      </>
    </HomeLayout>
  );
};

export default Trials;
