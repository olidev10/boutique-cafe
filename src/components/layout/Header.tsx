"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/panier", label: "Panier" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const hasMounted = useHasMounted();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="container-shell flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="text-xl font-semibold tracking-[0.04em] text-foreground">
          Kawa Maison
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-coffee"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/panier" className="btn-secondary relative min-h-11 px-4" aria-label="Panier">
          <ShoppingBag size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Panier</span>
          {hasMounted && totalItems > 0 ? (
            <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-gold px-1 text-xs font-bold text-foreground">
              {totalItems}
            </span>
          ) : null}
        </Link>
      </div>
      <nav
        aria-label="Navigation mobile"
        className="container-shell flex gap-4 overflow-x-auto pb-3 text-sm font-medium text-muted md:hidden"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-coffee">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
