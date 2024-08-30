'use client'

import React, { useState } from 'react';
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react';
import PersianNumberInput from './PersianNumberInput';
import { formatNumber } from '../utils';

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  hireDate: string;
}

const HumanResources: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    position: '',
    salary: 0,
    hireDate: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
  };

  const handleSalaryChange = (salary: number) => {
    setNewEmployee(prev => ({ ...prev, salary }));
  };

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.salary && newEmployee.hireDate) {
      setEmployees(prev => [...prev, { ...newEmployee, id: Date.now() }]);
      setNewEmployee({ name: '', position: '', salary: 0, hireDate: '' });
    }
  };

  const startEditing = (employee: Employee) => {
    setEditingId(employee.id);
    setNewEmployee(employee);
  };

  const saveEdit = () => {
    setEmployees(prev => prev.map(emp => emp.id === editingId ? { ...newEmployee, id: emp.id } : emp));
    setEditingId(null);
    setNewEmployee({ name: '', position: '', salary: 0, hireDate: '' });
  };

  const deleteEmployee = (id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Users className="ml-2" />
        مدیریت منابع انسانی
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Right column: Input form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">اطلاعات کارمند</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              placeholder="نام کارمند"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              placeholder="سمت"
              className="p-2 border rounded-md w-full"
            />
            <PersianNumberInput
              value={newEmployee.salary}
              onChange={handleSalaryChange}
              placeholder="حقوق (تومان)"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="date"
              name="hireDate"
              value={newEmployee.hireDate}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
            />
            <button
              onClick={editingId !== null ? saveEdit : addEmployee}
              className="p-2 bg-blue-500 text-white rounded-md flex items-center w-full justify-center"
            >
              {editingId !== null ? <Edit className="ml-2" /> : <UserPlus className="ml-2" />}
              {editingId !== null ? 'ذخیره تغییرات' : 'افزودن کارمند'}
            </button>
          </div>
        </div>

        {/* Left column: Employee list */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">لیست کارمندان</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-right">نام</th>
                  <th className="p-2 text-right">سمت</th>
                  <th className="p-2 text-right">حقوق (تومان)</th>
                  <th className="p-2 text-right">تاریخ استخدام</th>
                  <th className="p-2 text-right">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id} className="border-b">
                    <td className="p-2">{employee.name}</td>
                    <td className="p-2">{employee.position}</td>
                    <td className="p-2">{formatNumber(employee.salary)}</td>
                    <td className="p-2">{employee.hireDate}</td>
                    <td className="p-2">
                      <button onClick={() => startEditing(employee)} className="ml-2 text-blue-500">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteEmployee(employee.id)} className="text-red-500">
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

export default HumanResources;