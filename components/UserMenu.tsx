"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function UserMenu() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <NavigationMenuItem>
          <NavigationMenuLink href="/create-post" className="px-4 py-2">
            Create Post
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button onClick={() => signOut()} variant="ghost">
            Sign Out
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Avatar>
            <AvatarImage
              src={session.user?.image || undefined}
              alt={session.user?.name || "User"}
            />
            <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </NavigationMenuItem>
      </>
    );
  }

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink href="/login" className="px-4 py-2">
          Login
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </NavigationMenuItem>
    </>
  );
}
