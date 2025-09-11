"use server";

import dbConnect from "@/lib/connection";
import Category from "@/models/category.model";
import Orders from "@/models/orders.model";
import Product from "@/models/product.model";

export const statistika = async () => {
  await dbConnect();

  const productlength = await Product.countDocuments();
  const categorylength = await Category.countDocuments();
  const orderslength = await Orders.countDocuments();
  return {
    productlength,
    categorylength,
    orderslength,
  };
};
