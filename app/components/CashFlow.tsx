'use client'

import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PlusCircle, MinusCircle } from 'lucide-react';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

interface CashFlowItem {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

const CashFlow: React.FC = () => {
  const [cashFlowItems, setCashFlowItems] = useState<CashFlowItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<CashFlowItem, 'id'>>({
    description: '',
    amount: 0,
    type: 'income',
    date: new Date().toISOString().split('T')[0],
  });

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [netCashFlow, setNetCashFlow] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [cashFlowItems]);

  const calculateTotals = () => {
    const income = cashFlowItems.filter(item => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = cashFlowItems.filter(item => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
    setNetCashFlow(income - expense);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (amount: number) => {
    setNewItem(prev => ({ ...prev, amount }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.description && newItem.amount && newItem.date) {
      setCashFlowItems(prev => [...prev, { ...newItem, id: Date.now() }]);
      setNewItem({
        description: '',
        amount: 0,
        type: 'income',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <DollarSign className="ml-2" />
        جریان نقدی
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* فرم ورودی */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">افزودن مورد جدید</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="توضیحات"
              className="p-2 border rounded-md w-full"
              required
            />
            <PersianNumberInput
              value={newItem.amount.toString()}
              onChange={handleAmountChange}
              placeholder="مبلغ (تومان)"
              className="p-2 border rounded-md w-full"
            />
            <select
              name="type"
              value={newItem.type}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            >
              <option value="income">درآمد</option>
              <option value="expense">هزینه</option>
            </select>
            <input
              type="date"
              name="date"
              value={newItem.date}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md flex items-center w-full justify-center"
            >
              <PlusCircle className="ml-2" />
              افزودن مورد
            </button>
          </form>
        </div>

        {/* نمایش خلاصه و لیست موارد */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">خلاصه جریان نقدی</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700">کل درآمد</h4>
              <p className="text-2xl font-bold text-green-600">{formatNumber(totalIncome)} تومان</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700">کل هزینه</h4>
              <p className="text-2xl font-bold text-red-600">{formatNumber(totalExpense)} تومان</p>
            </div>
            <div className={`p-4 rounded-lg ${netCashFlow >= 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
              <h4 className="font-semibold text-blue-700">جریان نقدی خالص</h4>
              <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
                {formatNumber(Math.abs(netCashFlow))} تومان
                {netCashFlow >= 0 ? <TrendingUp className="inline ml-1" /> : <TrendingDown className="inline ml-1" />}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">لیست موارد</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {cashFlowItems.map(item => (
              <div key={item.id} className={`p-2 rounded-lg ${item.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.description}</span>
                  <span className={`font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'income' ? '+' : '-'} {formatNumber(item.amount)} تومان
                  </span>
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;