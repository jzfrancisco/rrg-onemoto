"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

export default function ProductScreen(props) {
  const { products } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  if (!products) {
    return <Layout title="Product not found">Product not found</Layout>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === products.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${products._id}`);

    if (data.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...products, quantity } });
    router.push("/cart");
  };
  return (
    <Layout title={products.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <p className="h-44  p-2 rounded-lg overflow-hidden relative ">
            <Image
              src={products.image}
              alt={products.name}
              fill
              style={{
                objectFit: "contain",
                objectPosition: "left",
              }}
              className="rounded shadow"
            />
          </p>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{products.name}</h1>
            </li>
            <li>Category: {products.category}</li>
            <li>Brand: {products.brand}</li>
            <li>
              {products.rating} of {products.numReviews} reviews
            </li>
            <li>Description: {products.description}</li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>₱{products.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{products.countInStock > 0 ? "In stock" : "Unavailable"}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      products: product ? db.convertDocToObj(product) : null,
    },
  };
}
