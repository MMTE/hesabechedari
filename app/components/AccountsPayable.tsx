'use client'

import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import DoubleEntryTransaction from './DoubleEntryTransaction';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

interface PayableAccount {
  id: number;
  vendor: string;
  amount: number;
  dueDate: string;
  description: string;
}

const AccountsPayable: React.FC = () => {
  const [payables, setPayables] = useState<PayableAccount[]>([]);
  const [newPayable, setNewPayable] = useState<Omit<PayableAccount, 'id'>>({
    vendor: '',
    amount: 0,
    dueDate: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPayable(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (amount: number) => {
    setNewPayable(prev => ({ ...prev, amount }));
  };

  const handleSubmit = () => {
    if (newPayable.vendor && newPayable.amount && newPayable.dueDate) {
      if (editingId !== null) {
        setPayables(payables.map(payable => 
          payable.id === editingId ? { ...newPayable, id: payable.id } : payable
        ));
        setEditingId(null);
      } else {
        setPayables([...payables, { ...newPayable, id: Date.now() }]);
      }
      setNewPayable({ vendor: '', amount: 0, dueDate: '', description: '' });
    }
  };

  const startEditing = (payable: PayableAccount) => {
    setEditingId(payable.id);
    setNewPayable(payable);
  };

  const deletePayable = (id: number) => {
    setPayables(payables.filter(payable => payable.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="ml-2" />
        حساب‌های پرداختنی
      </h3>
      
      <div className="space-y-4">
        {/* فرم ورودی */}
        <div>
          <h4 className="text-lg font-semibold mb-2">افزودن حساب پرداختنی جدید</h4>
          <div className="space-y-2">
            <input
              type="text"
              name="vendor"
              value={newPayable.vendor}
              onChange={handleInputChange}
              placeholder="نام فروشنده"
              className="p-2 border rounded-md w-full"
            />
            <PersianNumberInput
              value={newPayable.amount}
              onChange={handleAmountChange}
              placeholder="مبلغ (تومان)"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="date"
              name="dueDate"
              value={newPayable.dueDate}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
            />
            <textarea
              name="description"
              value={newPayable.description}
              onChange={handleInputChange}
              placeholder="توضیحات"
              className="p-2 border rounded-md w-full"
            />
            <button
              onClick={handleSubmit}
              className="p-2 bg-blue-500 text-white rounded-md flex items-center w-full justify-center"
            >
              {editingId !== null ? <Edit className="ml-2" /> : <Plus className="ml-2" />}
              {editingId !== null ? 'ویرایش حساب پرداختنی' : 'افزودن حساب پرداختنی'}
            </button>
          </div>
        </div>

        {/* لیست حساب‌های پرداختنی */}
        <div>
          <h4 className="text-lg font-semibold mb-2">لیست حساب‌های پرداختنی</h4>
          <div className="space-y-2">
            {payables.map(payable => (
              <div key={payable.id} className="border p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{payable.vendor}</span>
                  <span className="text-red-600 font-bold">{formatNumber(payable.amount)} تومان</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">تاریخ سررسید: {payable.dueDate}</p>
                <p className="text-sm mb-1">{payable.description}</p>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => startEditing(payable)} className="text-blue-500">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deletePayable(payable.id)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <DoubleEntryTransaction
        date="1402/12/15"
        description="پرداخت به فروشنده الف"
        entries={[
          { account: "حساب‌های پرداختنی", debit: 1000000, credit: 0 },
          { account: "موجودی نقد", debit: 0, credit: 1000000 },
        ]}
      />
    </div>
  );
};

export default AccountsPayable;