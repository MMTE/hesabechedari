import Navigation from "@/app/components/Navigation";
import HumanResources from "@/app/components/HumanResources";

export default function HumanResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <h1 className="text-2xl mb-4">مدیریت منابع انسانی</h1>
      <HumanResources />
    </div>
  );
}