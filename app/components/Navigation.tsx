import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="mb-8 w-full bg-gray-800 text-white py-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link href="/" className="hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
            خانه
          </Link>
        </li>
        <li>
          <Link href="/bank-accounts" className="hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
            حساب‌های بانکی
          </Link>
        </li>
        <li>
          <Link href="/human-resources" className="hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
            مدیریت منابع انسانی
          </Link>
        </li>
        <li>
          <Link href="/products-services" className="hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
            معرفی محصولات و خدمات
          </Link>
        </li>
        {/* سایر لینک‌های منو */}
      </ul>
    </nav>
  );
}