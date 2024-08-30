'use client'

import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

interface ReceivableAccount {
  id: number;
  customer: string;
  amount: number;
  dueDate: string;
  description: string;
}

const AccountsReceivable: React.FC = () => {
  const [receivables, setReceivables] = useState<ReceivableAccount[]>([]);
  const [newReceivable, setNewReceivable] = useState<Omit<ReceivableAccount, 'id'>>({
    customer: '',
    amount: 0,
    dueDate: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReceivable(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleAmountChange = (amount: number) => {
    setNewReceivable(prev => ({ ...prev, amount }));
  };

  const handleSubmit = () => {
    if (newReceivable.customer && newReceivable.amount && newReceivable.dueDate) {
      if (editingId !== null) {
        setReceivables(receivables.map(receivable => 
          receivable.id === editingId ? { ...newReceivable, id: receivable.id } : receivable
        ));
        setEditingId(null);
      } else {
        setReceivables([...receivables, { ...newReceivable, id: Date.now() }]);
      }
      setNewReceivable({ customer: '', amount: 0, dueDate: '', description: '' });
    }
  };

  const startEditing = (receivable: ReceivableAccount) => {
    setEditingId(receivable.id);
    setNewReceivable(receivable);
  };

  const deleteReceivable = (id: number) => {
    setReceivables(receivables.filter(receivable => receivable.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="ml-2" />
        حساب‌های دریافتنی
      </h3>
      
      <div className="space-y-4">
        {/* فرم ورودی */}
        <div>
          <h4 className="text-lg font-semibold mb-2">افزودن حساب دریافتنی جدید</h4>
          <div className="space-y-2">
            <input
              type="text"
              name="customer"
              value={newReceivable.customer}
              onChange={handleInputChange}
              placeholder="نام مشتری"
              className="p-2 border rounded-md w-full"
            />
            <PersianNumberInput
              value={newReceivable.amount}
              onChange={handleAmountChange}
              placeholder="مبلغ (تومان)"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="date"
              name="dueDate"
              value={newReceivable.dueDate}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
            />
            <textarea
              name="description"
              value={newReceivable.description}
              onChange={handleInputChange}
              placeholder="توضیحات"
              className="p-2 border rounded-md w-full"
            />
            <button
              onClick={handleSubmit}
              className="p-2 bg-blue-500 text-white rounded-md flex items-center w-full justify-center"
            >
              {editingId !== null ? <Edit className="ml-2" /> : <Plus className="ml-2" />}
              {editingId !== null ? 'ویرایش حساب دریافتنی' : 'افزودن حساب دریافتنی'}
            </button>
          </div>
        </div>

        {/* لیست حساب‌های دریافتنی */}
        <div>
          <h4 className="text-lg font-semibold mb-2">لیست حساب‌های دریافتنی</h4>
          <div className="space-y-2">
            {receivables.map(receivable => (
              <div key={receivable.id} className="border p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{receivable.customer}</span>
                  <span className="text-green-600 font-bold">{formatNumber(receivable.amount)} تومان</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">تاریخ سررسید: {receivable.dueDate}</p>
                <p className="text-sm mb-1">{receivable.description}</p>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => startEditing(receivable)} className="text-blue-500">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteReceivable(receivable.id)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsReceivable;