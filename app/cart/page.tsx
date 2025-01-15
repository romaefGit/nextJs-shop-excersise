"use client";

import { useState } from "react";
import { products } from "../product-data";
import Link from "next/link";

export default function CartPage() {
  const [cartIds] = useState(["123", "234"]);

  const cartProducts = cartIds.map((id) => products.find((p) => p.id === id));

  // console.log("cartProducts > ", cartProducts);

  return (
    <>
      <h1>Cart</h1>

      {cartProducts.map((product) =>
        product ? (
          <Link key={product.id} href={"/products/" + product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        ) : null
      )}
    </>
  );
}
