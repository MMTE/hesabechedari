import Navigation from "@/app/components/Navigation";
import CompanyRegistration from "@/app/components/CompanyRegistration";
import ProductServiceInput from "@/app/components/ProductServiceInput";
import OfficeEquipmentPurchase from "@/app/components/OfficeEquipmentPurchase";
import GeneralLedger from "@/app/components/GeneralLedger";
import AccountingCycle from "@/app/components/AccountingCycle";
import ProductionSalesProcess from "@/app/components/ProductionSalesProcess";
import CashDeposit from "@/app/components/CashDeposit";
import BankAccounts from "@/app/components/BankAccounts";
import HumanResources from "@/app/components/HumanResources";
import AccountsOverview from "@/app/components/AccountsOverview";
import TransactionFlow from "@/app/components/TransactionFlow";
import ChartOfAccounts from "@/app/components/ChartOfAccounts";
import BalanceSheet from "@/app/components/BalanceSheet";
import CashFlow from "@/app/components/CashFlow";
import AccountingStructure from "@/app/components/AccountingStructure";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-24">
      <Navigation />
      <div className="px-24">
      <CompanyRegistration/>
      <div className="mt-4">
        <AccountingStructure />
      </div>
      <div className="mt-4 w-full">
        <ChartOfAccounts />
      </div>
      <div className="mt-4 w-full">
        <BankAccounts />
      </div>
      <div className="mt-4 w-full">
        <CashDeposit initialBalance={0} />
      </div>
      <div className="mt-4">
        <OfficeEquipmentPurchase />
      </div>
      <div className="mt-4 w-full">
        <GeneralLedger />
      </div>
      <div className="mt-4 w-full">
        <AccountsOverview />
      </div>
      <div className="mt-4 w-full">
        <TransactionFlow />
      </div>
      <div className="mt-4 w-full">
        <BalanceSheet />
      </div>
      <div className="mt-4 w-full">
        <CashFlow />
      </div>
    
      <div className="mt-4 w-full">
        <AccountingCycle />
      </div>
      <div className="mt-4 w-full">
        <ProductionSalesProcess />
      </div>
      </div>
    </main>
  );
}
