import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion'; // 👈 Import Motion

const StatsCard = ({
  title,
  value,
  trend = 'neutral',
  trendValue,
  icon: Icon = Activity,
  delay = 0 // 👈 New prop for staggered loading
}) => {

  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }} // Staggered entry
      whileHover={{ y: -5, transition: { duration: 0.2 } }} // Lift up on hover
    >
      <Card className="hover:shadow-lg transition-shadow cursor-default group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {title}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              {value}
            </h3>
          </div>
          <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
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
    </motion.div>
  );
};

export default StatsCard;
