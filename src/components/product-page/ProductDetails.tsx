"use client";

import { products } from "@wix/stores";

import ProductPriceTag from "../ProductPriceTag";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { findVariant } from "@/lib/utils";

interface ProductDetailsProps {
  productData: products.Product;
}

const ProductDetails = ({ productData }: ProductDetailsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    productData.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  const selectedVariant = findVariant(productData, selectedOptions);

  return (
    <div className="mx-auto flex w-full max-w-[1360px] items-start gap-24 px-16 py-8">
      <ProductImageCarousel product={productData} />
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl uppercase">{productData.name}</h1>
          <div className="flex items-center justify-between">
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
        <ProductOptions
          product={productData}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
