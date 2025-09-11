"use client";

import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.isAdmin) {
      router.push("/admin/dashboard");
    }
    if (user === null) {
      router.replace("/");
    }
  }, [user, router]);
  if (!user) return <div>Loading...</div>;
  if (!user.isAdmin) return null;
}
