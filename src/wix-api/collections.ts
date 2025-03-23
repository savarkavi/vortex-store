import { getWixClient } from "@/lib/wix-client.base";

export const fetchCollectionBySlug = async (slug: string) => {
  const wixClient = getWixClient();

  const { collection } = await wixClient.collections.getCollectionBySlug(slug);

  return collection;
};
