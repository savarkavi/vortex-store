import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { getWixClient } from "./wix-client.base";

export async function getWixServerClient() {
  let tokens: Tokens | undefined;
  const getCookies = async () => {
    try {
      tokens = JSON.parse((await cookies()).get("wix_session")?.value || "{}");
    } catch (error) {
      console.log(error);
    }
  };
  await getCookies();

  return getWixClient(tokens);
}
