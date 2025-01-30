import NotFoundPage from "@/app/not-found";
import { Product, products } from "@/app/product-data";
import { useState } from "react";

export default async function GeneralDetailProduct({
  productDetail,
  initialCartProducts = [],
}: {
  productDetail: Product;
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  async function addToCart(productId: string) {
    const response = await fetch("http://localhost:3000/api/users/2/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }

  if (!productDetail) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
        <img
          src={"/" + productDetail.imageUrl}
          alt="Product image"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{productDetail.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">${productDetail.price}</p>
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{productDetail.description}</p>
        <button
          className="bg-gray-600 px-4 py-2 mt-4 rounded-md"
          onClick={(e) => addToCart(productDetail.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
