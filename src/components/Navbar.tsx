import { fetchCart } from "@/wix-api/cart";
import Image from "next/image";
import logoLight from "../assets/logo-light.png";
import { SearchIcon, ShoppingCart, UserRound } from "lucide-react";

const Navbar = async () => {
  const cart = await fetchCart();
  console.log(cart);

  return (
    <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between p-4">
      <div className="flex items-center gap-16">
        <Image src={logoLight} alt="logo" width={48} height={48} />
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
  );
};

export default Navbar;
