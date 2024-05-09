import {
  CursorArrowRaysIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/20/solid';

export const Product = ({ reference }) => {
  return (
    <div
      ref={reference}
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 tracking-widest"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden"></div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-2xl  text-gray-900 sm:text-3xl">
                Avoid Unwanted Charges
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Our notification system keeps you informed before your free
                trials expire, so you can make an informed decision: continue
                using the service or cancel hassle-free.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="/test.jpgf"
            alt="Demo"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CursorArrowRaysIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Simple Free Trial Entry
                    </strong>{' '}
                    Easily add your free trials to our platform with a few
                    clicks.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ClockIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Timely Notifications
                    </strong>{' '}
                    Get notified before your trial ends, giving you plenty of
                    time to decide.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ClipboardDocumentCheckIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Organized Overview
                    </strong>{' '}
                    Keep track of all your active and upcoming trials in one
                    place.
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl  text-gray-900">
                No inbox scanning required
              </h2>
              <p className="mt-6">
                You're in complete control of your free trial information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
