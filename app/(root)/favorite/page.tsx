import { GetFavorite } from "@/actions/favorite.actions";
import FavoriteProducts from "@/components/favorite/Favorite";
import Header from "@/components/shared/header";
import { auth } from "@clerk/nextjs/server";

const Favorite = async () => {
  const { userId } = await auth();
  const favorites = userId ? await GetFavorite(userId) : [];

  // backenddan kelgan favoritlar shakli: [{ _id, productId: { ...product } }]
  const products = (favorites || [])
    .map((f: any) => f?.productId)
    .filter(Boolean);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-24">
        <FavoriteProducts products={products} />
      </div>
    </div>
  );
};

export default Favorite;
