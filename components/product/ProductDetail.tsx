"use client";

import { Heart } from "lucide-react";
import * as React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";

type Category = {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
};
type Product = {
  _id?: string;
  title?: string;
  description?: string;
  category?: Category;
  price?: number;
  // Ehtimol: string[] yoki { url: string }[]
  images?: any[];
  createdAt?: string;
  updatedAt?: string;
};

const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE || "";

// nisbiy yo"lni to"liq URLga aylantirish (ixtiyoriy)
function normalizeUrl(src: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  if (!ASSET_BASE) return src.replace(/^\/+/, "");
  return `${ASSET_BASE}/${src.replace(/^\/+/, "")}`;
}

function extractImages(raw?: any[]): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((it) => (typeof it === "string" ? it : it?.url))
    .filter(Boolean)
    .map((s) => normalizeUrl(String(s)));
}

export default function ProductDetail({
  product,
  isFavorited,
  onToggleFavorite,
  AddCart,
}: {
  product: Product;
  isFavorited: boolean;
  onToggleFavorite: (productId: string) => Promise<void>;
  AddCart: (productId: string) => Promise<void>; // вњ… Promise
}) {
  // вњ… Xavfsiz, moslashuvchan ekstraksiya
  const images = extractImages(product?.images);
  const [idx, setIdx] = React.useState(0);
  const total = images.length;
  const { userId } = useAuth();
  const [adding, setAdding] = React.useState(false);

  // рџ§  optimistic state
  const [liked, setLiked] = React.useState(isFavorited);
  React.useEffect(() => setLiked(isFavorited), [isFavorited]);

  const next = () => setIdx((i) => (total ? (i + 1) % total : 0));
  const prev = () => setIdx((i) => (total ? (i - 1 + total) % total : 0));

  // Touch swipe
  const touchRef = React.useRef<{ x: number | null }>({ x: null });
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current.x = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current.x == null) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    if (dx > 40) prev();
    if (dx < -40) next();
    touchRef.current.x = null;
  };

  const handleLike = async () => {
    if (!userId) {
      alert("Iltimos, avval tizimga kiring.");
      return;
    }
    if (!product?._id) return;
    setLiked((v) => !v);
    try {
      await onToggleFavorite(String(product._id));
    } catch (e) {
      setLiked((v) => !v);
      console.error(e);
      alert("Like qilishda xatolik yuz berdi.");
    }
  };

  const currency = "USD";
  const itemNo = extractItemNo(product?.description);
  const isNew = product?.createdAt ? daysSince(product.createdAt) <= 14 : false;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* --- Left: Image carousel (QAYTARILDI) --- */}
      <div>
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-live="polite"
        >
          {total > 0 ? (
            <img
              src={images[idx]}
              alt={`${product?.title || "Product"} вЂ” image ${
                idx + 1
              } of ${total}`}
              className="h-full w-full object-contain bg-secondary"
              loading="eager"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No image
            </div>
          )}

          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow text-4xl cursor-pointer"
                aria-label="Previous image"
              >
                вЂ№
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 shadow text-4xl cursor-pointer"
                aria-label="Next image"
              >
                вЂє
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
                {idx + 1} / {total}
              </div>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`aspect-square overflow-hidden rounded-xl ring-1 transition ${
                  idx === i
                    ? "ring-purple-500"
                    : "ring-gray-200 hover:ring-gray-300"
                }`}
                aria-label={`Go to image ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- Right: Info panel --- */}
      <div className="space-y-6">
        <div className="space-y-2">
          {product?.category?.title && (
            <div className="text-sm">{product.category.title.trim()}</div>
          )}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {product?.title?.trim() || "Untitled"}
            </h1>

            <Button
              variant="outline"
              className={`cursor-pointer transition ${
                liked ? "border-red-500 text-red-600" : ""
              }`}
              onClick={handleLike}
              aria-pressed={liked}
              aria-label={liked ? "Remove from favorites" : "Add to favorites"}
              title={
                liked
                  ? "Favoritlardan olib tashlash"
                  : "Favoritga qo&apos;shish"
              }
            >
              <Heart
                className={`h-5 w-5 ${
                  liked ? "text-red-600" : "text-gray-700"
                }`}
                fill={liked ? "currentColor" : "none"}
              />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-purple-700">
              {formatPrice(product?.price, currency)}
            </div>
            {isNew && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                New
              </span>
            )}
            {itemNo && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                Item No. {itemNo}
              </span>
            )}
          </div>
        </div>

        {product?.description && (
          <p className="whitespace-pre-wrap leading-7">
            {cleanDesc(product.description)}
          </p>
        )}

        <Button
          variant="secondary"
          disabled={adding}
          onClick={async () => {
            if (!product?._id) return;
            try {
              setAdding(true);
              await AddCart(String(product._id)); // вњ… server action chaqirildi
              // ixtiyoriy: toast koвЂrsating
              alert("Added to cart!");
            } catch (e) {
              console.error(e);
              alert("Add to cart xatolik.");
            } finally {
              setAdding(false);
            }
          }}
          className="cursor-pointer"
        >
          {adding ? "Adding..." : "Add to cart"}
        </Button>
      </div>
    </section>
  );
}

/* Helpers */
function formatPrice(value?: number, currency = "USD") {
  if (typeof value !== "number") return "вЂ”";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}
function cleanDesc(desc?: string) {
  if (!desc) return "";
  return desc.replace(/\r\n/g, "\n").trim();
}
function extractItemNo(desc?: string) {
  if (!desc) return null;
  const m = desc.match(/Item\s*No\.?\s*([A-Za-z0-9-]+)/i);
  return m?.[1] || null;
}
function daysSince(dateStr: string) {
  const d = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}
