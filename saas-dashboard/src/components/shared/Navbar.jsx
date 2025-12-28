import React, { useState, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { Button } from '../ui/Button';

const Navbar = ({ toggleSidebar, userRole }) => {
  // 1. State for Dark Mode
  // We initialize it by checking if the 'dark' class is already on the HTML tag
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true; // Default to dark mode
  });

  // 2. State for Notifications
  const [hasUnread, setHasUnread] = useState(true);

  // 3. The Toggle Function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // This is the magic line that actually changes the theme in Tailwind
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNotificationClick = () => {
    setHasUnread(false); // Clear the red dot
    alert("You have 3 new notifications:\n1. Invoice #004 Failed\n2. New User Registered\n3. Weekly Report Ready");
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-8 z-20">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white hidden md:block capitalize">
          {userRole} Dashboard
        </h2>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="hidden sm:flex items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            // Added specific text colors for visibility in both modes
            className="h-9 pl-9 pr-4 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all text-slate-900 dark:text-white"
          />
        </div>

        {/* Notification Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full relative"
          onClick={handleNotificationClick}
        >
          <Bell size={20} />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
          )}
        </Button>

        {/* Theme Toggle Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            // Show Sun icon when in Dark Mode (to switch to light)
            <Sun size={20} className="text-amber-400" />
          ) : (
            // Show Moon icon when in Light Mode (to switch to dark)
            <Moon size={20} className="text-slate-600" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;