import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

export const fetchCart = async (wixClient: WixClient) => {
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch {}
};

export interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export const addToCart = async (
  wixClient: WixClient,
  { product, selectedOptions, quantity }: AddToCartValues,
) => {
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

export interface UpdateCartQuantityValues {
  productId: string;
  newQuantity: number;
}

export const updateCartQuantity = async (
  wixClient: WixClient,
  { productId, newQuantity }: UpdateCartQuantityValues,
) => {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    { _id: productId, quantity: newQuantity },
  ]);
};

export const removeCartItem = async (
  wixClient: WixClient,
  productId: string,
) => {
  return wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
};
