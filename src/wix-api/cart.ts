import { findVariant } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

export const fetchCart = async () => {
  const wixClient = getWixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch {}
};

interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export const addToCart = async ({
  product,
  selectedOptions,
  quantity,
}: AddToCartValues) => {
  const wixClient = getWixClient();

  const selectedVariant = findVariant(product, selectedOptions);

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
          catalogItemId: product._id,
          options: selectedVariant
            ? { variantId: selectedVariant._id }
            : { options: selectedOptions },
        },
        quantity,
      },
    ],
  });
};
