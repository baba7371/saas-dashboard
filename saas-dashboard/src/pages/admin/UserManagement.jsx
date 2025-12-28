import React from 'react';
import DataTable from '../../components/shared/DataTable';
import { MoreHorizontal, Shield, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// --- REMOVED THE BADGE IMPORT FROM HERE ---

// 1. Mock Data
const usersData = [
  { id: 1, name: 'Alice Freeman', email: 'alice@example.com', role: 'Admin', status: 'Active', plan: 'Enterprise', lastLogin: '2 mins ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'User', status: 'Active', plan: 'Pro', lastLogin: '2 hours ago' },
  { id: 3, name: 'Charlie Kim', email: 'charlie@startup.io', role: 'User', status: 'Suspended', plan: 'Starter', lastLogin: '4 days ago' },
  { id: 4, name: 'David Lee', email: 'david@agency.net', role: 'User', status: 'Pending', plan: 'Free', lastLogin: 'Never' },
  { id: 5, name: 'Eva Green', email: 'eva@design.co', role: 'User', status: 'Active', plan: 'Pro', lastLogin: '1 day ago' },
];

// 2. Local Helper for Status Badges
const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    suspended: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status.toLowerCase()] || styles.pending}`}>
      {status}
    </span>
  );
};

const UserManagement = () => {
  const columns = [
    { 
      header: 'User', 
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      accessor: 'role',
      render: (row) => (
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          {row.role === 'Admin' ? <ShieldAlert size={16} className="text-indigo-600" /> : <Shield size={16} />}
          <span>{row.role}</span>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (row) => <StatusBadge status={row.status} /> 
    },
    { header: 'Current Plan', accessor: 'plan' },
    { header: 'Last Login', accessor: 'lastLogin', render: (row) => <span className="text-slate-500 text-xs">{row.lastLogin}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage all registered users.</p>
        </div>
        <Button>+ Add New User</Button>
      </div>

      <DataTable 
        title="All Users" 
        columns={columns} 
        data={usersData}
        actionLabel="Export CSV"
      />
    </div>
  );
};

export default UserManagement;