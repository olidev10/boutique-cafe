import { Banknote, Coffee, PackageCheck, ShoppingCart } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";

const recentOrders = [
  { id: "KM-1048", client: "Claire Martin", total: "58,70 EUR", status: "A preparer" },
  { id: "KM-1047", client: "Hugo Bernard", total: "34,90 EUR", status: "Expediee" },
  { id: "KM-1046", client: "Nora Vidal", total: "82,40 EUR", status: "Payee" },
];

export default function AdminPage() {
  return (
    <section className="container-shell section-space">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Back-office</p>
        <h1 className="mt-3 text-4xl font-semibold">Dashboard admin</h1>
        <p className="mt-4 max-w-2xl text-muted">
          {`Mockup non securise pour montrer les indicateurs qu'un commercant attendrait.`}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Commandes du jour" value="18" detail="+12% vs hier" icon={ShoppingCart} />
            <StatsCard title="Chiffre d'affaires" value="1 842 EUR" detail="Panier moyen 48 EUR" icon={Banknote} />
            <StatsCard title="Produits actifs" value="10" detail="4 categories visibles" icon={Coffee} />
            <StatsCard title="A preparer" value="7" detail="Priorite expedition" icon={PackageCheck} />
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Commandes recentes</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-muted">
                  <tr className="border-b border-border">
                    <th className="py-3 font-semibold">Commande</th>
                    <th className="py-3 font-semibold">Client</th>
                    <th className="py-3 font-semibold">Total</th>
                    <th className="py-3 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/70 last:border-0">
                      <td className="py-4 font-semibold">{order.id}</td>
                      <td className="py-4 text-muted">{order.client}</td>
                      <td className="py-4">{order.total}</td>
                      <td className="py-4">
                        <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-coffee">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
