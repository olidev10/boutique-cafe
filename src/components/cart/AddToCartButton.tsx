"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/types/product";

export function AddToCartButton({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className={compact ? "btn-secondary min-h-10 px-3 text-sm" : "btn-primary w-full sm:w-auto"}
      disabled={product.stock <= 0}
    >
      <ShoppingBag size={compact ? 16 : 18} aria-hidden="true" />
      {compact ? "Ajouter" : "Ajouter au panier"}
    </button>
  );
}
