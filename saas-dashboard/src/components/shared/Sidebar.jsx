import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  PieChart, 
  FileText,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ role = 'user' }) => {
  // Define navigation items based on role
  const navItems = role === 'admin' ? [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Subscriptions', icon: CreditCard, path: '/admin/subscriptions' },
    { label: 'Invoices', icon: FileText, path: '/admin/invoices' },
  ] : [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Analytics', icon: PieChart, path: '/dashboard/analytics' },
    { label: 'Billing', icon: CreditCard, path: '/dashboard/billing' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            S
          </div>
          <span>SaaSify</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard' || item.path === '/admin'}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* User Profile Snippet (Bottom) */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm">
            {role === 'admin' ? 'AD' : 'JD'}
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {role === 'admin' ? 'Admin User' : 'John Doe'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {role === 'admin' ? 'admin@saasify.com' : 'john@example.com'}
            </p>
          </div>
          <LogOut size={16} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;