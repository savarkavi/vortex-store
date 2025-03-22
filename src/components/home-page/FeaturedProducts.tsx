import { getWixClient } from "@/lib/wix-client.base";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = async () => {
  const wixClient = getWixClient();

  const { collection } =
    await wixClient.collections.getCollectionBySlug("featured-products");

  if (!collection) return null;

  const products = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [collection._id])
    .find();

  return (
    <div className="mt-16 grid h-full w-full max-w-[1400px] grid-cols-3 justify-items-center gap-4">
      {products.items.map((item) => (
        <FeaturedProductCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
