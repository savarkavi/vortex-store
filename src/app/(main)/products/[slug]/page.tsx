import ProductDetails from "@/components/product-page/ProductDetails";
import { fetchProduct } from "@/wix-api/products";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const productData = await fetchProduct(slug);

  if (!productData?._id) notFound();

  return {
    title: productData.name,
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const productData = await fetchProduct(slug);

  if (!productData?._id) notFound();

  return (
    <div>
      <ProductDetails productData={productData} />
    </div>
  );
};

export default Page;
