'use client'
import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

interface Product {
  id: number;
  name: string;
  price: number;
  type: 'product' | 'service';
}

const ProductServiceInput: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    type: 'product',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handlePriceChange = (price: number) => {
    setNewProduct(prev => ({ ...prev, price }));
  };

  const handleSubmit = () => {
    if (newProduct.name && newProduct.price) {
      if (editingId !== null) {
        setProducts(products.map(product => 
          product.id === editingId ? { ...newProduct, id: product.id } : product
        ));
        setEditingId(null);
      } else {
        setProducts([...products, { ...newProduct, id: Date.now() }]);
      }
      setNewProduct({ name: '', price: 0, type: 'product' });
    }
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setNewProduct(product);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Package className="ml-2" />
        معرفی محصولات و خدمات
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Right column: Input form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">اطلاعات محصول/خدمت</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="نام محصول یا خدمت"
              className="p-2 border rounded-md w-full"
            />
            <PersianNumberInput
              value={newProduct.price}
              onChange={handlePriceChange}
              placeholder="قیمت (تومان)"
              className="p-2 border rounded-md w-full"
            />
            <select
              name="type"
              value={newProduct.type}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
            >
              <option value="product">محصول</option>
              <option value="service">خدمت</option>
            </select>
            <button
              onClick={handleSubmit}
              className="p-2 bg-blue-500 text-white rounded-md flex items-center w-full justify-center"
            >
              {editingId !== null ? <Edit className="ml-2" /> : <Plus className="ml-2" />}
              {editingId !== null ? 'ویرایش محصول/خدمت' : 'افزودن محصول/خدمت'}
            </button>
          </div>
        </div>

        {/* Left column: Product/Service list */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">لیست محصولات و خدمات</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-right">نام</th>
                  <th className="p-2 text-right">نوع</th>
                  <th className="p-2 text-right">قیمت (تومان)</th>
                  <th className="p-2 text-right">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.type === 'product' ? 'محصول' : 'خدمت'}</td>
                    <td className="p-2">{formatNumber(product.price)}</td>
                    <td className="p-2">
                      <button onClick={() => startEditing(product)} className="ml-2 text-blue-500">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductServiceInput;