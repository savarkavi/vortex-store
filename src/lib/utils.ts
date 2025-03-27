import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findVariant = (
  product: products.Product,
  productOptions: Record<string, string>,
) => {
  if (!product.manageVariants) return null;

  return (
    product.variants?.find((item) =>
      Object.entries(productOptions).every(
        ([Key, value]) => item.choices?.[Key] === value,
      ),
    ) || null
  );
};

export const checkInStock = (
  product: products.Product,
  productOptions: Record<string, string>,
) => {
  const variant = findVariant(product, productOptions);
  console.log(variant);

  return variant
    ? variant.stock?.quantity !== 0 || variant.stock?.inStock
    : product.stock?.quantity !== 0 ||
        product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK ||
        product.stock?.inventoryStatus ===
          products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;
};
