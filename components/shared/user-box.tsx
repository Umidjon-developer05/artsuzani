"use client";

import { SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";

function UserBox() {
  const { user } = useUser();
  console.log("userbackend", user);

  const route = useRouter();

  function OnAdminHref() {
    route.push("/admin/dashboard");
  }
  function OnProfileHref() {
    route.push("/profile");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src={user?.picture ?? ""} className="object-cover" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.email}
          </p>

          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="size-8">
                <AvatarImage src={user?.picture ?? ""} />
              </Avatar>
            </div>

            <div className="space-y-1">
              <p className="line-clamp-1 font-space-grotesk text-sm">
                {user?.fullName}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />
        {user?.isAdmin && (
          <DropdownMenuItem asChild className="w-full text-muted-foreground">
            <button
              type="button"
              onClick={OnAdminHref}
              className="w-full text-left"
            >
              Admin
            </button>
          </DropdownMenuItem>
        )}
        {user && (
          <DropdownMenuItem asChild className="w-full text-muted-foreground">
            <button
              type="button"
              onClick={OnProfileHref}
              className="w-full text-left"
            >
              Profile
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton>logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserBox;
