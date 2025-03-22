import { duneFont } from "@/fonts/fonts";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center">
      <h1 className={`${duneFont.className} text-[18rem]`}>VORTEX</h1>
      <div className="absolute top-1/2 left-1/2 h-full w-full -translate-1/2 -translate-y-1/2">
        <Image
          src="/hero-img.png"
          alt="hero main image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
