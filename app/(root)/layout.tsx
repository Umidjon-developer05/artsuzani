import { GetCart } from "@/actions/cart.actions";
import { GetFavorite } from "@/actions/favorite.actions";
import Header from "@/components/shared/header";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider>
      <div className="relative min-h-screen ">
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/suzani-pattern.png')",
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            filter: "brightness(0.3)",
          }}
        />
        <div className="fixed inset-0  bg-black/60 bg-gradient-to-br from-background via-transparent to-pattern-overlay/20 pointer-events-none" />

        <Header favoriteLength={favoriteLength1} cartLength={cartLen} />
        <div className="relative z-10">{children}</div>
      </div>
    </ClerkProvider>
  );
};

export default Layout;
