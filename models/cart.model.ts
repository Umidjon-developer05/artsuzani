﻿import mongoose, { Schema, models, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

CartSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default models.Cart || model("Cart", CartSchema);
