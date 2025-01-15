import { products } from "@/app/product-data";

export default function ProductsDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  return (
    <>
      <h1>{product!.name}</h1>
      <p>${product!.price}</p>
      <h2>Description</h2>
      <p>{product!.description}</p>
    </>
  );
}
