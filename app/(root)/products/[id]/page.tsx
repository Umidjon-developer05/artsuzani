// app/(root)/products/[id]/page.tsx

import { AddToCart } from "@/actions/cart.actions";
import {
  GetFavorite,
  isProductFavorited,
  toggleFavorite,
} from "@/actions/favorite.actions";
import { GetProductsID } from "@/actions/product.actions";
import ProductDetail from "@/components/product/ProductDetail";
import Header from "@/components/shared/header";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function Page({
  params,
}: {
  // 👇 In Next 15, params is a Promise
  params: Promise<{ id: string }>;
}) {
  // 👇 Await before destructuring
  const { id } = await params;

  const product = await GetProductsID(id);
  const data = product && "data" in product ? product.data : product;
  const safeProduct = JSON.parse(JSON.stringify(data));

  const { userId } = await auth();
  const favorites = userId ? await GetFavorite(userId) : [];
  const favoriteLength = favorites?.length ? favorites.length : 0;

  const isFavorited =
    userId && safeProduct?._id
      ? await isProductFavorited(userId, String(safeProduct._id))
      : false;

  // ✅ Server Action: toggle favorite
  async function onToggleFavorite(productId: string) {
    "use server";
    const { userId } = await auth();
    if (!userId) throw new Error("Please sign in");
    await toggleFavorite(userId, productId);
    revalidatePath(`/products/${productId}`);
  }

  // ✅ Server Action: add to cart
  async function addCart(productId: string) {
    "use server";
    const { userId } = await auth();
    if (!userId) throw new Error("Please sign in");
    await AddToCart(userId, productId, "1");
  }

  return (
    <div>
      <Header favoriteLength={favoriteLength} />
      <main className="mx-auto max-w-6xl px-4 py-8 mt-24">
        <ProductDetail
          product={safeProduct}
          isFavorited={isFavorited}
          onToggleFavorite={onToggleFavorite}
          AddCart={addCart}
        />
      </main>
    </div>
  );
}
