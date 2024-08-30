import Navigation from "@/app/components/Navigation";
import BankAccounts from "@/app/components/BankAccounts";

export default function BankAccountsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <h1 className="text-2xl mb-4">حساب‌های بانکی</h1>
      <BankAccounts />
    </div>
  );
}