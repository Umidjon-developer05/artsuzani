"use server";

import dbConnect from "@/lib/connection";
import cartModel from "@/models/cart.model";
import ordersModel from "@/models/orders.model";
import userModel from "@/models/user.model";
import { revalidatePath } from "next/cache";

export const createOrder = async (
  userId: string,
  items: { productId: string; quantity: number }[],
  fullName: string,
  location: string
) => {
  await dbConnect();
  const user = await userModel.findOne({ clerkId: userId }).select("_id");
  const orders = await ordersModel.create({
    userId: user?._id,
    items, // productlar + quantity
    fullName,
    location,
    status: "pending",
  });
  if (orders) {
    await cartModel.deleteOne({ userId: user?._id });
  }
  revalidatePath("/");
  return JSON.parse(JSON.stringify(orders));
};

export const getOrdersByUserId = async (userId: string) => {
  await dbConnect();
  const user = await userModel.findOne({ clerkId: userId }).select("_id");
  const orders = await ordersModel
    .find({ userId: user?._id })
    .populate("items.productId")
    .sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(orders));
};
