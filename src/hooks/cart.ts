import { getWixBrowserClient } from "@/lib/wix-client.browser";
import {
  addToCart,
  AddToCartValues,
  fetchCart,
  removeCartItem,
  updateCartQuantity,
  UpdateCartQuantityValues,
} from "@/wix-api/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

export const useCart = (initialData: currentCart.Cart | undefined) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(getWixBrowserClient()),
    initialData,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(getWixBrowserClient(), values),

    onSuccess: async (data) => {
      toast.success("Item added to Bag");
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      queryClient.setQueryData(["cart"], data.cart);
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to add item. Please try again later.");
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCartQuantity"],
    mutationFn: (values: UpdateCartQuantityValues) =>
      updateCartQuantity(getWixBrowserClient(), values),

    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousState = queryClient.getQueryData<currentCart.Cart>([
        "cart",
      ]);

      queryClient.setQueryData<currentCart.Cart>(["cart"], (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      }));

      return { previousState };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["cart"], context?.previousState);
      console.log(error);
      toast.error("Failed to update the quantity. Try again later.");
    },

    onSettled: () => {
      if (
        queryClient.isMutating({ mutationKey: ["updateCartQuantity"] }) === 1
      ) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      removeCartItem(getWixBrowserClient(), productId),

    onSuccess: async (data) => {
      toast.success("Item removed from Bag");
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      queryClient.setQueryData(["cart"], data.cart);
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to remove item. Please try again later.");
    },
  });
};
