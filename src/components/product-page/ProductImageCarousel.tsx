import { products } from "@wix/stores";
import { type CarouselApi } from "@/components/ui/carousel";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface ProductImageCarouselProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}
const ProductImageCarousel = ({
  product,
  selectedOptions,
}: ProductImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const mediaIndex = product.media?.items?.findIndex((item) =>
      item.title?.includes(selectedOptions?.Color?.toLowerCase()),
    );

    if (mediaIndex) {
      api.scrollTo(mediaIndex);
    }
  }, [api, selectedOptions, product.media?.items]);

  return (
    <Carousel
      className="sticky top-[112px] w-full max-w-[550px] shrink-0"
      setApi={setApi}
    >
      <CarouselContent className="h-[800px] w-full">
        {product.media?.items?.map((item) => (
          <CarouselItem key={item._id} className="relative h-full w-full">
            <Image
              src={item.image?.url || "/placeholder.png"}
              alt="product image"
              fill
              className="object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer bg-black text-white hover:bg-black hover:text-white" />
      <CarouselNext className="cursor-pointer bg-black text-white hover:bg-black hover:text-white" />
    </Carousel>
  );
};

export default ProductImageCarousel;
