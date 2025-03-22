import { products } from "@wix/stores";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface FeaturedProductCardProps {
  item: products.Product;
}

const FeaturedProductCard = ({ item }: FeaturedProductCardProps) => {
  console.log(item);

  return (
    <div className="w-full max-w-[400px] rounded-lg border shadow-xl">
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <p
              className={cn(item.discount?.type !== "NONE" && "line-through")}
            >{`${item.priceData?.formatted?.price}`}</p>
            {item.discount?.type !== "NONE" && (
              <p>{`${item.priceData?.formatted?.discountedPrice}`}</p>
            )}
          </div>
          {item.discount?.type !== "NONE" && (
            <div className="w-fit rounded-md bg-zinc-900 px-4 py-1 text-sm text-white">{`${item.discount?.value}%`}</div>
          )}{" "}
        </div>
        <Separator className="my-4 h-[1px] w-full bg-black" />
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: item.description || "",
          }}
        />
      </div>
    </div>
  );
};

export default FeaturedProductCard;
