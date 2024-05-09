import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { PhoneNumberValidation } from './PhoneNumberValidation';
import { DateValidation } from './DateValidation';

export const TrialCreation = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productUrl: '',
    notificationTime: '',
    email: '',
    phoneNumber: '',
    customMessage: '',
    expirationDate: '',
    notificationTiming: 'none',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="pt-3">
      <div className="px-6 sm:py-10 lg:px-8 ">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-lg  tracking-widest text-gray-900 sm:text-4xl">
            Create a trial reminder
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm leading-6 text-gray-900"
              >
                What is the name of the service/product you are trialing?
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="product"
                  id="product"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div>
                <label
                  htmlFor="notification-url"
                  className="block text-sm  leading-6 text-gray-900"
                >
                  Service/Product URL
                </label>
                <span className="block text-md text-gray-500">(Optional)</span>
              </div>
              <div className="mt-2.5">
                <input
                  type="url"
                  id="notification-url"
                  name="notification-url"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="expiration-date"
                className="block text-sm leading-6 text-gray-900"
              >
                What is the trial's expiration date?
              </label>
              <DateValidation />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="notification-timing"
                className="block text-sm leading-6 text-gray-900"
              >
                Notification Timing
              </label>
              <div className="mt-2.5">
                <select
                  id="notification-timing"
                  name="notification-timing"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                >
                  <option value="none">All</option>
                  <option value="one-week">One Week Before</option>
                  <option value="three-days">Three Days Before</option>
                  <option value="one-day">One Day Before</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="notification-time"
                className="block text-sm leading-6 text-gray-900"
              >
                What time would you like to receive the notification?
              </label>
              <div className="mt-2.5">
                <input
                  type="time"
                  id="notification-time"
                  name="notification-time"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <h3 className="text-lg tracking-widest sm:col-span-2 pt-5 flex justify-center  text-gray-900 sm:text-3xl ">
              Notification channel
            </h3>
            <span className="block text-md text-gray-500 sm:col-span-2 pb-5">
              Select at least one communication method, either email or phone
              number
            </span>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-gray-900"
              >
                What email address should we use to send you the notification?
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="sm:col-span-2 flex flex-col ">
              <label
                htmlFor="message"
                className="block text-sm leading-6 text-gray-900 py-4"
              >
                What phone number should we use to send you the notification?
              </label>
              <div className="w-full">
                <PhoneNumberValidation />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm leading-6 text-gray-900"
              >
                Would you like to create a custom message?
              </label>
              <span className="block text-md text-gray-500">(Optional)</span>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="tracking-widest block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrialCreation;
