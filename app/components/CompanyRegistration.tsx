'use client'

import React, { useState } from 'react';
import { Building2, Rocket, Users, DollarSign } from 'lucide-react';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

const CompanyRegistration: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [founders, setFounders] = useState(['', '']);
  const [boardMembers, setBoardMembers] = useState(['', '', '']);
  const [initialBalance, setInitialBalance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && companyType && initialBalance) {
      setIsRegistered(true);
    }
  };

  const handleInitialBalanceChange = (balance: number) => {
    setInitialBalance(balance.toString());
  };

  const renderFoundersInput = () => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">موسسین شرکت:</label>
      {founders.map((founder, index) => (
        <input
          key={index}
          type="text"
          value={founder}
          onChange={(e) => {
            const newFounders = [...founders];
            newFounders[index] = e.target.value;
            setFounders(newFounders);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder={`نام موسس ${index + 1}`}
          required
        />
      ))}
    </div>
  );

  const renderBoardMembersInput = () => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">اعضای هیئت مدیره:</label>
      {boardMembers.map((member, index) => (
        <input
          key={index}
          type="text"
          value={member}
          onChange={(e) => {
            const newBoardMembers = [...boardMembers];
            newBoardMembers[index] = e.target.value;
            setBoardMembers(newBoardMembers);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder={`نام عضو هیئت مدیره ${index + 1}`}
          required
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-8 w-full">
      {!isRegistered ? (
        <div className="company-registration rtl p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Right column: Title and Description */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">
                <Building2 className="inline-block ml-2 mb-1" />
                ثبت شرکت
              </h2>
              <p className="text-gray-600 mb-4">
                ثبت شرکت اولین قدم در راه‌اندازی کسب و کار رسمی شما است. با پر کردن فرم زیر، مشخصات اولیه شرکت خود را ثبت کنید. این اطلاعات برای ایجاد ساختار حسابداری و مدیریت مالی شرکت شما ضروری است.
              </p>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <h3 className="font-bold">نکات مهم:</h3>
                <ul className="list-disc list-inside mt-2">
                  <li>نام شرکت باید منحصر به فرد باشد.</li>
                  <li>نوع شرکت بر اساس قوانین تجاری انتخاب شود.</li>
                  <li>موجودی اولیه، سرمایه اولیه شرکت را مشخص می‌کند.</li>
                  <li>اطلاعات موسسین و اعضای هیئت مدیره باید دقیق و کامل باشد.</li>
                </ul>
              </div>
            </div>

            {/* Left column: Registration Form */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
                <Rocket className="inline-block ml-2 mb-1" />
                فرم ثبت شرکت
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">نام شرکت:</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="companyType" className="block text-sm font-medium text-gray-700">نوع شرکت:</label>
                  <select
                    id="companyType"
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="private">سهامی خاص</option>
                    <option value="limited">مسئولیت محدود</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">موجودی اولیه (تومان):</label>
                  <PersianNumberInput
                    value={initialBalance}
                    onChange={handleInitialBalanceChange}
                    placeholder="موجودی اولیه (تومان)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                
                {companyType && (
                  <>
                    {renderFoundersInput()}
                    {companyType === 'private' && renderBoardMembersInput()}
                  </>
                )}
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ثبت شرکت
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="registered-info p-4 bg-green-100 rounded-lg">
          <h3 className="text-xl font-bold text-green-600 mb-2">تبریک! شرکت شما با موفقیت ثبت شد.</h3>
          <p>نام شرکت: {companyName}</p>
          <p>نوع شرکت: {companyType === 'private' ? 'سهامی خاص' : 'مسئولیت محدود'}</p>
          <p>موجودی اولیه: {formatNumber(Number(initialBalance))} تومان</p>
          {/* اینجا می‌توانید اطلاعات بیشتری را نمایش دهید */}
        </div>
      )}
    </div>
  );
};

export default CompanyRegistration;