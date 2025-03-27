"use client";

import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

const ProductOptions = ({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) => {
  return (
    <div className="space-y-8">
      {product.productOptions?.map((option) => (
        <fieldset key={option.name}>
          <legend>
            <label>{option.name}</label>
          </legend>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {option.choices?.map((choice) => {
              const isInStock = checkInStock(product, {
                ...selectedOptions,
                [option.name || ""]: choice.description || "",
              });

              return (
                <div key={choice.description}>
                  <input
                    type="radio"
                    id={choice.description}
                    name={option.name}
                    checked={
                      selectedOptions[option.name || ""] === choice.description
                    }
                    onChange={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [option.name || ""]: choice.description || "",
                      });
                    }}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={choice.description}
                    className={
                      "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-1 peer-checked:border-2 peer-checked:border-green-600"
                    }
                  >
                    {option.optionType === "color" ? (
                      <span
                        className={cn(
                          "relative h-full w-full rounded-full border border-black",
                          !isInStock && "opacity-40",
                        )}
                        style={{
                          backgroundColor: choice.value,
                        }}
                      >
                        {!isInStock && (
                          <span className="absolute top-1/2 left-0 inline-block h-[1px] w-full -rotate-45 bg-black"></span>
                        )}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "in relative flex h-full w-full items-center justify-center rounded-full border border-black",
                          !isInStock && "opacity-50",
                        )}
                      >
                        {choice.description}
                        {!isInStock && (
                          <span className="absolute top-1/2 left-0 inline-block h-[1px] w-full -rotate-45 bg-black"></span>
                        )}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default ProductOptions;
