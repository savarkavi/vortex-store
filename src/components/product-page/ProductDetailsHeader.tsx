import { products } from "@wix/stores";
import ProductPriceTag from "../ProductPriceTag";
import { Separator } from "../ui/separator";
import { Star } from "lucide-react";

interface ProductDetailsHeaderProps {
  productData: products.Product;
  selectedVariant: products.Variant | null;
}

const ProductDetailsHeader = ({
  productData,
  selectedVariant,
}: ProductDetailsHeaderProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl uppercase md:text-5xl">{productData.name}</h1>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0 lg:flex-col lg:items-start lg:gap-4 xl:flex-row xl:items-center xl:gap-0">
        <ProductPriceTag
          product={productData}
          styles="text-base"
          selectdVariant={selectedVariant}
        />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`${i < 4 && "fill-black"} size-4 cursor-pointer`}
              />
            ))}
          </div>
          <p>(7)</p>
        </div>
      </div>
      <Separator className="bg-gray-400" />
    </div>
  );
};

export default ProductDetailsHeader;
