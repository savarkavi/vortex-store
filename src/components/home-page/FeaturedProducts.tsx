import { getWixServerClient } from "@/lib/wix-client.server";
import FeaturedProductCard from "./FeaturedProductCard";
import { fetchCollectionBySlug } from "@/wix-api/collections";
import { fetchProductsByCollection } from "@/wix-api/products";
import { products } from "@wix/stores";

const FeaturedProducts = async () => {
  const wixServerClient = await getWixServerClient();

  const collection = await fetchCollectionBySlug(
    wixServerClient,
    "featured-products",
  );

  if (!collection || !collection._id) return null;

  const products = await fetchProductsByCollection(wixServerClient, {
    collectionIds: collection._id,
  });

  return (
    <div className="mt-16 grid h-full w-full max-w-[1400px] grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.items.map((item: products.Product) => (
        <FeaturedProductCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
