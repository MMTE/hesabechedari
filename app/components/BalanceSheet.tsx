'use client'

import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { formatNumber } from '../utils';

interface BalanceSheetItem {
  name: string;
  amount: number;
}

interface BalanceSheetSection {
  title: string;
  items: BalanceSheetItem[];
}

const BalanceSheet: React.FC = () => {
  const [assets, setAssets] = useState<BalanceSheetSection>({
    title: 'دارایی‌ها',
    items: [
      { name: 'وجه نقد', amount: 0 },
      { name: 'حساب‌های دریافتنی', amount: 0 },
      { name: 'موجودی کالا', amount: 0 },
      { name: 'تجهیزات', amount: 0 },
    ],
  });

  const [liabilities, setLiabilities] = useState<BalanceSheetSection>({
    title: 'بدهی‌ها',
    items: [
      { name: 'حساب‌های پرداختنی', amount: 0 },
      { name: 'وام‌های کوتاه مدت', amount: 0 },
    ],
  });

  const [equity, setEquity] = useState<BalanceSheetSection>({
    title: 'حقوق صاحبان سهام',
    items: [
      { name: 'سرمایه', amount: 0 },
      { name: 'سود انباشته', amount: 0 },
    ],
  });

  const calculateTotal = (section: BalanceSheetSection) => {
    return section.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const totalAssets = calculateTotal(assets);
  const totalLiabilities = calculateTotal(liabilities);
  const totalEquity = calculateTotal(equity);

  useEffect(() => {
    // اینجا می‌توانید اطلاعات واقعی را از API یا state اصلی برنامه دریافت کنید
    // برای مثال، ما مقادیر تصادفی را برای نمایش قرار می‌دهیم
    setAssets(prev => ({
      ...prev,
      items: prev.items.map(item => ({ ...item, amount: Math.floor(Math.random() * 1000000) })),
    }));
    setLiabilities(prev => ({
      ...prev,
      items: prev.items.map(item => ({ ...item, amount: Math.floor(Math.random() * 500000) })),
    }));
    setEquity(prev => ({
      ...prev,
      items: prev.items.map(item => ({ ...item, amount: Math.floor(Math.random() * 500000) })),
    }));
  }, []);

  const renderSection = (section: BalanceSheetSection) => (
    <>
      <tr className="bg-gray-100">
        <th colSpan={2} className="text-right py-2 px-4 font-semibold">{section.title}</th>
      </tr>
      {section.items.map((item, index) => (
        <tr key={index} className="border-b">
          <td className="py-1 px-4">{item.name}</td>
          <td className="py-1 px-4 text-left">{formatNumber(item.amount)} تومان</td>
        </tr>
      ))}
      <tr className="font-semibold">
        <td className="py-2 px-4">جمع {section.title}</td>
        <td className="py-2 px-4 text-left">{formatNumber(calculateTotal(section))} تومان</td>
      </tr>
    </>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FileText className="ml-2" />
        ترازنامه
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2 align-top">
                <table className="w-full">
                  <tbody>
                    {renderSection(assets)}
                  </tbody>
                </table>
              </td>
              <td className="w-1/2 align-top">
                <table className="w-full">
                  <tbody>
                    {renderSection(liabilities)}
                    {renderSection(equity)}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="font-bold text-lg">
              <td className="py-2 px-4 border-t">
                <div className="flex justify-between">
                  <span>جمع کل دارایی‌ها</span>
                  <span>{formatNumber(totalAssets)} تومان</span>
                </div>
              </td>
              <td className="py-2 px-4 border-t">
                <div className="flex justify-between">
                  <span>جمع کل بدهی‌ها و حقوق صاحبان سهام</span>
                  <span>{formatNumber(totalLiabilities + totalEquity)} تومان</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceSheet;