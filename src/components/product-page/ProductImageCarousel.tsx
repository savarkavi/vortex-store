import { products } from "@wix/stores";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  product: products.Product;
}
const ProductImageCarousel = ({ product }: ProductImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-[550px] border">
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
