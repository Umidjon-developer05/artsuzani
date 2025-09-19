"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";

import SidebarDashboard from "./_components/sidebar-dashboard";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // loading paytida hech narsa qilma
    if (user === null) {
      router.replace("/"); // login qilinmagan bo‘lsa
    } else if (!user.isAdmin) {
      router.replace("/"); // oddiy user bo‘lsa
    }
  }, [!user, router]);

  if (user === undefined) return <div>Loading...</div>; // hali yuklanyapti
  if (!user?.isAdmin) return <div>Loading...</div>;
  if (user === null || !user.isAdmin) return null; // redirect bo‘lib ketadi

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <SidebarDashboard />
        <div className="w-full">
          <SidebarInset className="w-full border-b">
            <header className="bg-background sticky top-0 flex justify-between shrink-0 items-center gap-2 border-b p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Inbox</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
          </SidebarInset>
          <div className="overflow-scroll h-full mb-20">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
