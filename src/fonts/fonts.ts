import localFont from "next/font/local";
import { Share_Tech_Mono } from "next/font/google";

export const duneFont = localFont({
  src: "./Dune_Rise.otf",
});

export const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
});
