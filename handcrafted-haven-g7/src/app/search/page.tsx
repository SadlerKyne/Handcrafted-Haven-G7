export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#274c77] mb-6">
          Search Results for: "{searchParams.q || '...'}"
        </h1>
        <p className="text-gray-600">Product grid filtered by search query will render here.</p>
      </div>
    );
  }