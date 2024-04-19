import React from 'react'

import { Sidebars } from '../components/Sidebars'

export const Profile = () => {
  return (
    <div className="flex">
      <div className="flex">
        <Sidebars />
      </div>
      <div className="w-full">
        <h1>Hello</h1>
      </div>
    </div>
  )
}

export default Profile