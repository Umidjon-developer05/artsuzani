﻿import { GetCart } from "@/actions/cart.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import CartList from "@/components/cart/cart-list";

const Cart = async () => {
  const { userId } = await auth();
  const rawItems = await GetCart(userId!);
  // Map rawItems to CartItem[]
  console.log("Raw Cart Items:", rawItems); // Debugging line
  const items = rawItems.map((item: any) => ({
    _id: item._id,
    productId: item.productId,
    quantity: item.quantity,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    // Add other CartItem properties if needed
  }));

  return (
    <div>
      <div className="mt-24">
        <h1 className="text-2xl text-center">Shopping cart</h1>
        <CartList userId={userId ?? ""} items={items} />
      </div>
    </div>
  );
};

export default Cart;
