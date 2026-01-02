import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  PieChart,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ role = 'user', isCollapsed, toggleCollapse }) => {
  const navigate = useNavigate();

  // 1. Get Real User Data from Local Storage
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const userAvatar = localStorage.getItem('userAvatar');

  // Get the first letter for the avatar (e.g., "Baba" -> "B")
  const userInitial = userName.charAt(0).toUpperCase();

  // 2. Define Menu Items based on Role
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

  // 3. Logout Function
  const handleLogout = () => {
    // Clear all stored data
    localStorage.clear();
    // Redirect to Auth page
    navigate('/auth');
  };

  return (
    <div className="flex flex-col h-full relative">

      {/* --- A. Logo Area --- */}
      <div className={cn(
        "h-16 flex items-center border-b border-slate-200 dark:border-slate-700 transition-all duration-300",
        isCollapsed ? "justify-center px-0" : "px-6"
      )}>
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain rounded-md"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="whitespace-nowrap leading-none">SaaS Dashboard</span>
              {/* 👇 ADDED YOUR SIGNATURE HERE */}
              <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">
                Created by AKT
              </span>
            </div>
          )}
        </div>
      </div>

      {/* --- B. Navigation Links --- */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {!isCollapsed && (
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 transition-opacity duration-300">
            Menu
          </p>
        )}

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard' || item.path === '/admin'}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group relative",
              isActive
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200",
              isCollapsed && "justify-center px-2" // Center icons when collapsed
            )}
          >
            <item.icon size={20} className="flex-shrink-0" />

            {/* Logic to hide text */}
            {!isCollapsed ? (
              <span className="whitespace-nowrap">{item.label}</span>
            ) : (
              /* Tooltip for collapsed state */
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-md">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* --- C. Collapse Toggle Button (Desktop Only) --- */}
      <button
        onClick={toggleCollapse}
        className="hidden md:flex absolute -right-3 top-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 shadow-sm text-slate-500 hover:text-indigo-600 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* --- D. User Profile Snippet --- */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group",
            isCollapsed && "justify-center px-0"
          )}
          title="Log Out"
        >
          {/* Dynamic Avatar Initial */}
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm flex-shrink-0 ring-2 ring-white dark:ring-slate-800">
            {userInitial}
          </div>

          {!isCollapsed && (
            <>
              <div className="text-left flex-1 min-w-0">
                {/* Dynamic Name */}
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate capitalize">
                  {userName}
                </p>
                {/* Dynamic Email */}
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {userEmail}
                </p>
              </div>
              <LogOut size={16} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;