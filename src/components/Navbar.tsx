"use client";

import Image from "next/image";
import logoLight from "../assets/logo-light.png";
import { SearchIcon, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("return", handleScroll);
  }, [isScrolled]);

  return (
    <div
      className={cn(
        "navbar sticky top-0 z-[10] h-[80px] w-full bg-[#fff] p-4",
        isScrolled && "shadow-md transition-all",
      )}
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href="/">
            <Image src={logoLight} alt="logo" width={48} height={48} />
          </Link>
          <div className="hidden items-center gap-10 xl:flex">
            <p className="text-xl uppercase">Tops</p>
            <p className="text-xl uppercase">Bottoms</p>
            <p className="text-xl uppercase">Cyberpunk</p>
            <p className="text-xl uppercase">More</p>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <UserRound className="size-6" />
          <SearchIcon className="size-6" />
          <ShoppingCart className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
