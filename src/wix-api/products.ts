import { WixClient } from "@/lib/wix-client.base";
import { cache } from "react";

type SortMethod = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsOptions {
  collectionIds: string[] | string;
  sortMethod?: SortMethod;
}

export const fetchProductsByCollection = async (
  wixClient: WixClient,
  { collectionIds, sortMethod = "last_updated" }: QueryProductsOptions,
) => {
  let query = wixClient.products.queryProducts();

  const collectionIdsArray = Array.isArray(collectionIds)
    ? collectionIds
    : [collectionIds];

  query = query.hasSome("collectionIds", collectionIdsArray);

  switch (sortMethod) {
    case "price_asc":
      query = query.ascending("price");
      break;
    case "price_desc":
      query = query.descending("price");
      break;
    case "last_updated":
      query = query.descending("lastUpdated");
      break;
  }

  return query.find();
};

export const fetchProduct = cache(
  async (wixClient: WixClient, slug: string) => {
    const { items } = await wixClient.products
      .queryProducts()
      .eq("slug", slug)
      .find();

    const product = items[0];

    if (!product) return null;

    return product;
  },
);
