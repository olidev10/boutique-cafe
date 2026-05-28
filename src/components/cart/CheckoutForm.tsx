"use client";

import Link from "next/link";
import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { MinorRestrictionAlert } from "@/components/cart/MinorRestrictionAlert";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/lib/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";

const shipping = 490;

export function CheckoutForm() {
  const hasMounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const total = subtotal > 0 ? subtotal + shipping : 0;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Impossible de demarrer le paiement.");
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Impossible de demarrer le paiement.",
      );
      setIsLoading(false);
    }
  }

  return (
    <section className="container-shell section-space">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Paiement</p>
        <h1 className="mt-3 text-4xl font-semibold">Finaliser la commande</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Verifiez votre panier avant d&apos;etre redirige vers Stripe pour le paiement securise.
        </p>
      </div>

      <MinorRestrictionAlert />

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Articles</h2>
          {!hasMounted ? (
            <div className="rounded-lg border border-border bg-cream p-5">
              <p className="text-muted">Chargement de votre panier.</p>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-border bg-cream p-5">
              <p className="text-muted">Votre panier est vide.</p>
              <Link href="/boutique" className="btn-secondary mt-4">
                Retour a la boutique
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {item.product.weight} - quantite {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="rounded-lg border border-border bg-cream p-4 text-sm leading-6 text-muted">
            Stripe demandera l&apos;email, l&apos;adresse de livraison et les informations de carte sur
            une page hebergee securisee.
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6 soft-shadow">
          <h2 className="text-xl font-semibold">Votre commande</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {!hasMounted ? (
              <p className="text-muted">Chargement du panier.</p>
            ) : items.length === 0 ? (
              <p className="text-muted">Panier vide. Ajoutez un produit pour lancer le paiement.</p>
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
          {error ? (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!hasMounted || isLoading || items.length === 0}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            ) : (
              <CreditCard size={18} aria-hidden="true" />
            )}
            {isLoading ? "Redirection..." : "Payer avec Stripe"}
          </button>
        </aside>
      </form>
    </section>
  );
}
