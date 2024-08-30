import Navigation from "@/app/components/Navigation";
import ProductServiceInput from "@/app/components/ProductServiceInput";

export default function ProductsServicesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Navigation />
      <h1 className="text-2xl mb-4">معرفی محصولات و خدمات</h1>
      <ProductServiceInput />
    </div>
  );
}