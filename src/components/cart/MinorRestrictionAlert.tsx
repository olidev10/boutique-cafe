import { AlertTriangle } from "lucide-react";

export function MinorRestrictionAlert() {
  return (
    <div className="mb-8 flex gap-3 rounded-lg border border-gold/50 bg-card p-4 text-sm leading-6 soft-shadow">
      <AlertTriangle className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />
      <div>
        <p className="font-semibold">Vente interdite aux mineurs</p>
        <p className="mt-1 text-muted">
          En poursuivant votre commande, vous confirmez etre majeur et autorise a acheter ces
          produits.
        </p>
      </div>
    </div>
  );
}
