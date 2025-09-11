import mongoose, { Schema, Document, Model } from "mongoose";

interface OrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: OrderItem[];
  fullName: string;
  location: string;
  status: "pending" | "paid" | "shipped" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    fullName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// вљЎпёЏ Agar model allaqachon mavjud boвЂlsa qayta compile qilmaydi
const Orders: Model<IOrder> =
  (mongoose.models?.Orders as Model<IOrder>) ||
  mongoose.model<IOrder>("Orders", OrdersSchema);

export default Orders;
