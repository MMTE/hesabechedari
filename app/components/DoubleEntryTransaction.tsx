import React from 'react';

interface AccountEntry {
  account: string;
  debit: number;
  credit: number;
}

interface TransactionProps {
  date: string;
  description: string;
  entries: AccountEntry[];
}

const DoubleEntryTransaction: React.FC<TransactionProps> = ({ date, description, entries }) => {
  const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="mb-2">
        <span className="font-semibold">تاریخ: </span>
        {date}
      </div>
      <div className="mb-2">
        <span className="font-semibold">شرح: </span>
        {description}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-right">حساب</th>
            <th className="border p-2 text-left">بدهکار (تومان)</th>
            <th className="border p-2 text-left">بستانکار (تومان)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2 text-right">{entry.account}</td>
              <td className="border p-2 text-left">{entry.debit.toLocaleString()}</td>
              <td className="border p-2 text-left">{entry.credit.toLocaleString()}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border p-2 text-right">جمع</td>
            <td className="border p-2 text-left">{totalDebit.toLocaleString()}</td>
            <td className="border p-2 text-left">{totalCredit.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DoubleEntryTransaction;