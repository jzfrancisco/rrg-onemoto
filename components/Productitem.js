import Image from "next/image";
import Link from "next/link";
import React from "react";

function Productitem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <p className="h-56 p-6 rounded-lg overflow-hidden relative ">
          <Image
            src={product.image}
            alt={product.name}
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
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p>{product.brand}</p>
        <p>₱ {product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Productitem;
