import Image from "next/image";
import Link from "next/link";
import React from "react";

function Productitem({ products, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${products.slug}`}>
        <p className="h-56 p-6 rounded-lg overflow-hidden relative ">
          <Image
            src={products.image}
            alt={products.name}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            className="rounded shadow"
          />
        </p>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${products.slug}`}>
          <h2 className="text-lg">{products.name}</h2>
        </Link>
        <p>{products.brand}</p>
        <p>₱ {products.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(products)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Productitem;
