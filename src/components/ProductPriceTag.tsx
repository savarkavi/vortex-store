import { cn } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductPriceTagProps {
  product: products.Product;
  styles: string;
}

const ProductPriceTag = ({ product, styles }: ProductPriceTagProps) => {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className={cn("flex items-center gap-2", styles)}>
        <p
          className={cn(product.discount?.type !== "NONE" && "line-through")}
        >{`${product.priceData?.formatted?.price}`}</p>
        {product.discount?.type !== "NONE" && (
          <p>{`${product.priceData?.formatted?.discountedPrice}`}</p>
        )}
      </div>
      {product.discount?.type !== "NONE" && (
        <div className="w-fit rounded-md bg-zinc-900 px-4 py-1 text-sm text-white">{`${product.discount?.value}% off`}</div>
      )}
    </div>
  );
};

export default ProductPriceTag;
