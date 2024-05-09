const stats = [
  {
    id: 1,
    name: 'Average wasted annually on forgotten subscriptions',
    value: '$126',
  },
  {
    id: 2,
    name: 'Percentage of people with at least one inactive subscription',
    value: '80%',
  },
  {
    id: 3,
    name: 'Percentage of people who forget to cancel free trials',
    value: '33%',
  },
];

export const Stats = () => {
  return (
    <div className="bg-white py-24 sm:py-32 tracking-widest">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl   text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
export default Stats;
