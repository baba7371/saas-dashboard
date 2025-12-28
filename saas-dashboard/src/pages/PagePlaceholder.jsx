import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const PagePlaceholder = ({ title }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
        <Button>Action</Button>
      </div>
      <Card className="h-96 flex flex-col items-center justify-center border-dashed border-2 bg-slate-50 dark:bg-slate-800/50">
        <div className="text-slate-400 text-center">
          <p className="text-lg font-medium">Content for {title}</p>
          <p className="text-sm">This page is under construction.</p>
        </div>
      </Card>
    </div>
  );
};

export default PagePlaceholder;