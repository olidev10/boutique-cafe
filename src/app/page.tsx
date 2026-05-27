import Image from "next/image";
import Link from "next/link";
import { CreditCard, PackageCheck, Truck } from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/lib/products";

const benefits = [
  {
    title: "Livraison rapide",
    text: "Preparation sous 24h ouvrable avec emballage soigne.",
    icon: Truck,
  },
  {
    title: "Paiement securise",
    text: "Parcours checkout clair, pret pour Stripe en mode test.",
    icon: CreditCard,
  },
  {
    title: "Cafés selectionnés",
    text: "Origines premium, notes aromatiques et conseils d&apos;extraction.",
    icon: PackageCheck,
  },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section className="container-shell grid gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Café artisanal premium
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            {`Des cafes de caractere, livrés avec l'élegance d'une épicerie fine.`}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {`Kawa Maison présente une experience e-commerce complete: catalogue, fiche produit,
            panier, checkout et interface admin mockee pour piloter la boutique.`}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/boutique" className="btn-primary">
              Découvrir la boutique
            </Link>
            <Link href="/admin" className="btn-secondary">
              {`Voir l'admin démo`}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-border bg-card soft-shadow">
          <Image
            src="/images/hero-coffee.svg"
            alt="Selection premium de cafes Kawa Maison"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-shell grid gap-4 py-8 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-card text-coffee">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
              <h2 className="font-semibold">{benefit.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{benefit.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-shell section-space">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              Selection
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Produits populaires</h2>
          </div>
          <Link href="/boutique" className="btn-secondary self-start">
            Tout le catalogue
          </Link>
        </div>
        <ProductGrid products={featuredProducts.slice(0, 6)} />
      </section>
    </>
  );
}
