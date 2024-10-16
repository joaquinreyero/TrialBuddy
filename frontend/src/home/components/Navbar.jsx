import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const Navbar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="antialiased  max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <div className="w-full text-gray-700 bg-white ">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a
                href="#"
                className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                TRIAL BUDDY
              </a>
              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => setOpen(!open)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    style={{ display: !open ? 'block' : 'none' }}
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    style={{ display: open ? 'block' : 'none' }}
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <nav
              className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${
                open ? 'flex' : 'hidden'
              }`}
            >
              <a
                href="/trials"
                className="px-4 py-2 mt-2 text-md md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900  focus:outline-none focus:shadow-outline"
              >
                My trials
              </a>
              <a
                href="/profile"
                className="px-4 py-2 mt-2 text-md md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900  focus:outline-none focus:shadow-outline"
              >
                Profile
              </a>
              <a className="px-4 py-2 mt-2 text-md md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900  focus:outline-none focus:shadow-outline">
                Log out
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
