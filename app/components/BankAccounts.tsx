'use client'

import React, { useState } from 'react';
import { Wallet, PiggyBank, Clock, Plus, Edit, Trash2, Info } from 'lucide-react';
import Image from 'next/image';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

interface Bank {
  id: number;
  name: string;
  logo: string;
}

interface Account {
  id: number;
  type: string;
  balance: number;
  icon: React.ReactNode;
  bankId: number;
}

const banks: Bank[] = [
  { id: 1, name: 'بانک صادرات', logo: '/banks/saderat.webp' },
  { id: 2, name: 'بانک ملت', logo: '/banks/mellat.webp' },
  { id: 3, name: 'بانک پاسارگاد', logo: '/banks/pasargad.webp' },
  // اضافه کردن بانک‌های دیگر
];

const BankAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, type: 'حساب جاری', balance: 0, icon: <Wallet className="w-6 h-6 text-blue-500" />, bankId: 1 },
    { id: 2, type: 'حساب پس‌انداز', balance: 0, icon: <PiggyBank className="w-6 h-6 text-green-500" />, bankId: 2 },
    { id: 3, type: 'سپرده مدت‌دار', balance: 0, icon: <Clock className="w-6 h-6 text-purple-500" />, bankId: 3 },
  ]);

  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedBankId, setSelectedBankId] = useState<number>(0);

  const handleDeposit = () => {
    if (selectedAccount && amount && selectedBankId) {
      setAccounts(accounts.map(account => 
        account.type === selectedAccount && account.bankId === selectedBankId
          ? { ...account, balance: account.balance + Number(amount) }
          : account
      ));
      setAmount('');
      setSelectedAccount('');
    }
  };

  const startEditing = (account: Account) => {
    setEditingId(account.id);
    setSelectedAccount(account.type);
    setSelectedBankId(account.bankId);
    setAmount(account.balance.toString());
  };

  const saveEdit = () => {
    setAccounts(accounts.map(account => 
      account.id === editingId 
        ? { ...account, balance: Number(amount), bankId: selectedBankId }
        : account
    ));
    setEditingId(null);
    setSelectedAccount('');
    setSelectedBankId(0);
    setAmount('');
  };

  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleAmountChange = (amount: number) => {
    setAmount(amount.toString());
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Wallet className="ml-2" />
        حساب‌های بانکی
      </h2>

      {/* باکس اطلاع‌رسانی جدید */}
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded">
        <p className="flex items-center font-bold">
          <Info className="ml-2" />
          نکته مهم:
        </p>
        <p>پس از ثبت شرکت، مراحل زیر را برای افتتاح حساب بانکی شرکت انجام دهید:</p>
        <ol className="list-decimal list-inside mt-2">
          <li>با در دست داشتن مدارک ثبت شرکت به یکی از شعب بانک‌های معتبر مراجعه کنید.</li>
          <li>درخواست افتتاح حساب جاری برای شرکت را ارائه دهید.</li>
          <li>فرم‌های مربوطه را با دقت تکمیل کنید.</li>
          <li>مدارک مورد نیاز شامل اساسنامه، آگهی تأسیس و روزنامه رسمی را ارائه دهید.</li>
          <li>پس از تأیید بانک، حساب جاری شرکت افتتاح خواهد شد.</li>
        </ol>
        <p className="mt-2">توجه: داشتن حساب بانکی رسمی برای انجام تراکنش‌های مالی شرکت ضروری است.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Right column: Input form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">مدیریت حساب</h3>
          <div className="space-y-4">
            <select
              value={selectedBankId}
              onChange={(e) => setSelectedBankId(Number(e.target.value))}
              className="p-2 border rounded-md w-full"
            >
              <option value={0}>انتخاب بانک</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>{bank.name}</option>
              ))}
            </select>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="">انتخاب نوع حساب</option>
              <option value="حساب جاری">حساب جاری</option>
              <option value="حساب پس‌انداز">حساب پس‌انداز</option>
              <option value="سپرده مدت‌دار">سپرده مدت‌دار</option>
            </select>
            <PersianNumberInput
              value={amount}
              onChange={handleAmountChange}
              placeholder="مبلغ (تومان)"
              className="p-2 border rounded-md w-full"
            />
            <button
              onClick={editingId !== null ? saveEdit : handleDeposit}
              className="p-2 bg-blue-500 text-white rounded-md flex items-center w-full justify-center"
            >
              {editingId !== null ? <Edit className="ml-2" /> : <Plus className="ml-2" />}
              {editingId !== null ? 'ذخیره تغییرات' : 'افزودن / واریز به حساب'}
            </button>
          </div>
        </div>

        {/* Left column: Account list */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">لیست حساب‌ها</h3>
          <div className="space-y-4">
            {accounts.map((account) => {
              const bank = banks.find(b => b.id === account.bankId);
              return (
                <div key={account.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    {bank && (
                      <Image
                        src={bank.logo}
                        alt={bank.name}
                        width={24}
                        height={24}
                        className="ml-2"
                      />
                    )}
                    {account.icon}
                    <span className="mx-2 font-semibold">{account.type}</span>
                    <span className="text-sm text-gray-500">({bank?.name})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold ml-4">{formatNumber(account.balance)} تومان</span>
                    <button onClick={() => startEditing(account)} className="ml-2 text-blue-500">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteAccount(account.id)} className="text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;