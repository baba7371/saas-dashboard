import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { User, Mail, Lock, Bell, Camera } from 'lucide-react';

const Settings = () => {
  // Mock State for Form Fields
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    bio: 'Frontend Developer building cool dashboards.',
  });

  // Mock State for Toggles
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    securityAlerts: true,
    marketing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your profile details and preferences.</p>
      </div>

      {/* 1. Profile Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <User size={20} className="text-indigo-600" />
          Public Profile
        </h3>
        
        {/* Avatar Upload Mockup */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 border-4 border-white dark:border-slate-800 shadow-sm">
              JD
            </div>
            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800">
              <Camera size={14} />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">Profile Photo</h4>
            <p className="text-sm text-slate-500 mb-2">Recommended 400x400px.</p>
            <div className="flex gap-3">
              <Button size="sm" variant="secondary">Change</Button>
              <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20">Remove</Button>
            </div>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Notifications Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell size={20} className="text-indigo-600" />
          Notifications
        </h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          <Toggle 
            label="Email me about product updates" 
            checked={notifications.emailUpdates}
            onChange={(val) => setNotifications(prev => ({ ...prev, emailUpdates: val }))}
          />
          <Toggle 
            label="Security alerts (recommended)" 
            checked={notifications.securityAlerts}
            onChange={(val) => setNotifications(prev => ({ ...prev, securityAlerts: val }))}
          />
          <Toggle 
            label="Marketing newsletters" 
            checked={notifications.marketing}
            onChange={(val) => setNotifications(prev => ({ ...prev, marketing: val }))}
          />
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={() => alert('Changes Saved!')}>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;