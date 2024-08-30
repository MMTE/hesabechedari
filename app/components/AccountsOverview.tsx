'use client'

import React from 'react';
import AccountsReceivable from './AccountsReceivable';
import AccountsPayable from './AccountsPayable';

const AccountsOverview: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">مرور حساب‌ها</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <AccountsReceivable />
        </div>
        <div className="w-full md:w-1/2">
          <AccountsPayable />
        </div>
      </div>
    </div>
  );
};

export default AccountsOverview;