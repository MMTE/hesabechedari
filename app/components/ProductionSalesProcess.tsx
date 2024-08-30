'use client'

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Transaction {
  description: string;
  debit: { account: string; amount: number };
  credit: { account: string; amount: number };
}

const ProductionSalesProcess: React.FC = () => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const steps = [
    {
      title: 'خرید مواد اولیه',
      transactions: [
        {
          description: 'خرید چوب و ملزومات',
          debit: { account: 'موجودی مواد اولیه', amount: 500000 },
          credit: { account: 'موجودی نقد', amount: 500000 },
        },
      ],
    },
    {
      title: 'تولید میز',
      transactions: [
        {
          description: 'مصرف مواد اولیه',
          debit: { account: 'کالای در جریان ساخت', amount: 500000 },
          credit: { account: 'موجودی مواد اولیه', amount: 500000 },
        },
        {
          description: 'ثبت هزینه دستمزد',
          debit: { account: 'کالای در جریان ساخت', amount: 300000 },
          credit: { account: 'هزینه دستمزد پرداختنی', amount: 300000 },
        },
      ],
    },
    {
      title: 'تکمیل تولید',
      transactions: [
        {
          description: 'انتقال به موجودی کالای ساخته شده',
          debit: { account: 'موجودی کالای ساخته شده', amount: 800000 },
          credit: { account: 'کالای در جریان ساخت', amount: 800000 },
        },
      ],
    },
    {
      title: 'فروش میز به آقای احمدی',
      transactions: [
        {
          description: 'ثبت فروش',
          debit: { account: 'حساب‌های دریافتنی', amount: 1200000 },
          credit: { account: 'درآمد فروش', amount: 1200000 },
        },
        {
          description: 'ثبت بهای تمام شده کالای فروش رفته',
          debit: { account: 'بهای تمام شده کالای فروش رفته', amount: 800000 },
          credit: { account: 'موجودی کالای ساخته شده', amount: 800000 },
        },
      ],
    },
    {
      title: 'دریافت وجه از آقای احمدی',
      transactions: [
        {
          description: 'دریافت وجه',
          debit: { account: 'موجودی نقد', amount: 1200000 },
          credit: { account: 'حساب‌های دریافتنی', amount: 1200000 },
        },
      ],
    },
  ];

  const toggleStepExpansion = (index: number) => {
    setExpandedSteps(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const renderTransaction = (transaction: Transaction) => (
    <div className="bg-white p-4 rounded-lg shadow mb-2">
      <p className="font-semibold mb-2">{transaction.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-green-600">بدهکار:</p>
          <p>{transaction.debit.account}: {transaction.debit.amount.toLocaleString()} تومان</p>
        </div>
        <div>
          <p className="text-red-600">بستانکار:</p>
          <p>{transaction.credit.account}: {transaction.credit.amount.toLocaleString()} تومان</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">فرآیند تولید و فروش میز</h2>
      {steps.map((step, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex items-center bg-blue-100 p-3 rounded-lg cursor-pointer"
            onClick={() => toggleStepExpansion(index)}
          >
            {expandedSteps.includes(index) ? (
              <ChevronDown className="ml-2" />
            ) : (
              <ChevronRight className="ml-2" />
            )}
            <h3 className="font-semibold">{step.title}</h3>
          </div>
          {expandedSteps.includes(index) && (
            <div className="mt-2 pr-8">
              {step.transactions.map((transaction, tIndex) => (
                <div key={tIndex}>{renderTransaction(transaction)}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductionSalesProcess;