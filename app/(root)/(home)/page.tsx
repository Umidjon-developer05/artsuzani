import { cn } from "@/lib/utils";
import { getCategories } from "@/actions/category.actions";
import { getProducts } from "@/actions/product.actions";
import Category from "@/components/shared/category";
import Products from "@/components/shared/products";
import { Card, CardContent } from "@/components/ui/card";
import { HeroCarousel } from "@/components/hero-carousel";

const slides = [
  {
    src: "/artsuzani.jpg",
    alt: "Vintage Suzani embroidery detail",
    caption: "Vintage Suzani — handworked heritage",
  },
  {
    src: "/arsuzani-1.jpg",
    alt: "Hand stitching on Suzani textile",
    caption: "Hand stitching — every thread matters",
  },
  {
    src: "/bukhara.jpg",
    alt: "Bukhara bazaar with textiles",
    caption: "From the bazaars of Bukhara",
  },
];

export default async function Home() {
  const category = await getCategories();
  const products = await getProducts();

  const productList = Array.isArray((products as any)?.data)
    ? (products as any).data.map((p: any) => ({
        ...p,
        href: `/products/${p._id}`,
      }))
    : [];

  const categoryList =
    "data" in (category as any) ? (category as any).data : [];

  return (
    <div className="bg-gradient-to-b from-background via-background/50 to-background">
      <main className="pt-24 px-4 max-w-screen-2xl w-full mx-auto">
        {/* HERO / CAROUSEL */}
        <section aria-labelledby="hero" className="mb-16">
          <h1 id="hero" className="sr-only">
            Explore Authentic Uzbek Suzani
          </h1>

          <div className="w-full overflow-hidden">
            <HeroCarousel slides={slides} className="rounded-xl" />
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          aria-labelledby="categories-heading"
          className="mb-16 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300"
        >
          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Explore Categories
          </h2>
          <Category category={categoryList} />
        </section>

        {/* PRODUCTS */}
        <section
          id="products"
          aria-labelledby="products-heading"
          className="mb-20 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500"
        >
          <div className="flex items-center justify-between mb-8">
            <h2
              id="products-heading"
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Products
            </h2>
          </div>

          <Products products={productList} currency="USD" />
        </section>

        {/* ABOUT */}
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <Card className="rounded-3xl border border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/90 overflow-hidden">
            <CardContent className="p-10 sm:p-12">
              <div className="text-center max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
