import { cn } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductPriceTagProps {
  product: products.Product;
  styles: string;
  selectdVariant?: products.Variant | null;
}

const ProductPriceTag = ({
  product,
  styles,
  selectdVariant,
}: ProductPriceTagProps) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className={cn("flex items-center gap-2", styles)}>
        <p className={cn(product.discount?.type !== "NONE" && "line-through")}>
          {selectdVariant
            ? selectdVariant.variant?.priceData?.formatted?.price
            : product.priceData?.formatted?.price}
        </p>
        {product.discount?.type !== "NONE" && (
          <p>
            {selectdVariant
              ? selectdVariant.variant?.priceData?.formatted?.discountedPrice
              : product.priceData?.formatted?.discountedPrice}
          </p>
        )}
      </div>
      {product.discount?.type !== "NONE" && (
        <div className="w-fit shrink-0 rounded-md bg-zinc-900 px-4 py-1 text-sm text-white">{`${product.discount?.value}% off`}</div>
      )}
    </div>
  );
};

export default ProductPriceTag;
