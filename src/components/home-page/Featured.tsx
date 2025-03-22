import { duneFont } from "@/fonts/fonts";
import FeaturedProducts from "./FeaturedProducts";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const Featured = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="mt-28 flex flex-col items-center gap-2">
        <h2
          className={`text-4xl ${duneFont.className} font-semibold uppercase`}
        >
          The fashion of future
        </h2>
        <p className="font max-w-lg text-center text-2xl font-light uppercase">
          Elevate Your Look. Transcend the Ordinary. Wear the Future.
        </p>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="mt-16 grid h-full w-full max-w-[1400px] grid-cols-3 justify-items-center gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[590px] w-[400px] rounded-lg bg-gray-300/50"
        />
      ))}
    </div>
  );
};

export default Featured;
