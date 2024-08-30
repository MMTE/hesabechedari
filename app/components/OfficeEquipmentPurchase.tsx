'use client'

import React, { useState } from 'react';
import { DollarSign, Briefcase } from 'lucide-react';

interface Equipment {
  name: string;
  price: number;
}

const OfficeEquipmentPurchase: React.FC = () => {
  const [bankBalance, setBankBalance] = useState(100000000); // Initial balance: 100,000,000 Tomans
  const [assets, setAssets] = useState<Equipment[]>([]);
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentPrice, setEquipmentPrice] = useState('');

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(equipmentPrice);
    if (equipmentName && price && price <= bankBalance) {
      setBankBalance(prevBalance => prevBalance - price);
      setAssets(prevAssets => [...prevAssets, { name: equipmentName, price }]);
      setEquipmentName('');
      setEquipmentPrice('');
    } else if (price > bankBalance) {
      alert('موجودی حساب کافی نیست!');
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">خرید تجهیزات اداری</h2>
      
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <DollarSign className="w-8 h-8 mb-2 text-green-500 mx-auto" />
          <p className="font-bold">موجودی حساب بانکی</p>
          <p>{bankBalance.toLocaleString()} تومان</p>
        </div>
        <div className="text-center">
          <Briefcase className="w-8 h-8 mb-2 text-blue-500 mx-auto" />
          <p className="font-bold">ارزش دارایی‌های غیرجاری</p>
          <p>{assets.reduce((sum, item) => sum + item.price, 0).toLocaleString()} تومان</p>
        </div>
      </div>
      
      <form onSubmit={handlePurchase} className="mb-4">
        <input
          type="text"
          value={equipmentName}
          onChange={(e) => setEquipmentName(e.target.value)}
          placeholder="نام تجهیزات"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          value={equipmentPrice}
          onChange={(e) => setEquipmentPrice(e.target.value)}
          placeholder="قیمت (تومان)"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          خرید
        </button>
      </form>
      
      <h3 className="font-bold mb-2">لیست تجهیزات خریداری شده:</h3>
      <ul className="list-disc list-inside">
        {assets.map((item, index) => (
          <li key={index}>
            {item.name}: {item.price.toLocaleString()} تومان
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfficeEquipmentPurchase;