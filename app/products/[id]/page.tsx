"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import NotFoundPage from "@/app/not-found";
import GeneralDetailProduct from "./generalDetailProduct";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState(null);
  const [initialCartProducts, setInitialCartProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch product details
        const productResponse = await fetch(
          `http://localhost:3000/api/products/${params.id}`
        );
        if (!productResponse.ok) throw new Error("Product not found");
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch initial cart products
        const cartResponse = await fetch(
          "http://localhost:3000/api/users/2/cart"
        );
        if (!cartResponse.ok) throw new Error("Cart fetch failed");
        const cartData = await cartResponse.json();
        console.log("cartData > ", cartData);

        setInitialCartProducts(cartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [params.id]); // Run when `params.id` changes

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <GeneralDetailProduct
      productDetail={product}
      initialCartProducts={initialCartProducts}
    />
  );
}
