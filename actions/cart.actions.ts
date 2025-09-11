// actions/cart.actions.ts
"use server";

import dbConnect from "@/lib/connection";
import cartModel from "@/models/cart.model";
import userModel from "@/models/user.model";
import "@/models/product.model"; // рџ”ґ MUHIM: Product modelini register qiladi
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

// clerkUserId = Clerk'dagi user id (string)
export const AddToCart = async (
  clerkUserId: string,
  productId: string,
  quantity: string | number
) => {
  await dbConnect();
  if (!clerkUserId) throw new Error("Not authenticated");

  if (!productId) throw new Error("Missing productId");
  if (!Types.ObjectId.isValid(productId)) throw new Error("Invalid productId");

  // qty to'g'rilash
  const qty = Math.max(1, Number(quantity) || 1);

  // Clerk -> Mongo user._id
  const user = await userModel.findOne({ clerkId: clerkUserId }).select("_id");
  if (!user) throw new Error("User not found");

  const cartItem = await cartModel.findOneAndUpdate(
    { userId: user._id, productId: new Types.ObjectId(productId) },
    { $inc: { quantity: qty } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  revalidatePath("/cart");
  return cartItem?.toObject?.() ?? cartItem;
};

export const GetCart = async (userId: string) => {
  await dbConnect();
  const user = await userModel.findOne({ clerkId: userId }).select("_id");
  const items = await cartModel
    .find({ userId: user?._id })
    .populate({
      path: "productId",
      select: "_id title description price images",
    })
    .sort({ createdAt: -1 })
    .lean();

  // JSONga tayyorlab qaytaramiz
  return JSON.parse(JSON.stringify(items));
};
export async function IncrementCartItem(
  clerkUserId: string,
  cartItemId: string
) {
  await dbConnect();

  const user = await userModel.findOne({ clerkId: clerkUserId }).select("_id");
  if (!user) return;

  await cartModel.updateOne(
    { _id: new Types.ObjectId(cartItemId), userId: user._id },
    { $inc: { quantity: 1 } }
  );

  revalidatePath("/cart");
}

export async function DecrementCartItem(
  clerkUserId: string,
  cartItemId: string
) {
  await dbConnect();

  const user = await userModel.findOne({ clerkId: clerkUserId }).select("_id");
  if (!user) return;

  const item = await cartModel.findOne({
    _id: new Types.ObjectId(cartItemId),
    userId: user._id,
  });

  if (!item) return;

  if (item.quantity <= 1) {
    await cartModel.deleteOne({ _id: item._id, userId: user._id });
  } else {
    await cartModel.updateOne(
      { _id: item._id, userId: user._id },
      { $inc: { quantity: -1 } }
    );
  }

  revalidatePath("/cart");
}

export async function RemoveCartItem(clerkUserId: string, cartItemId: string) {
  await dbConnect();

  const user = await userModel.findOne({ clerkId: clerkUserId }).select("_id");
  if (!user) return;

  await cartModel.deleteOne({
    _id: new Types.ObjectId(cartItemId),
    userId: user._id,
  });

  revalidatePath("/cart");
}
