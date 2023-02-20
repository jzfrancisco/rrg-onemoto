import { Inter } from "@next/font/google";
import Layout from "../components/Layout";
import data from "../utils/data";
import ProductItem from "../components/Productitem";
import db from "../utils/db";
import Product from "../models/Products";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
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
