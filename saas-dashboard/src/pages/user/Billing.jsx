import React from 'react';
import DataTable from '../../components/shared/DataTable';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// 1. Status Badge Helper
const StatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    failed: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
  };

  const icons = {
    paid: CheckCircle,
    pending: Clock,
    failed: AlertCircle
  };

  const Icon = icons[status.toLowerCase()] || Clock;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status.toLowerCase()] || styles.pending}`}>
      <Icon size={12} className="mr-1.5" />
      <span className="capitalize">{status}</span>
    </span>
  );
};

// 2. Mock Data for Invoices
const invoices = [
  { id: 'INV-001', date: 'Dec 01, 2023', amount: '$29.00', plan: 'Pro Plan', status: 'Paid' },
  { id: 'INV-002', date: 'Nov 01, 2023', amount: '$29.00', plan: 'Pro Plan', status: 'Paid' },
  { id: 'INV-003', date: 'Oct 01, 2023', amount: '$29.00', plan: 'Pro Plan', status: 'Paid' },
  { id: 'INV-004', date: 'Sep 01, 2023', amount: '$29.00', plan: 'Pro Plan', status: 'Failed' },
  { id: 'INV-005', date: 'Aug 01, 2023', amount: '$19.00', plan: 'Starter', status: 'Paid' },
  { id: 'INV-006', date: 'Jul 01, 2023', amount: '$19.00', plan: 'Starter', status: 'Paid' },
];

const Billing = () => {
  // Define columns for the DataTable
  const columns = [
    { header: 'Invoice ID', accessor: 'id', render: (row) => <span className="font-medium text-indigo-600 dark:text-indigo-400">#{row.id}</span> },
    { header: 'Date', accessor: 'date' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Billing & Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your subscription and payment history.</p>
        </div>
      </div>

      {/* Current Plan Summary */}
      <Card className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <CreditCard size={32} />
            </div>
            <div>
              <p className="text-indigo-200 text-sm font-medium">Current Subscription</p>
              <h2 className="text-2xl font-bold">Pro Plan <span className="text-lg font-normal text-indigo-200">/ $29 mo</span></h2>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
              Cancel Plan
            </Button>
            <Button className="bg-white text-indigo-900 hover:bg-indigo-50 border-none">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </Card>

      {/* Invoices Table */}
      <DataTable 
        title="Invoice History" 
        columns={columns} 
        data={invoices} 
        actionLabel="Download All"
      />
    </div>
  );
};

export default Billing;