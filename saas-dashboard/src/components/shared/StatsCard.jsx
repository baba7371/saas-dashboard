import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

const StatsCard = ({ 
  title, 
  value, 
  trend = 'neutral', 
  trendValue, 
  icon: Icon = Activity 
}) => {
  
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {value}
          </h3>
        </div>
        <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg">
          <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      
      {/* Trend Indicator */}
      {(trendValue) && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn(
            "flex items-center font-medium",
            isPositive ? "text-emerald-600 dark:text-emerald-400" : 
            isNeutral ? "text-slate-600" : "text-rose-600 dark:text-rose-400"
          )}>
            {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : 
             isNeutral ? null : <ArrowDownRight size={16} className="mr-1" />}
            {trendValue}
          </span>
          <span className="text-slate-500 dark:text-slate-400 ml-2">
            vs last month
          </span>
        </div>
      )}
    </Card>
  );
};

export default StatsCard;