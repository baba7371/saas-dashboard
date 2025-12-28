import React from 'react';
import { Zap, CreditCard, Activity, Users } from 'lucide-react';
import StatsCard from '../../components/shared/StatsCard';
import OverviewChart from '../../components/charts/OverviewChart';
import { Button } from '../../components/ui/Button';

// Mock Data
const usageData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const UserDashboard = () => {
  const handleDownload = () => {
    alert("Downloading report... (This is a demo action)");
  };

  const handleUpgrade = () => {
    alert("Redirecting to payment gateway...");
    // In a real app, you would use: navigate('/dashboard/billing');
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening with your account.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleDownload}>Download Report</Button>
          <Button onClick={handleUpgrade}>Upgrade Plan</Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Requests" 
          value="128,430" 
          trend="up" 
          trendValue="12%" 
          icon={Zap} 
        />
        <StatsCard 
          title="Avg. Latency" 
          value="45ms" 
          trend="down" 
          trendValue="3ms" 
          icon={Activity} 
        />
        <StatsCard 
          title="Current Plan" 
          value="Pro" 
          trend="neutral" 
          icon={CreditCard} 
        />
        <StatsCard 
          title="Active Users" 
          value="1,234" 
          trend="up" 
          trendValue="4%" 
          icon={Users} 
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart takes up 2/3rds width on large screens */}
        <div className="lg:col-span-2">
          <OverviewChart data={usageData} />
        </div>

        {/* Quick Actions / Status Card (Takes up 1/3rd) */}
        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Upgrade to Enterprise</h3>
            <p className="text-indigo-100 text-sm mb-6">
              Get unlimited API calls, priority support, and dedicated infrastructure.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-full bg-indigo-500/50 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-[75%]"></div>
            </div>
            <p className="text-xs text-indigo-100">75% of your quota used</p>
            <button className="w-full py-2 bg-white text-indigo-600 font-semibold rounded-lg text-sm hover:bg-indigo-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;