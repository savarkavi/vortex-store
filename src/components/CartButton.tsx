import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { BsBagDash } from "react-icons/bs";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import CartItem from "./CartItem";
import { Loader2 } from "lucide-react";

const CartButton = ({
  initialData,
}: {
  initialData: currentCart.Cart | undefined;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const cartQuery = useCart(initialData);

  const totalQuantity = cartQuery?.data?.lineItems?.reduce(
    (acc, currItem) => acc + (currItem.quantity || 0),
    0,
  );

  return (
    <>
      <div className="relative">
        <BsBagDash
          className="size-6 cursor-pointer"
          onClick={() => setIsSheetOpen(true)}
        />
        <span className="absolute -top-4 -right-4 flex h-6 w-6 items-center justify-center rounded-full bg-black p-1 text-sm text-white">
          {totalQuantity}
        </span>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader className="border-b border-gray-300">
            <SheetTitle className="text-lg">Bag to the future</SheetTitle>
          </SheetHeader>
          <div className="flex grow flex-col gap-10 overflow-y-auto p-4">
            {cartQuery.data?.lineItems?.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onProductLinkClicked={() => setIsSheetOpen(false)}
              />
            ))}
          </div>
          {cartQuery.error && (
            <p className="text-destructive">{cartQuery.error.message}</p>
          )}
          {!cartQuery.data?.lineItems?.length && (
            <div className="flex grow justify-center">
              <p className="text-lg font-semibold">Your cart is empty</p>
            </div>
          )}
          {!!cartQuery.data?.lineItems?.length && (
            <div className="flex flex-col border-t border-gray-300 p-4">
              <p>
                <span className="mr-4 text-lg font-semibold">
                  Subtotal Amount:
                </span>
                {cartQuery.isFetching ? (
                  <Loader2 className="inline size-4 animate-spin" />
                ) : (
                  <span>
                    {/* @ts-expect-error: subtotal type does not exist in sdk yet but the property is there*/}
                    {cartQuery?.data?.subtotal.formattedConvertedAmount}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Taxes and shipping calculated at checkout
              </p>
              <Button className="mt-6 flex w-full cursor-pointer items-center justify-center py-6">
                Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartButton;
