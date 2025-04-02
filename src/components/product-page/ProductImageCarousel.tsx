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
      className="w-full max-w-[550px] shrink-0 lg:sticky lg:top-[112px] lg:max-w-[450px] xl:max-w-[550px]"
      setApi={setApi}
    >
      <CarouselContent className="h-[500px] w-full sm:h-[600px] md:h-[800px] lg:h-[600px] xl:h-[800px]">
        {product.media?.items?.map((item) => (
          <CarouselItem key={item._id} className="">
            <div className="relative ml-2 h-full w-full">
              <Image
                src={item.image?.url || "/placeholder.png"}
                alt="product image"
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden cursor-pointer bg-black text-white hover:bg-black hover:text-white md:flex" />
      <CarouselNext className="hidden cursor-pointer bg-black text-white hover:bg-black hover:text-white md:flex" />
    </Carousel>
  );
};

export default ProductImageCarousel;
