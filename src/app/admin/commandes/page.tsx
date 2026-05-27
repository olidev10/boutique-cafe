import { AdminSidebar } from "@/components/admin/AdminSidebar";

const orders = [
  {
    id: "KM-1048",
    client: "Claire Martin",
    total: "58,70 EUR",
    payment: "Payee",
    shipping: "A preparer",
  },
  {
    id: "KM-1047",
    client: "Hugo Bernard",
    total: "34,90 EUR",
    payment: "Payee",
    shipping: "Expediee",
  },
  {
    id: "KM-1046",
    client: "Nora Vidal",
    total: "82,40 EUR",
    payment: "Payee",
    shipping: "En preparation",
  },
  {
    id: "KM-1045",
    client: "Sami Leroy",
    total: "29,90 EUR",
    payment: "En attente",
    shipping: "Non lancee",
  },
  {
    id: "KM-1044",
    client: "Anais Moreau",
    total: "103,30 EUR",
    payment: "Payee",
    shipping: "Livree",
  },
];

export default function AdminOrdersPage() {
  return (
    <section className="container-shell section-space">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Back-office</p>
        <h1 className="mt-3 text-4xl font-semibold">Commandes</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="text-xl font-semibold">Suivi commandes</h2>
            <p className="mt-1 text-sm text-muted">Statuts paiement et livraison pour une demo client.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-cream text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Numero commande</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Paiement</th>
                  <th className="px-5 py-3 font-semibold">Livraison</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-border/70">
                    <td className="px-5 py-4 font-semibold">{order.id}</td>
                    <td className="px-5 py-4 text-muted">{order.client}</td>
                    <td className="px-5 py-4">{order.total}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-coffee">
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted">{order.shipping}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
