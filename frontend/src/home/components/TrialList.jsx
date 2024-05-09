import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const TrialList = () => {
  const [trials, setTrials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = getCookie('user_id');
        const response = await axios.get(
          `http://localhost:8001/api/v1/trial/${user_id}`,
        );
        setTrials(response.data);
      } catch (error) {
        console.error('Error fetching trials:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeactivate = async (id) => {
    try {
      await axios.get(
        `http://localhost:8001/api/v1/notification/confirm/${id}`,
      );
      console.log('Elemento desactivado con éxito:', id);
    } catch (error) {
      console.error('Error al desactivar elemento:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md w-full tracking-widest">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-900 font-semibold">Trial list</h2>
          <span className="text-xs">All trials notification</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md"></div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <a
              href="/home"
              className="bg-indigo-600 px-4 py-2 rounded-md text-white  cursor-pointer"
            >
              New trial
            </a>
          </div>
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service/product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expiration date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trials.map((trial) => (
                <tr key={trial.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {trial.trial}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {trial.url}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {trial.expiry_date}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleDeactivate(trial.id)}
                      className="bg-red-500 px-4 py-2 rounded-md text-white cursor-pointer"
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div>
        </div>
      </div>
    </div>
  );
};
export default TrialList;
