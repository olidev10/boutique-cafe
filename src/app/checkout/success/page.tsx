import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <section className="container-shell grid min-h-[56vh] place-items-center py-16">
      <div className="max-w-xl rounded-lg border border-border bg-card p-8 text-center soft-shadow">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cream text-coffee">
          <CheckCircle2 size={30} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-3xl font-semibold">Commande confirmée</h1>
        <p className="mt-3 leading-7 text-muted">
          La commande démo a bien été validée. Cette page pourra plus tard recevoir le retour
          Stripe et afficher les details réels de commande.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/boutique" className="btn-primary">
            Continuer les achats
          </Link>
          <Link href="/admin/commandes" className="btn-secondary">
            Voir les commandes
          </Link>
        </div>
      </div>
    </section>
  );
}
