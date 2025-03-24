"use client";

import { products } from "@wix/stores";

import ProductPriceTag from "../ProductPriceTag";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import ProductImageCarousel from "./ProductImageCarousel";

interface ProductDetailsProps {
  productData: products.Product;
}

const ProductDetails = ({ productData }: ProductDetailsProps) => {
  return (
    <div className="mx-auto flex max-w-[1360px] gap-24 px-4 py-8">
      <ProductImageCarousel product={productData} />
      <div>
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl uppercase">{productData.name}</h1>
          <div className="flex items-center justify-between">
            <ProductPriceTag product={productData} styles="text-base" />
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
      </div>
    </div>
  );
};

export default ProductDetails;
