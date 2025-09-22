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
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50 mb-20 via-fuchsia-50/40 to-rose-100">
      {/* O'ram fon naqshi */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* 1) Asosiy o'ram naqshi - markazda ko'rinadi */}
        <div
          className="
    absolute inset-0
    bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><circle cx=%22150%22 cy=%22150%22 r=%22120%22 fill=%22none%22 stroke=%22%23d946ef%22 stroke-width=%224%22/><circle cx=%22150%22 cy=%22150%22 r=%2290%22 fill=%22%23f9a8d4%22 opacity=%220.3%22/></svg>')]
    bg-repeat opacity-20 mix-blend-multiply
    bg-[length:280px_280px] sm:bg-[length:320px_320px] lg:bg-[length:380px_380px]
    [mask-image:radial-gradient(100%_80%_at_50%_20%,transparent_0%,#000_60%)]
    [-webkit-mask-image:radial-gradient(100%_80%_at_50%_20%,transparent_0%,#000_60%)]
  "
        />

        {/* 2) Yengil o'ram chetlari - nozik ko'rinish */}
        <div
          className="
    absolute inset-0
    bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22><rect x=%2230%22 y=%2230%22 width=%22120%22 height=%22120%22 fill=%22%23fef2f2%22 stroke=%22%23fb7185%22 stroke-width=%222%22/></svg>')]
    bg-repeat opacity-10 mix-blend-soft-light
    bg-[length:180px_180px] sm:bg-[length:220px_220px]
    [mask-image:radial-gradient(150%_120%_at_50%_50%,#000_30%,transparent_70%)]
    [-webkit-mask-image:radial-gradient(150%_120%_at_50%_50%,#000_30%,transparent_70%)]
  "
        />

        {/* 3) O'ramning nozik soyasi - chuqurlik uchun */}
        <div
          className="
    absolute inset-0
    bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><line x1=%220%22 y1=%220%22 x2=%22400%22 y2=%22400%22 stroke=%22%23000%22 stroke-width=%224%22 stroke-opacity=%220.05%22/></svg>')]
    bg-repeat opacity-5 mix-blend-overlay
    bg-[length:400px_400px] sm:bg-[length:480px_480px]
    [mask-image:linear-gradient(45deg,transparent_25%,#000_50%,transparent_75%)]
    [-webkit-mask-image:linear-gradient(45deg,transparent_25%,#000_50%,transparent_75%)]
  "
        />

        {/* 4) Yuqoridan va pastdan fade — naqshni yumshatish */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-100/90 to-transparent" />

        {/* 5) Markazda nozik gradient halqa - diqqatni jamlash */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            maskImage:
              "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,0,0,0.3) 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,0,0,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <main className="pt-24 px-4 max-w-screen-2xl w-full mx-auto">
        {/* HERO / CAROUSEL */}
        <section aria-labelledby="hero" className="mb-16 relative z-10">
          <h1 id="hero" className="sr-only">
            Explore Authentic Uzbek Suzani
          </h1>
          <div className="w-full overflow-hidden">
            {/* Naqsh ustida ko'tarilgan effekt */}
            <HeroCarousel className="rounded-xl shadow-2xl/50 ring-1 ring-white/20 backdrop-blur-sm bg-white/80" />
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
