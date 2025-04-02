"use client";

import { products } from "@wix/stores";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ProductDetailsHeader from "./ProductDetailsHeader";
import { Separator } from "../ui/separator";
import ProductMoreInfo from "./ProductMoreInfo";

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
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = findVariant(productData, selectedOptions);
  const isInStock = checkInStock(productData, selectedOptions);

  return (
    <div className="relative mx-auto mt-8 flex w-full max-w-[1360px] flex-col items-center gap-20 px-4 lg:flex-row lg:items-start lg:gap-24 lg:px-16">
      <ProductImageCarousel
        product={productData}
        selectedOptions={selectedOptions}
      />
      <div className="flex flex-col gap-16">
        <ProductDetailsHeader
          productData={productData}
          selectedVariant={selectedVariant}
        />
        <div className="flex flex-col gap-8">
          <ProductOptions
            product={productData}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <div className="w-fit space-y-4">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-4">
              <Input
                name="quantity"
                type="number"
                className="border-black"
                value={quantity}
                onChange={(e) => {
                  if (quantity < 1) {
                    return setQuantity(1);
                  }
                  setQuantity(Number(e.target.value));
                }}
                disabled={!isInStock}
              />
              {!isInStock && (
                <p className="text-destructive shrink-0">Out of stock</p>
              )}
            </div>
          </div>
          <Button
            className="w-full cursor-pointer bg-black py-6 text-xl text-white"
            disabled={quantity <= 0 || !isInStock}
          >
            Add to Cart
          </Button>
          <Separator className="bg-gray-400" />
        </div>
        <ProductMoreInfo productData={productData} />
      </div>
    </div>
  );
};

export default ProductDetails;
