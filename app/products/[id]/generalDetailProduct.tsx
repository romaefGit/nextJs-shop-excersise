"use client";

import NotFoundPage from "@/app/not-found";
import { Product } from "@/app/product-data";
import { useState } from "react";

export default function GeneralDetailProduct({
  productDetail,
  initialCartProducts = [],
}: {
  productDetail: Product;
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [toggle, setToggle] = useState(false); // 🔥 Forces re-render

  async function addToCart(productId: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SITE_URL + "/api/users/2/cart",
        {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
        }
      );

      if (!response.ok) throw new Error("Failed to add product");

      const updatedCartProducts = await response.json();
      // console.log("Updated Cart (After Add):", updatedCartProducts); // Debugging
      setCartProducts([...updatedCartProducts]); // Ensure new state object
      setToggle((prev) => !prev); // Force re-render
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function removeFromCart(productId: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SITE_URL + "/api/users/2/cart",
        {
          method: "DELETE",
          body: JSON.stringify({ productId }),
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
        }
      );

      if (!response.ok) throw new Error("Failed to remove product");

      const updatedCartProducts = await response.json();
      console.log("Updated Cart (After Remove):", updatedCartProducts); // Debugging
      setCartProducts([...updatedCartProducts]); // 🔥 Ensure new state object
      setToggle((prev) => !prev); // 🔥 Force re-render
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  function productIsInCart(productId: string) {
    return cartProducts.some((cp) => cp.id === productId);
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

        {productIsInCart(productDetail.id) ? (
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 mt-4 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              removeFromCart(productDetail.id);
            }}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="bg-gray-600 hover:bg-lime-700 px-4 py-2 mt-4 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              addToCart(productDetail.id);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
