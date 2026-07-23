import PageContainer from "@/components/PageContainer";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">
        Search Results for: &ldquo;{q || "..."}&rdquo;
      </h1>
      <p className="text-[#8b8c89]">
        Product grid filtered by search query will render here.
      </p>
    </PageContainer>
  );
}
