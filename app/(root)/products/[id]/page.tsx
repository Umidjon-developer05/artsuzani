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
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

// If the product data is highly dynamic, consider:
// export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // --- Fetch product safely and ensure it's RSC-serializable ---
  let safeProduct: any = null;
  try {
    const product = await GetProductsID(id);
    const data = product && "data" in product ? product.data : product;
    if (!data) return notFound(); // 404 if missing
    // Strip non-serializable fields (ObjectId/Date/Methods) for RSC:
    safeProduct = JSON.parse(JSON.stringify(data));
  } catch (e) {
    // You’ll see details in server logs/dev, but shield prod users
    console.error("GetProductsID failed:", e);
    return notFound();
  }

  // --- Auth + favorites guarded ---
  const { userId } = await auth();
  let favoriteLength = 0;
  let isFavorited = false;

  try {
    const favorites = userId ? await GetFavorite(userId) : [];
    favoriteLength = Array.isArray(favorites) ? favorites.length : 0;

    if (userId && safeProduct?._id) {
      isFavorited = await isProductFavorited(userId, String(safeProduct._id));
    }
  } catch (e) {
    // Don’t hard-fail the whole page if favorites choke
    console.warn("Favorite computation failed:", e);
  }

  // --- Server Actions (must only use serializable args) ---
  async function onToggleFavorite(productId: string) {
    "use server";
    const { userId } = await auth();
    if (!userId) throw new Error("Please sign in");
    await toggleFavorite(userId, productId);
    revalidatePath(`/products/${productId}`);
  }

  async function addCart(productId: string) {
    "use server";
    const { userId } = await auth();
    if (!userId) throw new Error("Please sign in");
    // If your action expects a number, pass a number:
    await AddToCart(userId, productId, 1 as unknown as any);
    // revalidatePath("/cart"); // optional
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
