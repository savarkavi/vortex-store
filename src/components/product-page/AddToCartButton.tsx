"use client";

import { getWixBrowserClient } from "@/lib/wix-client.browser";
import { addToCart } from "@/wix-api/cart";
import { products } from "@wix/stores";

interface AddToCartButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  isInStock: boolean | undefined;
}

const AddToCartButton = ({
  product,
  selectedOptions,
  quantity,
  isInStock,
}: AddToCartButtonProps) => {
  return (
    <button
      className="w-full cursor-pointer rounded-md bg-black py-3 text-xl text-white"
      disabled={quantity <= 0 || !isInStock}
      onClick={() =>
        addToCart(getWixBrowserClient(), { product, selectedOptions, quantity })
      }
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
