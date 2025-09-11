import { cn } from "@/lib/utils";
import { getCategories } from "@/actions/category.actions";
import { GetFavorite } from "@/actions/favorite.actions";
import { getProducts } from "@/actions/product.actions";
import Category from "@/components/shared/category";
import Header from "@/components/shared/header";
import Products from "@/components/shared/products";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Rss } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const category = await getCategories();
  const products = await getProducts();
  const { userId } = await auth(); // Mock user for demo
  const favorites = userId ? await GetFavorite(userId) : [];
  const favoriteLength = favorites?.length ? favorites.length : 0;

  return (
    <div className=" bg-gradient-to-b from-background via-background/50 to-background">
      <Header favoriteLength={favoriteLength} />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
        <Card className="relative overflow-hidden rounded-3xl border-none shadow-2xl mb-16 bg-gradient-to-tl from-purple-600 via-pink-600 to-purple-800 dark:from-purple-800 dark:via-pink-800 dark:to-purple-900 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
          </div>

          <CardContent className="relative z-10 py-16 px-6 sm:px-12 flex items-center justify-center text-center text-white">
            <div className=" animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                The World of Handmade Vintage Uzbek Suzani Embroidery
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 mt-2 animate-pulse">
                  Suzani is a cherished form of traditional Oriental Embroidery.
                </span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed mb-10 opacity-95 max-w-3xl mx-auto">
                Rooted in the Persian word Suzan meaning Needle. This intricate
                craft holds a special place in Eastern culture.
              </p>
              <div className="max-w-[200px] mx-auto flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-semibold  transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  asChild
                >
                  <Link
                    href={"/blogs"}
                    className="flex items-center justify-center gap-2 dark:text-white text-black"
                  >
                    <Rss />
                    Blogs
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full  border-2 border-white text-white hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-transparent"
                >
                  <a
                    href="#products"
                    className="w-full flex items-center gap-2 justify-center"
                  >
                    <FolderKanban />
                    Products
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <section
          aria-labelledby="categories-heading"
          className="mb-16 animate-in fade-in slide-in-from-left-8 duration-1000 delay-500"
        >
          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Explore Categories
          </h2>
          <Category category={"data" in category ? category.data : []} />
        </section>

        <section
          id="products"
          aria-labelledby="products-heading"
          className="mb-20 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700"
        >
          <div className="flex items-center justify-between mb-8">
            <h2
              id="products-heading"
              className="text-3xl sm:text-4xl font-bold  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Products
            </h2>
          </div>

          <Products
            products={
              products && products && Array.isArray((products as any).data)
                ? (products as any).data.map((p: any) => ({
                    ...p,
                    href: `/products/${p._id}`,
                  }))
                : []
            }
            currency="USD"
          />
        </section>

        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <Card className="rounded-3xl border border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/90 overflow-hidden">
            <CardContent className="p-10 sm:p-12">
              <div className="text-center max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About Our Craft
                </h2>
                <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
                  Discover the rich heritage of Uzbek Suzani embroidery, where
                  each piece tells a story of tradition, artistry, and cultural
                  pride passed down through generations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "🎨",
                      title: "Handcrafted Excellence",
                      desc: "Every piece is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations.",
                      gradient: "from-purple-500 to-purple-600",
                    },
                    {
                      icon: "🌍",
                      title: "Authentic Heritage",
                      desc: "Genuine Uzbek Suzani pieces that preserve the authentic cultural heritage and artistic traditions of Central Asia.",
                      gradient: "from-pink-500 to-pink-600",
                    },
                    {
                      icon: "✨",
                      title: "Premium Quality",
                      desc: "Only the finest materials and highest quality craftsmanship ensure each piece becomes a treasured heirloom.",
                      gradient: "from-amber-500 to-amber-600",
                    },
                  ].map((f, i) => (
                    <Card
                      key={i}
                      className="border-none shadow-lg bg-card hover:bg-card/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${(i + 1) * 200}ms` }}
                    >
                      <CardContent className="p-8 text-center">
                        <div
                          className={cn(
                            "w-20 h-20 rounded-full shadow-lg flex items-center justify-center mx-auto mb-6 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br",
                            f.gradient
                          )}
                        >
                          <span
                            aria-hidden
                            className="text-white drop-shadow-sm"
                          >
                            {f.icon}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                          {f.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {f.desc}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
