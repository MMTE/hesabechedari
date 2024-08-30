'use client'

import React, { useState } from 'react';
import { DollarSign, PlusCircle } from 'lucide-react';

interface CashDepositProps {
  initialBalance: number;
}

const CashDeposit: React.FC<CashDepositProps> = ({ initialBalance }) => {
  const [balance, setBalance] = useState(initialBalance);
  const [amount, setAmount] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      setBalance(prevBalance => prevBalance + depositAmount);
      setAmount('');
    }
  };

  return (
    <div className="cash-deposit rtl p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
        <DollarSign className="mr-2" />
        افزایش موجودی نقد (بانک)
      </h3>
      <div className="mb-4">
        <p className="text-gray-600">موجودی فعلی:</p>
        <p className="text-2xl font-bold text-green-600">{balance.toLocaleString()} تومان</p>
      </div>
      <form onSubmit={handleDeposit} className="flex items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="مبلغ به تومان"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          min="0"
          step="1000"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default CashDeposit;