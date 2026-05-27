import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGrid } from "@/components/products/ProductGrid";
import { categoryLabels, getProductBySlug, products } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product ? `${product.name} | Kawa Maison` : "Produit | Kawa Maison",
    description: product?.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <section className="container-shell section-space">
      <Link href="/boutique" className="text-sm font-semibold text-muted hover:text-coffee">
        Retour a la boutique
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card soft-shadow">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            {categoryLabels[product.category]}
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-lg text-muted">{product.shortDescription}</p>
          <p className="mt-6 text-3xl font-semibold">{formatPrice(product.price)}</p>
          <div className="mt-7 grid gap-3 rounded-lg border border-border bg-card p-5">
            <p>
              <span className="font-semibold">Origine:</span> {product.origin}
            </p>
            <p>
              <span className="font-semibold">Intensite:</span> {product.intensity}/5
            </p>
            <p>
              <span className="font-semibold">Format:</span> {product.weight}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock} disponibles
            </p>
          </div>
          <div className="mt-7">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-3 leading-8 text-muted">{product.description}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Notes et extraction</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.notes.map((note) => (
              <span key={note} className="rounded-full border border-border bg-cream px-3 py-1 text-sm">
                {note}
              </span>
            ))}
          </div>
          <p className="mt-4 leading-8 text-muted">{product.brewingAdvice}</p>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold">Dans la meme categorie</h2>
          <ProductGrid products={related} />
        </div>
      ) : null}
    </section>
  );
}
