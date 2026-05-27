import { ProductFilters } from "@/components/products/ProductFilters";
import { products } from "@/lib/products";

export default function BoutiquePage() {
  return (
    <section className="container-shell section-space">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Boutique</p>
        <h1 className="mt-3 text-4xl font-semibold">Catalogue Kawa Maison</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Cafes en grains, moulus, capsules, packs decouverte et accessoires pour composer une
          boutique credible et facile a parcourir.
        </p>
      </div>
      <ProductFilters products={products} />
    </section>
  );
}
