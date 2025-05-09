import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { getWixClient } from "./wix-client.base";

export function getWixBrowserClient() {
  const tokens: Tokens = JSON.parse(Cookies.get("wix_session") || "{}");

  return getWixClient(tokens);
}
