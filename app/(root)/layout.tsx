import { GetCart } from "@/actions/cart.actions";
import { GetFavorite } from "@/actions/favorite.actions";
import { searchActions } from "@/actions/search.actions";
import Header from "@/components/shared/header";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const authResult = await auth();
  const favoriteLength = authResult?.userId
    ? await GetCart(authResult.userId)
    : [];
  const cartLen = Array.isArray(favoriteLength) ? favoriteLength.length : 0;
  const favorites = authResult?.userId
    ? await GetFavorite(authResult?.userId)
    : [];
  const favoriteLength1 = favorites?.length ? favorites.length : 0;

  return (
    <div>
      <Header favoriteLength={favoriteLength1} cartLength={cartLen} />
      {children}
    </div>
  );
};

export default Layout;
