import React from 'react';
import { Wallet, CreditCard, Users, DollarSign, Receipt, Banknote, Building, ShoppingCart, FileText, Briefcase, PiggyBank, Landmark, BarChart, ShoppingBag, Percent, Clock, Calendar, Scissors, Zap } from 'lucide-react';

const AccountingStructure: React.FC = () => {
  return (
    <div className="accounting-structure rtl p-4">
      <div className="main-accounts mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        <div className="text-center p-4 bg-blue-100 rounded-lg">
          <Wallet className="w-12 h-12 mb-2 text-blue-500 mx-auto" />
          <h3 className="font-bold mb-4">دارایی‌ها</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center bg-blue-200 p-2 rounded">
              <Clock className="w-8 h-8 mb-1 text-blue-500 mx-auto" />
              <p className="text-xs font-bold">جاری</p>
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="text-center">
                  <Banknote className="w-6 h-6 mb-1 text-blue-500 mx-auto" />
                  <p className="text-xs">وجه نقد</p>
                </div>
                <div className="text-center">
                  <FileText className="w-6 h-6 mb-1 text-blue-500 mx-auto" />
                  <p className="text-xs">حساب‌های دریافتنی</p>
                </div>
                <div className="text-center">
                  <ShoppingCart className="w-6 h-6 mb-1 text-blue-500 mx-auto" />
                  <p className="text-xs">موجودی کالا</p>
                </div>
              </div>
            </div>
            <div className="text-center bg-blue-200 p-2 rounded">
              <Calendar className="w-8 h-8 mb-1 text-blue-500 mx-auto" />
              <p className="text-xs font-bold">غیرجاری</p>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div className="text-center">
                  <Building className="w-6 h-6 mb-1 text-blue-500 mx-auto" />
                  <p className="text-xs">دارایی‌های ثابت</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-red-100 rounded-lg">
          <CreditCard className="w-12 h-12 mb-2 text-red-500 mx-auto" />
          <h3 className="font-bold mb-4">بدهی‌ها</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center bg-red-200 p-2 rounded">
              <Clock className="w-8 h-8 mb-1 text-red-500 mx-auto" />
              <p className="text-xs font-bold">جاری</p>
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="text-center">
                  <FileText className="w-6 h-6 mb-1 text-red-500 mx-auto" />
                  <p className="text-xs">حساب‌های پرداختنی</p>
                </div>
                <div className="text-center">
                  <Briefcase className="w-6 h-6 mb-1 text-red-500 mx-auto" />
                  <p className="text-xs">وام‌های کوتاه‌مدت</p>
                </div>
              </div>
            </div>
            <div className="text-center bg-red-200 p-2 rounded">
              <Calendar className="w-8 h-8 mb-1 text-red-500 mx-auto" />
              <p className="text-xs font-bold">غیرجاری</p>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div className="text-center">
                  <Landmark className="w-6 h-6 mb-1 text-red-500 mx-auto" />
                  <p className="text-xs">وام‌های بلندمدت</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-green-100 rounded-lg">
          <Users className="w-12 h-12 mb-2 text-green-500 mx-auto" />
          <h3 className="font-bold mb-4">حقوق صاحبان سهام</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <PiggyBank className="w-8 h-8 mb-1 text-green-500 mx-auto" />
              <p className="text-xs">سرمایه</p>
            </div>
            <div className="text-center">
              <BarChart className="w-8 h-8 mb-1 text-green-500 mx-auto" />
              <p className="text-xs">سود انباشته</p>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-yellow-100 rounded-lg">
          <DollarSign className="w-12 h-12 mb-2 text-yellow-500 mx-auto" />
          <h3 className="font-bold mb-4">درآمد</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <ShoppingBag className="w-8 h-8 mb-1 text-yellow-500 mx-auto" />
              <p className="text-xs">فروش کالا</p>
            </div>
            <div className="text-center">
              <Briefcase className="w-8 h-8 mb-1 text-yellow-500 mx-auto" />
              <p className="text-xs">درآمد خدمات</p>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-purple-100 rounded-lg">
          <Receipt className="w-12 h-12 mb-2 text-purple-500 mx-auto" />
          <h3 className="font-bold mb-4">هزینه‌ها</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center bg-purple-200 p-2 rounded">
              <Scissors className="w-8 h-8 mb-1 text-purple-500 mx-auto" />
              <p className="text-xs font-bold">ثابت</p>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div className="text-center">
                  <Building className="w-6 h-6 mb-1 text-purple-500 mx-auto" />
                  <p className="text-xs">اجاره</p>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 mb-1 text-purple-500 mx-auto" />
                  <p className="text-xs">حقوق ثابت</p>
                </div>
              </div>
            </div>
            <div className="text-center bg-purple-200 p-2 rounded">
              <Zap className="w-8 h-8 mb-1 text-purple-500 mx-auto" />
              <p className="text-xs font-bold">متغیر</p>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div className="text-center">
                  <ShoppingCart className="w-6 h-6 mb-1 text-purple-500 mx-auto" />
                  <p className="text-xs">مواد اولیه</p>
                </div>
                <div className="text-center">
                  <Percent className="w-6 h-6 mb-1 text-purple-500 mx-auto" />
                  <p className="text-xs">کمیسیون فروش</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="explanations grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 text-sm">
        <div>
          <h4 className="font-bold text-blue-500 mb-2">دارایی‌ها</h4>
          <p>منابع اقتصادی متعلق به شرکت که انتظار می‌رود در آینده منافع اقتصادی ایجاد کنند. شامل دارایی‌های جاری (مانند وجه نقد و موجودی کالا) و غیرجاری (مانند ساختمان و تجهیزات) می‌شود.</p>
        </div>
        <div>
          <h4 className="font-bold text-red-500 mb-2">بدهی‌ها</h4>
          <p>تعهدات مالی شرکت که باید در آینده پرداخت شوند. شامل بدهی‌های جاری (مانند حساب‌های پرداختنی و وام‌های کوتاه‌مدت) و غیرجاری (مانند وام‌های بلندمدت) می‌شود.</p>
        </div>
        <div>
          <h4 className="font-bold text-green-500 mb-2">حقوق صاحبان سهام</h4>
          <p>ارزش باقیمانده دارایی‌های شرکت پس از کسر بدهی‌ها. شامل سرمایه‌گذاری اولیه مالکان و سود انباشته است که نشان‌دهنده ارزش خالص شرکت می‌باشد.</p>
        </div>
        <div>
          <h4 className="font-bold text-yellow-500 mb-2">درآمد</h4>
          <p>افزایش در منافع اقتصادی طی دوره حسابداری که به شکل ورودی یا افزایش دارایی‌ها یا کاهش بدهی‌ها رخ می‌دهد و منجر به افزایش حقوق صاحبان سهام می‌شود.</p>
        </div>
        <div>
          <h4 className="font-bold text-purple-500 mb-2">هزینه‌ها</h4>
          <p>کاهش در منافع اقتصادی طی دوره حسابداری که به شکل خروجی یا کاهش دارایی‌ها یا افزایش بدهی‌ها رخ می‌دهد. شامل هزینه‌های ثابت (مانند اجاره و حقوق ثابت) و هزینه‌های متغیر (مانند مواد اولیه و کمیسیون فروش) می‌شود.</p>
        </div>
      </div>
    </div>
  );
};

export default AccountingStructure;