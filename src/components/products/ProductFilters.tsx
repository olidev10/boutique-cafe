"use client";

import { useMemo, useState } from "react";
import { categoryLabels } from "@/lib/products";
import type { Product, ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";

type SortValue = "featured" | "price-asc" | "price-desc";

export function ProductFilters({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortValue>("featured");

  const filteredProducts = useMemo(() => {
    const filtered =
      category === "all" ? [...products] : products.filter((product) => product.category === category);

    return filtered.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return Number(b.isFeatured) - Number(a.isFeatured);
    });
  }, [category, products, sort]);

  return (
    <div className="grid gap-7">
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              category === "all"
                ? "border-coffee bg-coffee text-cream"
                : "border-border bg-cream text-muted hover:text-foreground"
            }`}
          >
            Tous
          </button>
          {(Object.keys(categoryLabels) as ProductCategory[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                category === key
                  ? "border-coffee bg-coffee text-cream"
                  : "border-border bg-cream text-muted hover:text-foreground"
              }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>
        <label className="grid gap-2 text-sm font-medium text-muted md:min-w-56">
          Trier
          <select value={sort} onChange={(event) => setSort(event.target.value as SortValue)} className="input-field">
            <option value="featured">Mis en avant</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix decroissant</option>
          </select>
        </label>
      </div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
