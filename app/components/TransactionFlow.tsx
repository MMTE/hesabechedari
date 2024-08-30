'use client'

import React, { useState } from 'react';
import { ArrowRight, DollarSign, Plus, Minus, Info } from 'lucide-react';

interface Transaction {
  id: number;
  from: string;
  to: string;
  amount: number;
  description: string;
}

const TransactionFlow: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    from: '',
    to: '',
    amount: 0,
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleSubmit = () => {
    if (newTransaction.from && newTransaction.to && newTransaction.amount) {
      setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
      setNewTransaction({ from: '', to: '', amount: 0, description: '' });
    }
  };

  const entities = ['بانک', 'صندوق', 'مشتری', 'فروشنده', 'کارمند', 'شرکت'];

  const getTransactionExplanation = (transaction: Transaction) => {
    const { from, to, amount, description } = transaction;
    let explanation = '';

    switch (true) {
      case from === 'مشتری' && to === 'شرکت':
        explanation = `${from} بستانکار شده زیرا پول پرداخت کرده، و ${to} بدهکار شده زیرا کالا یا خدمات ارائه کرده است. این یک تراکنش فروش است.`;
        break;
      case from === 'شرکت' && to === 'فروشنده':
        explanation = `${from} بستانکار شده زیرا کالا یا خدمات دریافت کرده، و ${to} بدهکار شده زیرا پول دریافت کرده است. این یک تراکنش خرید است.`;
        break;
      case from === 'شرکت' && to === 'کارمند':
        explanation = `${from} بستانکار شده زیرا خدمات کارمند را دریافت کرده، و ${to} بدهکار شده زیرا حقوق دریافت کرده است. این پرداخت حقوق است.`;
        break;
      case from === 'بانک' && to === 'شرکت':
        explanation = `${from} بستانکار شده زیرا پول را از حساب شرکت کم کرده، و ${to} بدهکار شده زیرا پول را دریافت کرده است. این یک برداشت از حساب بانکی است.`;
        break;
      case from === 'شرکت' && to === 'بانک':
        explanation = `${from} بستانکار شده زیرا پول را به حساب بانکی واریز کرده، و ${to} بدهکار شده زیرا مبلغ را به حساب شرکت اضافه کرده است. این یک واریز به حساب بانکی است.`;
        break;
      default:
        explanation = `${from} بستانکار شده زیرا منبع پول است، و ${to} بدهکار شده زیرا دریافت‌کننده پول است.`;
    }

    return explanation;
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <DollarSign className="ml-2" />
        جریان مالی
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">ثبت تراکنش جدید</h3>
        <div className="flex flex-wrap gap-4">
          <select
            name="from"
            value={newTransaction.from}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          >
            <option value="">از (بستانکار)</option>
            {entities.map(entity => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
          </select>
          <select
            name="to"
            value={newTransaction.to}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          >
            <option value="">به (بدهکار)</option>
            {entities.map(entity => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            placeholder="مبلغ (تومان)"
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="توضیحات"
            className="p-2 border rounded-md flex-grow"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded-md flex items-center"
          >
            <Plus className="mr-2" />
            افزودن تراکنش
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {transactions.map(transaction => (
          <div key={transaction.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 ml-4">
                <div className="bg-green-500 text-white p-2 rounded-full">
                  <Plus size={24} />
                </div>
                <div>
                  <span className="font-semibold">{transaction.from}</span>
                  <p className="text-sm text-gray-600">بستانکار</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ArrowRight size={32} className="text-gray-500" />
                <span className="font-bold text-green-600">{transaction.amount.toLocaleString()} تومان</span>
                <span className="text-sm text-gray-600">{transaction.description}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <span className="font-semibold">{transaction.to}</span>
                  <p className="text-sm text-gray-600">بدهکار</p>
                </div>
                <div className="bg-red-500 text-white p-2 rounded-full">
                  <Minus size={24} />
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-100 p-3 rounded-md flex items-start">
              <Info className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-800">{getTransactionExplanation(transaction)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionFlow;