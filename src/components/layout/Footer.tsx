import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 bg-coffee-dark text-cream">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold tracking-[0.04em]">Kawa Maison</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-cream/75">
            Boutique fictive de cafés artisanaux premium, pensée comme une démo e-commerce sobre,
            rassurante et prête à présenter.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Boutique</p>
          <div className="mt-3 grid gap-2 text-sm text-cream/75">
            <Link href="/boutique" className="hover:text-cream">
              Catalogue
            </Link>
            <Link href="/panier" className="hover:text-cream">
              Panier
            </Link>
            <Link href="/checkout" className="hover:text-cream">
              Checkout
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Démo</p>
          <div className="mt-3 grid gap-2 text-sm text-cream/75">
            <Link href="/admin" className="hover:text-cream">
              Admin démo
            </Link>
            <Link href="/admin/produits" className="hover:text-cream">
              Produits démo
            </Link>
            <Link href="/admin/commandes" className="hover:text-cream">
              Commandes démo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
