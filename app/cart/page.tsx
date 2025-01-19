"use client";

import { useState } from "react";
import { products } from "../product-data";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const [cartIds] = useState(["123", "234"]);

  const cartProducts = cartIds.map((id) => products.find((p) => p.id === id));

  // console.log("cartProducts > ", cartProducts);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cartProducts.map((product) =>
          product ? (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4 h-48 relative">
                {" "}
                {/* Added height and relative positioning */}
                <Image
                  src={"/" + product.imageUrl}
                  alt="Product image"
                  fill // Fill the container
                  className="object-cover rounded-md" // Cover the container, maintaining aspect ratio
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ) : null
        )}
      </div>
    </>
  );
}
