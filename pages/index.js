import Layout from "../components/Layout";
import ProductItem from "../components/Productitem";
import db from "../utils/db";
import Product from "../models/Product";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from "react-toastify";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
