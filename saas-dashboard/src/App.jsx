import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import PagePlaceholder from './pages/PagePlaceholder';
import UserDashboard from './pages/user/UserDashboard';
import Billing from './pages/user/Billing';
import UserManagement from './pages/admin/UserManagement.jsx';
import Settings from './pages/user/Settings.jsx';
import Analytics from './pages/user/Analytics.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to user dashboard for demo purposes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ----------------------------- */}
        {/* USER PANEL ROUTES             */}
        {/* ----------------------------- */}
        <Route 
          path="/dashboard/*" 
          element={
            <DashboardLayout role="user">
              <Routes>
                {/* Default User Dashboard */}
                <Route index element={<UserDashboard />} />
                
                {/* Sub-pages */}
                <Route path="analytics" element={<Analytics />} />
                <Route path="billing" element={<Billing />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </DashboardLayout>
          } 
        />

        {/* ----------------------------- */}
        {/* ADMIN PANEL ROUTES            */}
        {/* ----------------------------- */}
        <Route 
          path="/admin/*" 
          element={
            <DashboardLayout role="admin">
              <Routes>
                {/* Default Admin Dashboard */}
                <Route index element={<PagePlaceholder title="Admin Overview" />} />
                
                {/* Sub-pages */}
                <Route path="users" element={<UserManagement />} />
                <Route path="subscriptions" element={<PagePlaceholder title="Subscription Plans" />} />
                <Route path="invoices" element={<PagePlaceholder title="Transactions" />} />
              </Routes>
            </DashboardLayout>
          } 
        />

        {/* 404 Catch-all */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-slate-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900">404</h1>
              <p className="text-slate-600 mb-4">Page not found</p>
              <a href="/" className="text-indigo-600 hover:underline">Go Home</a>
            </div>
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;