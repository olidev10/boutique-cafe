"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/lib/cart-store";

const shipping = 490;

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const total = subtotal > 0 ? subtotal + shipping : 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    router.push("/checkout/success");
  }

  return (
    <section className="container-shell section-space">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Checkout</p>
        <h1 className="mt-3 text-4xl font-semibold">Commande simulee</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Ce formulaire illustre le parcours client. Aucun paiement reel n&apos;est effectue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5 rounded-lg border border-border bg-card p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              Prenom
              <input className="input-field" name="firstName" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Nom
              <input className="input-field" name="lastName" required />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input className="input-field" type="email" name="email" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Adresse
            <input className="input-field" name="address" required />
          </label>
          <div className="grid gap-5 md:grid-cols-[1fr_160px]">
            <label className="grid gap-2 text-sm font-semibold">
              Ville
              <input className="input-field" name="city" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Code postal
              <input className="input-field" name="postalCode" required />
            </label>
          </div>
          <div className="rounded-lg border border-border bg-cream p-4 text-sm text-muted">
            Paiement mock: la validation redirige vers une page succes et vide le panier.
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6 soft-shadow">
          <h2 className="text-xl font-semibold">Votre commande</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {items.length === 0 ? (
              <p className="text-muted">Panier vide. Vous pouvez quand meme tester la validation.</p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex justify-between gap-4">
                  <span className="text-muted">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))
            )}
            <div className="flex justify-between gap-4 border-t border-border pt-4">
              <span className="text-muted">Livraison</span>
              <span className="font-semibold">{formatPrice(items.length ? shipping : 0)}</span>
            </div>
            <div className="flex justify-between gap-4 text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
          </div>
          <button type="submit" className="btn-primary mt-6 w-full">
            Confirmer la commande
          </button>
        </aside>
      </form>
    </section>
  );
}
