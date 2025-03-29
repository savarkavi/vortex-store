import { products } from "@wix/stores";

interface ProductDetailsInfoProps {
  productData: products.Product;
}

const ProductMoreInfo = ({ productData }: ProductDetailsInfoProps) => {
  return (
    <div className="flex flex-col gap-8">
      {productData.description && (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: productData.description }}
          />
        </div>
      )}
      {productData.additionalInfoSections &&
        productData.additionalInfoSections.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            {productData.additionalInfoSections.map((section) => (
              <div key={section.title} className="space-y-4">
                {section.title && (
                  <div
                    className="text-lg uppercase"
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                )}
                {section.description && (
                  <div
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default ProductMoreInfo;
