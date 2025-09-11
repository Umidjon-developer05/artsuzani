"use client";

import { useTransition, useState } from "react";
import {
  IncrementCartItem,
  DecrementCartItem,
  RemoveCartItem,
} from "@/actions/cart.actions";
import { createOrder } from "@/actions/orders.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input"; // в¬…пёЏ qo"shildi
import { Label } from "@/components/ui/label"; // в¬…пёЏ (agar bor bo"lsa, chiroyli label uchun)

type Product = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
};

type CartItem = {
  _id: string;
  productId: Product; // populated
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
};

export default function CartList({
  userId,
  items,
}: {
  userId: string;
  items: CartItem[];
}) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);

  // в¬‡пёЏ Yangi: checkout form state
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const total = items.reduce(
    (sum, it) => sum + (it.productId?.price || 0) * (it.quantity || 0),
    0
  );

  const money = (n: number) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(n);

  const onInc = (id: string) =>
    startTransition(() => IncrementCartItem(userId, id));
  const onDec = (id: string) =>
    startTransition(() => DecrementCartItem(userId, id));
  const onRemove = (id: string) =>
    startTransition(() => RemoveCartItem(userId, id));

  const onCheckout = async () => {
    // oddiy validatsiya
    if (!fullName.trim() || !location.trim()) {
      setFormError("Iltimos, Full name va Location ni toвЂldiring.");
      return;
    }
    try {
      setSubmitting(true);
      setFormError(null);

      const order = await createOrder(
        userId,
        items.map((it) => ({
          productId: it.productId._id,
          quantity: it.quantity,
        })),
        fullName.trim(),
        location.trim()
      );

      setSuccess("Order created successfully!");
      // modal yopilgach inputlarni tozalash uchun:
      setFullName("");
      setLocation("");
      console.log("Created order:", order);
    } catch (err) {
      console.error(err);
      setFormError("Failed to create order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* ... yuqoridagi cart itemlar ro"yxati o"zgarishsiz ... */}
      <ul className="space-y-4">
        {items.map((it) => {
          const p = (it.productId as any) || {};
          const title =
            typeof p === "object" ? p.title || "Untitled" : "Untitled";
          const price = typeof p === "object" ? p.price || 0 : 0;
          const img = typeof p === "object" ? p.images?.[0] : undefined;

          return (
            <li
              key={it._id}
              className="border rounded-2xl p-3 md:p-4 flex gap-3 md:gap-4 items-center"
            >
              {/* Rasm */}
              <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-xl overflow-hidden bg-gray-100 shrink-0">
                {img ? (
                  // Agar oldingi versiyada next/image ishlatgan bo"lsangiz, import qiling:
                  // import Image from "next/image";
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>

              {/* Matn + quantity */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-medium truncate">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {typeof p === "object" ? p.description || "" : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemove(it._id)}
                    disabled={isPending}
                    className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    aria-label="Remove item"
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 border rounded-full px-2 py-1">
                    <button
                      onClick={() => onDec(it._id)}
                      disabled={isPending}
                      className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100 disabled:opacity-50"
                      aria-label="Decrease quantity"
                    >
                      в€’
                    </button>
                    <span className="w-8 text-center tabular-nums">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() => onInc(it._id)}
                      disabled={isPending}
                      className="w-8 h-8 rounded-full grid place-items-center hover:bg-gray-100 disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <span className="text-lg font-medium">Total</span>
        <span className="text-xl font-bold">{money(total)}</span>
      </div>

      <div className="mt-4 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Checkout</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm order</AlertDialogTitle>
              <AlertDialogDescription>
                Please enter your details to place the order.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* в¬‡пёЏ Checkout form (modal ichida) */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Tashkent, Uzbekistan"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {formError && <p className="text-sm text-red-600">{formError}</p>}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={submitting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onCheckout} disabled={submitting}>
                {submitting ? "Submitting..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {success && (
        <div className="mt-4 text-center text-green-600 font-medium">
          {success}
        </div>
      )}
    </div>
  );
}
