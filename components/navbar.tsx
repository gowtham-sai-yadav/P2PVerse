"use client";

import { Button } from "@/components/ui/button";
import { CoinsIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <CoinsIcon className="h-6 w-6" />
          <span className="font-bold text-xl">P2PVerse</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/trade">
            <Button variant="ghost">Trade</Button>
          </Link>
          {user ? (
            <>
              <Link href="/post-ad">
                <Button variant="ghost">Post Ad</Button>
              </Link>
              <Link href="/my-ads">
                <Button variant="ghost">My Ads</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
