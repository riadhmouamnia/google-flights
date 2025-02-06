import { SearchForm } from "@/components/search-form";

export default async function AllFlights({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Your Flight</h1>
          <p className="text-lg text-primary/40">
            Search hundreds of travel sites at once
          </p>
        </div>
        <SearchForm />
        {children}
      </div>
    </div>
  );
}
