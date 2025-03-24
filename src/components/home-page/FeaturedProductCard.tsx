import { products } from "@wix/stores";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import ProductPriceTag from "../ProductPriceTag";

interface FeaturedProductCardProps {
  item: products.Product;
}

const FeaturedProductCard = ({ item }: FeaturedProductCardProps) => {
  return (
    <Link
      href={`/products/${item.slug}`}
      className="w-full max-w-[400px] rounded-lg border shadow-xl"
    >
      <div className="relative h-[400px] w-full rounded-t-lg">
        <Image
          src={item.media?.mainMedia?.image?.url || "/placeholder.png"}
          alt="product image"
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="line-clamp-1 text-xl font-semibold uppercase">
          {item.name}
        </h2>
        <ProductPriceTag product={item} styles="text-sm" />
        <Separator className="my-4 h-[1px] w-full bg-black" />
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: item.description || "",
          }}
        />
      </div>
    </Link>
  );
};

export default FeaturedProductCard;
