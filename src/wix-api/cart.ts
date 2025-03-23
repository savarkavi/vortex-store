import { getWixClient } from "@/lib/wix-client.base";

export const fetchCart = async () => {
  const wixClient = getWixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch {}
};
