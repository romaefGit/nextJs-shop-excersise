import ProductsList from "../ProductList";
import { Product } from "../product-data";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + "/api/products",
    {
      cache: "no-store", // Ensures fresh data
    }
  );

  if (!response.ok) throw new Error("Products not found");
  return response.json();
}

async function getCart(): Promise<Product[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + "/api/users/2/cart",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Cart fetch failed");
  return response.json();
}

export default async function ProductsPage() {
  const productsData = await getProducts();
  const cartData = await getCart();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <ProductsList products={productsData} initialCartProducts={cartData} />
    </div>
  );
}
