"use client";
import NotFoundPage from "@/app/not-found";
import GeneralDetailProduct from "./generalDetailProduct";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    "http://localhost:3000/api/products/" + params.id
  );
  const product = await response.json();

  const responseCart = await fetch("http://localhost:3000/api/users/2/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const initialCartProducts = await responseCart.json();

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
