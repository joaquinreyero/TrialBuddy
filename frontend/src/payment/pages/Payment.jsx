import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

import { PayPalButton } from '../components/PayPalButton';

const includedFeatures = [
  'Lifetime membership with unlimited access',
  'Multiple Notification Channels',
  'Notification Preferences Management',
  'Unlimited App Trial Integration',
  'Future Updates',
];

export const Payment = () => {
  return (
    <div className="bg-white py-24 sm:py-32 tracking-widest">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl text-gray-900 sm:text-4xl">
            Simple one-time pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Enjoy a lifetime membership with unlimited access for a one-time
            payment. No hidden fees or recurring charges.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl  text-gray-900">Lifetime membership</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Access all premium features and exclusive benefits with a one-time
              payment. It's the simplest way to enjoy everything our product has
              to offer.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm leading-6 text-indigo-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-4 lg:mt-6 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base  text-gray-600">
                  One-time payment, lifetime access
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl  text-gray-900">$15</span>
                  <span className="text-sm  leading-6  text-gray-600 pb-10">
                    USD
                  </span>
                </p>
                <PayPalButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
