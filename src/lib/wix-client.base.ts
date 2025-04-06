import { env } from "@/env";
import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import {
  currentCart,
  backInStockNotifications,
  checkout,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";

export const getWixClient = (tokens: Tokens | undefined) => {
  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      checkout,
      redirects,
      orders,
      recommendations,
      backInStockNotifications,
      reviews,
      members,
      files,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens,
    }),
  });
};

export type WixClient = ReturnType<typeof getWixClient>;
