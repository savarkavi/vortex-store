import { WixClient } from "@/lib/wix-client.base";

export const fetchCollectionBySlug = async (
  wixClient: WixClient,
  slug: string,
) => {
  const { collection } = await wixClient.collections.getCollectionBySlug(slug);

  return collection;
};
