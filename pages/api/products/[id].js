import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const products = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(products);
};

export default handler;
