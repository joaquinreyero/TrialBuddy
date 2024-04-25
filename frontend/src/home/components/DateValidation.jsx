import React from 'react';

export const DateValidation = () => {
  return (
    <div className="mt-2.5">
      <input
        type="date"
        id="expiration-date"
        name="expiration-date"
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default DateValidation;
