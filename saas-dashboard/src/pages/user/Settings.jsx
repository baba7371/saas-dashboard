import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { User, Mail, Camera, Loader2 } from 'lucide-react';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  
  // Initialize state from LocalStorage
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    bio: 'Frontend Developer building cool dashboards.',
    avatar: localStorage.getItem('userAvatar') || '' // 👈 Load existing avatar
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    securityAlerts: true,
    marketing: false,
  });

  // --- 1. HANDLE FILE UPLOAD ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert to Base64 and update state
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 2. SAVE CHANGES TO BACKEND ---
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://saas-dashboard-z4sg.onrender.com/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email, // Identify user by email
          avatar: formData.avatar,
          name: formData.firstName
        }),
      });

      const data = await res.json();
      if(res.ok) {
        // Update LocalStorage instantly
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userAvatar', data.user.avatar);
        
        // Force a page reload or event dispatch to update Sidebar instantly
        window.dispatchEvent(new Event("storage"));
        alert("Profile Updated Successfully!");
        window.location.reload(); // Simple way to refresh sidebar
      } else {
        alert("Failed to update.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your profile details and preferences.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <User size={20} className="text-indigo-600" />
          Public Profile
        </h3>
        
        {/* --- AVATAR UPLOAD SECTION --- */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group cursor-pointer">
            {/* Display Image or Initial */}
            {formData.avatar ? (
              <img 
                src={formData.avatar} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 border-4 border-white dark:border-slate-800 shadow-sm">
                {formData.firstName.charAt(0)}
              </div>
            )}

            {/* Hidden Input Trigger */}
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800 cursor-pointer hover:bg-indigo-700 transition-colors">
              <Camera size={14} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">Profile Photo</h4>
            <p className="text-sm text-slate-500 mb-2">Recommended 400x400px.</p>
            <div className="flex gap-3">
              <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium hover:bg-slate-50 text-slate-900 transition-colors">
                Change
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
            <input 
              type="text" 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email (Read Only)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="email" 
                value={formData.email}
                disabled
                className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed" 
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications (Existing Code...) */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notifications</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          <Toggle label="Email me about product updates" checked={notifications.emailUpdates} onChange={(val) => setNotifications(prev => ({ ...prev, emailUpdates: val }))} />
          <Toggle label="Security alerts" checked={notifications.securityAlerts} onChange={(val) => setNotifications(prev => ({ ...prev, securityAlerts: val }))} />
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default Settings;