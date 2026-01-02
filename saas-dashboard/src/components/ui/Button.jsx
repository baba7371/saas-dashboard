import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  
  const variantsStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700",
    ghost: "hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-2 flex items-center justify-center",
  };

  return (
    <motion.button
      ref={ref}
      // 1. Add Micro-Interactions here
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
        variantsStyles[variant], // Renamed to avoid conflict with motion variants
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";