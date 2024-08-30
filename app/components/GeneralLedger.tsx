'use client'

import React, { useState } from 'react';
import { Book, PlusCircle } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
  account: string;
}

const GeneralLedger: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: '',
    description: '',
    debit: 0,
    credit: 0,
    account: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: name === 'debit' || name === 'credit' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTransaction.date && newTransaction.description && newTransaction.account) {
      setTransactions(prev => [
        ...prev,
        { ...newTransaction, id: Date.now() },
      ]);
      setNewTransaction({
        date: '',
        description: '',
        debit: 0,
        credit: 0,
        account: '',
      });
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Book className="mr-2" />
        دفتر کل
      </h2>

      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
          placeholder="شرح"
          className="p-2 border rounded"
          required
        />
        <select
          name="account"
          value={newTransaction.account}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        >
          <option value="">انتخاب حساب</option>
          <option value="دارایی">دارایی</option>
          <option value="بدهی">بدهی</option>
          <option value="درآمد">درآمد</option>
          <option value="هزینه">هزینه</option>
          <option value="سرمایه">سرمایه</option>
        </select>
        <input
          type="number"
          name="debit"
          value={newTransaction.debit || ''}
          onChange={handleInputChange}
          placeholder="بدهکار"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="credit"
          value={newTransaction.credit || ''}
          onChange={handleInputChange}
          placeholder="بستانکار"
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded flex items-center justify-center">
          <PlusCircle className="mr-2" />
          افزودن تراکنش
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-right">تاریخ</th>
              <th className="p-2 text-right">شرح</th>
              <th className="p-2 text-right">حساب</th>
              <th className="p-2 text-right">بدهکار</th>
              <th className="p-2 text-right">بستانکار</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className="border-b">
                <td className="p-2">{transaction.date}</td>
                <td className="p-2">{transaction.description}</td>
                <td className="p-2">{transaction.account}</td>
                <td className="p-2">{transaction.debit.toLocaleString()} ریال</td>
                <td className="p-2">{transaction.credit.toLocaleString()} ریال</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralLedger;