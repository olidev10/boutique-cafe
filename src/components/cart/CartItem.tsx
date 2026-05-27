"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/lib/cart-store";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format-price";

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[112px_1fr_auto]">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
        <Image src={item.product.image} alt={item.product.name} fill sizes="112px" className="object-cover" />
      </div>
      <div>
        <Link href={`/produit/${item.product.slug}`} className="font-semibold hover:text-coffee">
          {item.product.name}
        </Link>
        <p className="mt-1 text-sm text-muted">{item.product.weight}</p>
        <p className="mt-3 font-semibold">{formatPrice(item.product.price)}</p>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="flex h-10 items-center rounded-lg border border-border bg-cream">
          <button
            type="button"
            aria-label="Diminuer la quantite"
            className="grid h-10 w-10 place-items-center text-muted hover:text-coffee"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus size={16} />
          </button>
          <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            type="button"
            aria-label="Augmenter la quantite"
            className="grid h-10 w-10 place-items-center text-muted hover:text-coffee"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => removeItem(item.product.id)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-coffee"
        >
          <Trash2 size={16} />
          Supprimer
        </button>
      </div>
    </article>
  );
}
