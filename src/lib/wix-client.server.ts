import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { getWixClient } from "./wix-client.base";

export function getWixServerClient() {
  let tokens: Tokens | undefined;
  const getCookies = async () => {
    try {
      tokens = JSON.parse((await cookies()).get("wix_session")?.value || "{}");
    } catch {}
  };
  getCookies();

  return getWixClient(tokens);
}
