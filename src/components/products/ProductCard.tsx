import Image from "next/image";
import Link from "next/link";
import { categoryLabels } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card soft-shadow">
      <Link href={`/produit/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 280px"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">
            {categoryLabels[product.category]}
          </p>
          <Link href={`/produit/${product.slug}`} className="mt-2 block">
            <h3 className="text-lg font-semibold text-foreground hover:text-coffee">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {product.shortDescription}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
