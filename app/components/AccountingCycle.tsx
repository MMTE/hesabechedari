'use client'

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Transaction {
  description: string;
  debit: { account: string; amount: number };
  credit: { account: string; amount: number };
}

const AccountingCycle: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const steps = [
    {
      title: 'تولید میز',
      transactions: [
        {
          description: 'ثبت هزینه‌های تولید',
          debit: { account: 'هزینه‌های تولید', amount: 1000000 },
          credit: { account: 'حساب‌های پرداختنی', amount: 1000000 },
        },
      ],
    },
    {
      title: 'انبارش میز',
      transactions: [
        {
          description: 'ثبت انبارش کالا',
          debit: { account: 'موجودی کالا', amount: 1000000 },
          credit: { account: 'هزینه‌های تولید', amount: 1000000 },
        },
      ],
    },
    {
      title: 'فروش میز به آقای احمدی',
      transactions: [
        {
          description: 'ثبت فروش کالا',
          debit: { account: 'حساب‌های دریافتنی', amount: 1500000 },
          credit: { account: 'درآمد فروش', amount: 1500000 },
        },
      ],
    },
    {
      title: 'دریافت وجه از آقای احمدی',
      transactions: [
        {
          description: 'ثبت دریافت وجه',
          debit: { account: 'نقد', amount: 1500000 },
          credit: { account: 'حساب‌های دریافتنی', amount: 1500000 },
        },
      ],
    },
    {
      title: 'کاهش موجودی کالا',
      transactions: [
        {
          description: 'ثبت کاهش موجودی کالا',
          debit: { account: 'هزینه کالاهای فروخته‌شده', amount: 1000000 },
          credit: { account: 'موجودی کالا', amount: 1000000 },
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
      <h2 className="text-2xl font-bold mb-4">چرخه حسابداری فروش میز</h2>
      {steps.map((step, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex items-center bg-blue-100 p-3 rounded-lg cursor-pointer"
            onClick={() => toggleStepExpansion(index)}
          >
            {expandedSteps.includes(index) ? (
              <ChevronDown className="mr-2" />
            ) : (
              <ChevronRight className="mr-2" />
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

export default AccountingCycle;