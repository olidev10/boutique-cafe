"use client";

import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { MinorRestrictionAlert } from "@/components/cart/MinorRestrictionAlert";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/lib/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";

const shipping = 490;

export function CartView() {
  const hasMounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const total = subtotal > 0 ? subtotal + shipping : 0;

  return (
    <section className="container-shell section-space">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Panier</p>
        <h1 className="mt-3 text-4xl font-semibold">Votre selection</h1>
      </div>

      <MinorRestrictionAlert />

      {!hasMounted ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-semibold">Chargement du panier</h2>
          <p className="mt-3 text-muted">Nous recuperons votre selection.</p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-semibold">Votre panier est vide</h2>
          <p className="mt-3 text-muted">Ajoutez quelques cafes pour tester le parcours d&apos;achat.</p>
          <Link href="/boutique" className="btn-primary mt-6">
            Voir la boutique
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
            <button type="button" onClick={clearCart} className="justify-self-start text-sm font-semibold text-muted hover:text-coffee">
              Vider le panier
            </button>
          </div>
          <aside className="h-fit rounded-lg border border-border bg-card p-6 soft-shadow">
            <h2 className="text-xl font-semibold">Resume</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted">Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Livraison</span>
                <span className="font-semibold">{formatPrice(shipping)}</span>
              </div>
              <div className="mt-3 flex justify-between gap-4 border-t border-border pt-4 text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary mt-6 w-full">
              Passer au checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
