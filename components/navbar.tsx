"use client";

import { Button } from "@/components/ui/button";
import { CoinsIcon, Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <Link href="/donate">
        <Button variant="ghost">Donate</Button>
      </Link>
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
              {/* <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link> */}
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
    </>
  );

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <CoinsIcon className="h-6 w-6" />
          <span className="font-bold text-xl">P2PVerse</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          <NavItems />
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
