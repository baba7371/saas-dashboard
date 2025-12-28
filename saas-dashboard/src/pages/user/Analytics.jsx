import React from 'react';
import OverviewChart from '../../components/charts/OverviewChart';
import BarGraph from '../../components/charts/BarGraph';

const Analytics = () => {
  // Mock Data
  const lineData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  const barData = [
    { name: 'Starter', value: 400 },
    { name: 'Pro', value: 300 },
    { name: 'Enterprise', value: 200 },
    { name: 'Custom', value: 100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Usage Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400">Deep dive into your API performance and limits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart data={lineData} />
        <BarGraph data={barData} />
      </div>
    </div>
  );
};

export default Analytics;