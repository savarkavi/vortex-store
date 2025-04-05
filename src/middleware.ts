import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { env } from "./env";
import { NextRequest, NextResponse } from "next/server";

const wixClient = createClient({
  auth: OAuthStrategy({ clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID }),
});

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("wix_session");

  let sessionTokens = sessionCookie
    ? (JSON.parse(sessionCookie.value) as Tokens)
    : await wixClient.auth.generateVisitorTokens();

  if (sessionTokens.accessToken.expiresAt < Math.floor(Date.now() / 1000)) {
    sessionTokens = await wixClient.auth.renewToken(sessionTokens.refreshToken);
  }

  req.cookies.set("wix_session", JSON.stringify(sessionTokens));

  const res = NextResponse.next({ request: req });

  res.cookies.set("wix_session", JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
