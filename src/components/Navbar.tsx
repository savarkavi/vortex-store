import { fetchCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import NavbarContent from "./NavbarContent";

const Navbar = async () => {
  const wixClient = await getWixServerClient();

  const cart = await fetchCart(wixClient);

  return <NavbarContent initialData={cart} />;
};

export default Navbar;
