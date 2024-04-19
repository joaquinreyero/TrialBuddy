import React from 'react'

import { Sidebars } from '../components/Sidebars'
import { NoficationCreate } from '../components/NoficationCreate'

export const Home = () => {
  return (
    <div className="flex">
      <div className="flex">
        <Sidebars />
      </div>
      <div className="w-full">
        <NoficationCreate />
      </div>
    </div>
  )
}

export default Home