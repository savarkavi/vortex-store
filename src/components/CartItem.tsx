import { currentCart } from "@wix/ecom";
import { media } from "@wix/sdk";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRemoveCartItem, useUpdateCartQuantity } from "@/hooks/cart";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

const CartItem = ({ item, onProductLinkClicked }: CartItemProps) => {
  const imageUrl = media.getImageUrl(item.image || "");

  const { mutate: updateMutate } = useUpdateCartQuantity();
  const { mutate: removeMutate, isPending } = useRemoveCartItem();

  const productId = item._id;

  if (!productId) return null;

  const slug = item.url?.split("/").pop();

  return (
    <div className="flex items-center gap-4">
      <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
        <div className="relative h-[150px] w-[130px] rounded-sm">
          <Image
            src={imageUrl.url || "/placeholder.png"}
            alt="product image"
            fill
            className="shrink-0 rounded-sm object-cover"
          />
        </div>
      </Link>
      <div className="flex w-full flex-col gap-2">
        <Link
          href={`/products/${slug}`}
          className="font-semibold"
          onClick={onProductLinkClicked}
        >
          {item.productName?.original}
        </Link>
        {!!item.descriptionLines?.length && (
          <p className="text-sm">
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}
        <p className="text-sm">{`${item.price?.formattedConvertedAmount} X ${item.quantity}`}</p>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={item.quantity === 1}
              onClick={() =>
                updateMutate({
                  productId,
                  newQuantity: !item.quantity ? 0 : item.quantity - 1,
                })
              }
            >
              -
            </Button>
            <span>{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() =>
                updateMutate({
                  productId,
                  newQuantity: !item.quantity ? 1 : item.quantity + 1,
                })
              }
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            className="flex w-20 cursor-pointer items-center justify-center"
            onClick={() => removeMutate(productId)}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
