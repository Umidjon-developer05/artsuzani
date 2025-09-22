import { getCategories } from "@/actions/category.actions";
import { getProducts } from "@/actions/product.actions";
import Category from "@/components/shared/category";
import Products from "@/components/shared/products";
import { HeroCarousel } from "@/components/hero-carousel";

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
    <div className=" min-h-screen">
      <main className="pt-24 px-4 max-w-screen-2xl w-full mx-auto">
        <section aria-labelledby="hero" className="mb-16  z-10">
          <h1 id="hero" className="sr-only">
            Explore Authentic Uzbek Suzani
          </h1>
          <div className="w-full overflow-hidden">
            {/* Naqsh ustida ko'tarilgan effekt */}
            <HeroCarousel className="rounded-xl shadow-2xl/50 ring-1 ring-white/20 backdrop-blur-sm " />
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          aria-labelledby="categories-heading"
          className="mb-16 relative z-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300"
        >
          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent"
          >
            Explore Categories
          </h2>
          <Category category={categoryList} />
        </section>

        {/* PRODUCTS */}
        <section
          id="products"
          aria-labelledby="products-heading"
          className="mb-20 relative z-10 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500"
        >
          <div className="flex items-center justify-between mb-8">
            <h2
              id="products-heading"
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent"
            >
              Products
            </h2>
          </div>
          <Products products={productList} currency="USD" />
        </section>
      </main>
    </div>
  );
}
