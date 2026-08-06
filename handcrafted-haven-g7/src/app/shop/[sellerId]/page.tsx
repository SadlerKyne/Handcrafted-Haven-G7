import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSellerProfile, getSellerProducts } from "../../../lib/seller-data";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ sellerId: string }>;
}) {
  const { sellerId } = await params;

  const profile = await getSellerProfile(sellerId);
  if (!profile || profile.role !== "seller") {
    notFound();
  }

  const products = await getSellerProducts(sellerId);

  return (
    <div className="bg-[#e7ecef] text-[#274c77] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="text-[#6096ba] hover:text-[#274c77] mb-8 inline-block transition-colors font-medium"
        >
          &larr; Back to Marketplace
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
          <div className="relative w-28 h-28 rounded-full overflow-hidden bg-[#e7ecef] shrink-0 border-2 border-[#a3cef1]">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.shopName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6096ba] text-3xl font-bold">
                {profile.shopName.charAt(0) || profile.name.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
              {profile.shopName || profile.name}
              {profile.sellerVerified && (
                <span className="text-base text-white bg-[#274c77] rounded-full px-2.5 py-0.5" title="Verified seller">
                  &#10003; Verified
                </span>
              )}
            </h1>
            {profile.location && (
              <p className="text-[#8b8c89] mt-1">{profile.location}</p>
            )}
            {profile.bio && (
              <p className="text-[#8b8c89] mt-3 max-w-2xl">{profile.bio}</p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">
          Products from {profile.shopName || profile.name} ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="text-[#8b8c89]">This shop hasn&apos;t listed any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#a3cef1] transition-all flex flex-col"
              >
                <div className="relative aspect-square w-full bg-[#e7ecef]">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8b8c89] text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#274c77]">{product.title}</h3>
                  <p className="font-bold text-[#274c77] mt-1">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
