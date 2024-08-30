'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, FileText, Upload } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  children?: Account[];
}

const defaultAccounts: Account[] = [
  {
    "id": "1",
    "name": "دارایی‌ها",
    "children": [
      {
        "id": "1.1",
        "name": "دارایی‌های جاری",
        "children": [
          { "id": "1.1.1", "name": "وجه نقد" },
          { "id": "1.1.2", "name": "حساب‌های دریافتنی" },
          { "id": "1.1.3", "name": "موجودی کالا" },
          { "id": "1.1.4", "name": "پیش‌پرداخت‌ها" }
        ]
      },
      {
        "id": "1.2",
        "name": "دارایی‌های ثابت",
        "children": [
          { "id": "1.2.1", "name": "زمین" },
          { "id": "1.2.2", "name": "ساختمان" },
          { "id": "1.2.3", "name": "تجهیزات" },
          { "id": "1.2.4", "name": "ماشین‌آلات" }
        ]
      },
      {
        "id": "1.3",
        "name": "دارایی‌های نامشهود",
        "children": [
          { "id": "1.3.1", "name": "حق اختراع" },
          { "id": "1.3.2", "name": "حق تألیف" }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "بدهی‌ها",
    "children": [
      {
        "id": "2.1",
        "name": "بدهی‌های جاری",
        "children": [
          { "id": "2.1.1", "name": "حساب‌های پرداختنی" },
          { "id": "2.1.2", "name": "وام‌های کوتاه‌مدت" },
          { "id": "2.1.3", "name": "پیش‌دریافت‌ها" }
        ]
      },
      {
        "id": "2.2",
        "name": "بدهی‌های بلندمدت",
        "children": [
          { "id": "2.2.1", "name": "وام‌های بلندمدت" },
          { "id": "2.2.2", "name": "بدهی‌های تأسیساتی" }
        ]
      }
    ]
  },
  {
    "id": "3",
    "name": "سرمایه",
    "children": [
      { "id": "3.1", "name": "سرمایه صاحبان سهام" },
      { "id": "3.2", "name": "سود و زیان انباشته" }
    ]
  },
  {
    "id": "4",
    "name": "درآمدها",
    "children": [
      { "id": "4.1", "name": "درآمد حاصل از فروش" },
      { "id": "4.2", "name": "درآمدهای غیرعملیاتی" }
    ]
  },
  {
    "id": "5",
    "name": "هزینه‌ها",
    "children": [
      {
        "id": "5.1",
        "name": "هزینه‌های عملیاتی",
        "children": [
          { "id": "5.1.1", "name": "هزینه‌های پرسنلی" },
          { "id": "5.1.2", "name": "هزینه‌های اجاره" },
          { "id": "5.1.3", "name": "هزینه‌های تأمین مواد" }
        ]
      },
      {
        "id": "5.2",
        "name": "هزینه‌های غیرعملیاتی",
        "children": [
          { "id": "5.2.1", "name": "هزینه‌های مالی" },
          { "id": "5.2.2", "name": "هزینه‌های زیان" }
        ]
      }
    ]
  }
]
;

const AccountItem: React.FC<{ account: Account; level: number }> = ({ account, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-2">
      <div 
        className={`flex items-center cursor-pointer p-2 rounded hover:bg-gray-100 ${level === 0 ? 'font-extrabold' : ''}`}
        style={{ paddingRight: `${level * 20}px` }}
        onClick={toggleOpen}
      >
        {!account.children &&(
              <FileText size={20} className="ml-2" />
          ) }
        <span className="ml-2">{account.id}</span>
        <span>{account.name}</span>
        {account.children &&(
          isOpen ? <ChevronDown size={20} /> : <ChevronLeft size={20} />
        ) }
      </div>
      {isOpen && account.children && (
        <div>
          {account.children.map(child => (
            <AccountItem key={child.id} account={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const ChartOfAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);
  const [jsonInput, setJsonInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chart' | 'json'>('chart');

  const handleJsonSubmit = () => {
    try {
      const parsedAccounts = JSON.parse(jsonInput);
      setAccounts(parsedAccounts);
      setActiveTab('chart');
    } catch (error) {
      alert('JSON نامعتبر است. لطفاً دوباره بررسی کنید.');
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">نمودار حساب‌ها</h2>
      <div className="mb-4">
        <button
          className={`ml-2 px-4 py-2 rounded ${activeTab === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('chart')}
        >
          نمودار حساب‌ها
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'json' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('json')}
        >
          وارد کردن JSON
        </button>
      </div>
      {activeTab === 'chart' ? (
        <div className="chart-of-accounts">
          {accounts.map(account => (
            <AccountItem key={account.id} account={account} level={0} />
          ))}
        </div>
      ) : (
        <div className="json-input">
          <textarea
            className="w-full h-64 p-2 border rounded"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="JSON نمودار حساب‌ها را اینجا وارد کنید..."
          />
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded flex items-center"
            onClick={handleJsonSubmit}
          >
            <Upload className="mr-2" />
            بارگذاری JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartOfAccounts;