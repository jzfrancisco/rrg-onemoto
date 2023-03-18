"use client";
import Layout from "../components/Layout";
import ProductItem from "../components/Productitem";
import db from "../utils/db";
import Product from "../models/Product";
import React, { useContext } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { motion } from "framer-motion";

import Brands from "../components/Brands";

import motor from "../public/images/kawasaki2.png";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (products) => {
    const existItem = cart.cartItems.find((x) => x.slug === products.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${products._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...products, quantity } });

    toast.success("Product added to the cart");
  };
  return (
    <Layout title="Home Page">
      {/* Introduction */}
      <div className="max-w-full">
        <div className="flex flex-wrap justify-between items-start px-1 bg-[#000000b7] p-5 shadow-xl shadow-black rounded-[10px]">
          <div className="py-3 px-3 flex ">
            <div className="max-w-full lg:w-[800px] ">
              <motion.h1
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="px-2 font-extrabold text-2xl lg:text-[36px] text-[#ffffff] py-3 text-left "
              >
                Welcome to our motorshop
              </motion.h1>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="text-[#ffffff] text-base lg:text-xl py-2 px-2 font-semibold"
              >
                Where we offer top-quality products and services for all your
                motorcycling needs. Whether you're a seasoned rider or a
                beginner, we have everything you need to enjoy the open road
                with confidence and style.
              </motion.p>
              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="text-[#ffffff] text-base lg:text-xl py-2 px-2 font-semibold"
              >
                Our shop features a wide range of motorcycles, from sleek
                sportbikes to rugged adventure bikes, as well as all the gear
                and accessories you need to stay safe and comfortable while
                riding.
              </motion.p>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="text-[#ffffff] text-base lg:text-xl py-2 px-2 font-semibold"
              >
                So why wait? Come shop with us today and discover the thrill of
                motorcycling for yourself!
              </motion.p>
            </div>
          </div>
          <div className="py-5 px-5">
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
            >
              <Image src={motor} alt="/" />
            </motion.div>
          </div>
        </div>
      </div>
      <br />
      {/* <div>
        <Brands />
      </div> */}
      {/* Products */}
      <h1 className="text-xl font-semibold py-5">Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((products) => (
          <ProductItem
            products={products}
            key={products.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
