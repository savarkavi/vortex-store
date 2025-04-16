"use client";

import { products } from "@wix/stores";
import { Button } from "../ui/button";
import { useAddToCart } from "@/hooks/cart";
import { Loader2 } from "lucide-react";

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
  const { mutate, isPending } = useAddToCart();

  return (
    <Button
      className="flex w-full cursor-pointer items-center justify-center py-6 text-xl"
      disabled={quantity <= 0 || !isInStock || isPending}
      onClick={() => mutate({ product, selectedOptions, quantity })}
    >
      {isPending ? <Loader2 className="size-5 animate-spin" /> : "Add to Bag"}
    </Button>
  );
};

export default AddToCartButton;
