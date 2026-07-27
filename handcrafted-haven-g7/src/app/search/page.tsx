import PageContainer from "@/components/PageContainer";
import { searchProducts } from "@/lib/seller-data";
import SearchClient from "@/components/SearchClient";

const CATEGORIES = [
  "Home & Living",
  "Jewelry",
  "Ceramics",
  "Textiles",
  "Woodwork",
  "Art",
  "Other",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; minPrice?: string; maxPrice?: string }>;
}) {
  const params = await searchParams;
  const q = params.q || "";
  const category = params.category || "";
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const products = await searchProducts({
    q,
    category,
    minPrice: isNaN(minPrice as number) ? undefined : minPrice,
    maxPrice: isNaN(maxPrice as number) ? undefined : maxPrice,
  });

  return (
    <PageContainer>
      <SearchClient
        initialProducts={products}
        categories={CATEGORIES}
        initialFilters={{
          q,
          category,
          minPrice: params.minPrice || "",
          maxPrice: params.maxPrice || "",
        }}
      />
    </PageContainer>
  );
}
