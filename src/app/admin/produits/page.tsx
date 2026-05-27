import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { categoryLabels, products } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";

export default function AdminProductsPage() {
  return (
    <section className="container-shell section-space">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Back-office</p>
        <h1 className="mt-3 text-4xl font-semibold">Produits</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="text-xl font-semibold">Catalogue mocke</h2>
            <p className="mt-1 text-sm text-muted">Vue table pour rassurer sur la gestion produit.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-cream text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Nom produit</th>
                  <th className="px-5 py-3 font-semibold">Categorie</th>
                  <th className="px-5 py-3 font-semibold">Prix</th>
                  <th className="px-5 py-3 font-semibold">Stock</th>
                  <th className="px-5 py-3 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-border/70">
                    <td className="px-5 py-4 font-semibold">{product.name}</td>
                    <td className="px-5 py-4 text-muted">{categoryLabels[product.category]}</td>
                    <td className="px-5 py-4">{formatPrice(product.price)}</td>
                    <td className="px-5 py-4">{product.stock}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-coffee">
                        {product.stock > 0 ? "Actif" : "Rupture"}
                      </span>
                    </td>
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
