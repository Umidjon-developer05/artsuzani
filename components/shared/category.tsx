"use client";

import type * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type CategoryItem = {
  _id?: string;
  title: string;
  description?: string;
  /** Emoji, icon URL, or any ReactNode */
  image?: string;
  /** Tailwind gradient like: "from-teal-500 to-cyan-500" */
  color?: string;
  /** Optional link; if provided the card becomes an anchor */
  href?: string;
  onClick?: () => void;
};

export type CategoryProps = {
  category?: CategoryItem[];
  colors?: string[];
  className?: string;
};

const DEFAULT_COLORS = [
  "from-rose-500 to-orange-500",
  "from-sky-500 to-indigo-500",
  "from-green-500 to-emerald-600",
  "from-violet-500 to-fuchsia-500",
  "from-amber-500 to-yellow-500",
  "from-teal-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-violet-600",
  "from-lime-500 to-emerald-600",
  "from-orange-500 to-red-500",
];

const DEFAULT_ITEMS: CategoryItem[] = [
  {
    title: "categories.homeDecors",
    image: "рџЏ ",
    description: "Home & dГ©cor",
  },
  { title: "categories.caftans", image: "рџ‘—", description: "Caftans & wear" },
  {
    title: "categories.fabrics",
    image: "рџ§µ",
    description: "Fabrics & textiles",
  },
  {
    title: "categories.accessories",
    image: "рџ‘њ",
    description: "Accessories",
  },
];

/**
 * Category grid with enhanced dark mode and animations
 */
export default function Category({
  category,
  colors,
  className,
}: CategoryProps) {
  const items = (category?.length ? category : DEFAULT_ITEMS) as CategoryItem[];
  const palette = (colors?.length ? colors : DEFAULT_COLORS) as string[];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => {
          const gradient = item.color || palette[index % palette.length];
          const content = (
            <Card
              className={cn(
                "border-none shadow-lg cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 group",
                "bg-card hover:bg-card/90",
                "bg-gradient-to-br",
                gradient,
                "p-[2px] rounded-2xl"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Link href={`/product-category/${item._id}`}>
                <div>
                  <div className="rounded-2xl bg-card transition-all duration-300 group-hover:bg-card/95">
                    <CardContent className="p-8 text-center">
                      <div className="mb-4 flex justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {item?.image && /^(https?:)?\/\//.test(item.image) ? (
                          <img
                            src={item.image}
                            alt=""
                            className="h-20 w-20 object-cover filter transition-all duration-300 group-hover:brightness-110"
                          />
                        ) : (
                          <img
                            src={item.image}
                            alt=""
                            className="h-20 w-20 object-cover filter transition-all duration-300 group-hover:brightness-110"
                          />
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-primary">
                        {item.title}
                      </h3>
                      {item.description ? (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed transition-colors duration-300">
                          {item.description}
                        </p>
                      ) : (
                        <div className="h-5" />
                      )}
                    </CardContent>
                  </div>
                </div>
              </Link>
            </Card>
          );

          const Wrapper: React.FC<{ children: React.ReactNode }> = ({
            children,
          }) =>
            item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 rounded-2xl transition-all duration-300"
              >
                {children}
              </a>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 rounded-2xl transition-all duration-300"
              >
                {children}
              </button>
            );

          return <Wrapper key={`${item.title}-${index}`}>{content}</Wrapper>;
        })}
      </div>
    </div>
  );
}
