"use client";

import { useState } from "react";
import { Product } from "../product-data";
import Link from "next/link";

export default function ShoppingCartList({
  initialCartProducts,
}: {
  initialCartProducts: Product[];
}) {
  const [cartProducts] = useState(initialCartProducts);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {" "}
        {/* List for cart items */}
        {cartProducts.map((product) => (
          <li
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <Link href={`/products/${product.id}`}>
              <div className="container mx-auto p-8 flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
                  <img
                    src={"/" + product.imageUrl}
                    alt="Product image"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2">
                  <h1 className="text-4xl font-bold mb-4 text-gray-600">
                    {product.name}
                  </h1>
                  <p className="text-2xl text-gray-600 mb-6">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
