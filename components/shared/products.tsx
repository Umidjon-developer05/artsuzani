"use client";

import type React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

// === Component ===
const Products: React.FC<Props> = ({ products, currency = "USD" }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((product, index) => (
        <Card
          key={product._id}
          className="group pt-0 cursor-pointer border-border/50 hover:border-suzani-burgundy/50 transition-all duration-300 hover:shadow-elegant bg-card/80 backdrop-blur-sm overflow-hidden"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Product Image Placeholder */}
          <div className="relative h-64 bg-gradient-to-br from-suzani-gold/20 via-suzani-burgundy/20 to-suzani-blue/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={product?.images?.at(0)}
                alt={product?.title}
                className="w-full"
              />
            </div>

            {/* Category Badge */}
            {product.categoryTitle && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-suzani-gold border border-suzani-gold/20">
                {product.categoryTitle}
              </div>
            )}
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-suzani-gold transition-colors duration-300">
                {product.title}
              </h3>

              <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-2xl font-bold text-suzani-gold">
                {formatPrice(product.price)}
              </span>

              <Link
                href={`/products/${product?._id}`}
                className="bg-gradient-to-r from-suzani-burgundy to-primary hover:opacity-90 text-primary-foreground font-medium px-2 py-2 rounded-lg transition-all duration-300"
              >
                View Details &rarr;
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Products;
