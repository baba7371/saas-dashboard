import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import PagePlaceholder from './pages/PagePlaceholder';
import UserDashboard from './pages/user/UserDashboard';
import Billing from './pages/user/Billing';
import Settings from './pages/user/Settings';
import Analytics from './pages/user/Analytics';
import UserManagement from './pages/admin/UserManagement';
import AuthPage from './pages/Auth';

// --- HELPER 1: PROTECTED ROUTE ---
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// --- HELPER 2: PUBLIC ROUTE ---
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole') || 'user';

  if (token) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
};

function App() {
  const userRole = localStorage.getItem('userRole') || 'user';

  // ⚠️ NO <Router> TAG HERE! IT IS ALREADY IN main.jsx
  return (
    <Routes>
      
      {/* 1. ROOT PATH DECISION */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* 2. AUTH PAGE */}
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } 
      />

      {/* 3. PROTECTED USER ROUTES */}
      <Route 
        path="/dashboard/*" 
        element={
          <PrivateRoute>
            <DashboardLayout role={userRole}>
              <Routes>
                <Route index element={<UserDashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="billing" element={<Billing />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </DashboardLayout>
          </PrivateRoute>
        } 
      />

      {/* 4. PROTECTED ADMIN ROUTES */}
      <Route 
        path="/admin/*" 
        element={
          <PrivateRoute>
            <DashboardLayout role="admin">
              <Routes>
                <Route index element={<PagePlaceholder title="Admin Overview" />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="subscriptions" element={<PagePlaceholder title="Subscription Plans" />} />
                <Route path="invoices" element={<PagePlaceholder title="Transactions" />} />
              </Routes>
            </DashboardLayout>
          </PrivateRoute>
        } 
      />

      {/* 404 CATCH-ALL */}
      <Route path="*" element={<Navigate to="/auth" replace />} />

    </Routes>
  );
}

export default App;