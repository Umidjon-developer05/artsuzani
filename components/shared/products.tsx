"use client";

import type React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// === Types (unchanged) ===
type Product = {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  images?: string[];
  categoryTitle?: string;
  createdAt?: string; // ISO
  href?: string; // ixtiyoriy: bo"lsa <a> bo"ladi
};

type Props = {
  products: Product[];
  onView?: (product: Product) => void;
  currency?: string; // masalan: "USD", "EUR"
};

// === Utils (unchanged logic) ===
const formatPrice = (value?: number, currency = "USD") => {
  if (typeof value !== "number") return "вЂ”";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};

const isNew = (iso?: string) => {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  const days = (Date.now() - t) / (1000 * 60 * 60 * 24);
  return days <= 30; // oxirgi 30 kunda qo"shilganlarni "New"
};

const cleanDesc = (desc?: string) =>
  (desc || "").replace(/`/g, "").replace(/\r?\n/g, " ").trim();

// === Component ===
const Products: React.FC<Props> = ({ products, onView, currency = "USD" }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((p, index) => (
        <Card
          key={p._id}
          className="group overflow-hidden border p-0 border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl bg-card hover:bg-card/80 animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="relative overflow-hidden">
            {p.images?.[0] ? (
              <img
                src={p.images[0]}
                alt={p.title?.trim()}
                className="w-full aspect-[4/2.5]   transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-5xl transition-all duration-500 group-hover:scale-105">
                рџЄЎ
              </div>
            )}

            <div className="absolute left-3 top-3 flex gap-2">
              {p.categoryTitle && (
                <Badge
                  variant="secondary"
                  className="backdrop-blur-md bg-background/80 text-foreground shadow-lg border border-border/50 transition-all duration-300 hover:bg-background/90"
                >
                  {p.categoryTitle.trim()}
                </Badge>
              )}
              {isNew(p.createdAt) && (
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-0 transition-all duration-300 hover:from-purple-700 hover:to-pink-700">
                  New
                </Badge>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {p.title?.trim() || "Untitled"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
              {cleanDesc(p.description)}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {formatPrice(p.price, currency)}
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            {p.href ? (
              <Link href={p.href} className="w-full">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  View details
                </Button>
              </Link>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                onClick={() => onView?.(p)}
              >
                View details
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Products;
