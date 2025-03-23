import { getWixClient } from "@/lib/wix-client.base";

type SortMethod = "last_updated" | "price_asc" | "price_desc";

interface QueryProductsOptions {
  collectionIds: string[] | string;
  sortMethod?: SortMethod;
}

export const fetchProductsByCollection = async ({
  collectionIds,
  sortMethod = "last_updated",
}: QueryProductsOptions) => {
  const wixClient = getWixClient();

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
