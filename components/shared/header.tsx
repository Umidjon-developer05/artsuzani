"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, Heart, Menu, LogIn } from "lucide-react";
import UserBox from "@/components/shared/user-box";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = ({ favoriteLength, cartLength }: any) => {
  const { user } = useUser();
  const calledRef = useRef(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // LIVE SEARCH (debounce + abort)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await res.json();
        setResults(data);
        setOpen(true);
      } catch (e) {
        if ((e as any).name !== "AbortError") {
          console.error("Qidiruv xatosi:", e);
        }
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query]);

  // Clerk createUser qismi (o'zingizdagi kabi)
  useEffect(() => {
    if (!user || calledRef.current) return;
    const key = `userCreated:${user.id}`;
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      calledRef.current = true;
      return;
    }
    const payload = {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      fullName: user.fullName ?? "",
      picture: user.imageUrl ?? "",
    };
    if (!payload.email) {
      calledRef.current = true;
      console.warn("Email yo‘q, createUser chaqirilmaydi");
      return;
    }
    calledRef.current = true;
    (async () => {
      try {
        // await createUser(payload);
        localStorage.setItem(key, "1");
      } catch (e) {
        console.error("createUser xatosi:", e);
        calledRef.current = false;
      }
    })();
  }, [user]);

  // dropdown yopish uchun outside click
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"} className="flex items-center space-x-2">
            <span className="text-2xl">🪡</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Artsuzani Shop
            </h1>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-red-500 transition-colors font-medium relative group"
            >
              BLOG
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center space-x-4" ref={wrapRef}>
            {/* Search */}
            <div className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => results.length && setOpen(true)}
                className="w-64 pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />

              {/* Dropdown */}
              {open && (
                <div className="absolute top-20 mt-24 left-0 bg-white border rounded-lg shadow-lg w-72 max-h-72 overflow-y-auto">
                  {loading && (
                    <div className="p-3 text-sm text-gray-500">
                      Qidirilmoqda…
                    </div>
                  )}
                  {!loading && results.length === 0 && (
                    <div className="p-3 text-sm text-gray-500">
                      Hech narsa topilmadi
                    </div>
                  )}
                  {!loading &&
                    results.map((item: any) => (
                      <Link
                        key={item._id}
                        href={`/products/${item._id}`}
                        className="block px-3 py-2   hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {/* Icons */}
            <Link href={"/favorite"}>
              <button className="p-2 relative text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
                {favoriteLength ? (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                    {favoriteLength}
                  </span>
                ) : null}
              </button>
            </Link>

            <SignedIn>
              <UserBox />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size={"lg"} className="hidden rounded-full md:flex">
                  Login
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size={"icon"} variant={"ghost"} className="md:hidden">
                  <LogIn />
                </Button>
              </SignInButton>
            </SignedOut>

            <Link href={"/shopping/cart"}>
              <button className="p-2 cursor-pointer text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartLength ? cartLength : 0}
                </span>
              </button>
            </Link>

            <button className="md:hidden p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
