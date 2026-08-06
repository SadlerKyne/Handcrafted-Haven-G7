import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getSellerProductById,
  getSellerProfile,
} from "../../../lib/seller-data";
import AddToCartButton from "../../../components/AddToCartButton";

const getMockProduct = (id: string) => ({
  id,
  title: `Artisan Handcrafted Item ${id}`,
  category: "Home & Living",
  artisan: "Maker Studio A",
  price: "45.00",
  description:
    "A beautifully handcrafted item created with passion and precision. This is a placeholder description for my mock product to test the layout.",
  stock_quantity: 5,
  image_url: null as string | null,
});

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await params;

  const sellerProduct = await getSellerProductById(productId);
  const sellerProfile = sellerProduct
    ? await getSellerProfile(sellerProduct.sellerId)
    : null;

  const product = sellerProduct
    ? {
      id: sellerProduct.id,
      sellerId: sellerProduct.sellerId,
      title: sellerProduct.title,
      category: sellerProduct.category,
      artisan: sellerProfile?.shopName || sellerProfile?.name || "Artisan",
      price: sellerProduct.price,
      description: sellerProduct.description,
      stock_quantity: sellerProduct.stockQuantity,
      image_url: sellerProduct.imageUrl,
    }
    : { ...getMockProduct(productId), sellerId: null, price: Number(getMockProduct(productId).price) };

  if (!sellerProduct && !productId.match(/^\d+$/)) {
    notFound();
  }

  return (
    <div className="bg-[#e7ecef] text-[#274c77] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="text-[#6096ba] hover:text-[#274c77] mb-8 inline-block transition-colors font-medium"
        >
          &larr; Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-transparent hover:border-[#a3cef1] transition-colors">
          <div className="w-full aspect-square bg-[#e7ecef] rounded-xl overflow-hidden relative">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[#8b8c89] font-medium text-lg">Image Placeholder</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-[#8b8c89] uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#274c77] mb-2">
              {product.title}
            </h1>
            <p className="text-lg text-[#6096ba] mb-6">
              Crafted by{" "}
              {sellerProfile ? (
                <Link href={`/shop/${sellerProfile.id}`} className="underline hover:text-[#274c77]">
                  {product.artisan}
                  {sellerProfile.sellerVerified && (
                    <span className="ml-1 text-[#274c77]" title="Verified seller">
                      &#10003;
                    </span>
                  )}
                </Link>
              ) : (
                product.artisan
              )}
            </p>

            <span className="text-4xl font-bold text-[#274c77] mb-8">${product.price.toFixed(2)}</span>

            <div className="text-[#8b8c89] mb-10 leading-relaxed whitespace-pre-wrap">
              <p>{product.description}</p>
            </div>

            <div className="mt-auto">
              {sellerProduct ? (
                <AddToCartButton
                  productId={sellerProduct.id}
                  title={sellerProduct.title}
                  price={sellerProduct.price}
                  imageUrl={sellerProduct.imageUrl}
                  sellerId={sellerProduct.sellerId}
                  inStock={product.stock_quantity > 0}
                />
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full bg-[#274c77] opacity-50 cursor-not-allowed text-white font-bold py-4 rounded-full shadow-md text-lg"
                >
                  Add to Cart
                </button>
              )}
              <p className="text-center text-sm text-[#8b8c89] mt-3">
                {product.stock_quantity > 0
                  ? `${product.stock_quantity} available in stock`
                  : "Out of stock"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
