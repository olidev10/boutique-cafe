import Link from "next/link";
import { BarChart3, Package, ReceiptText } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/produits", label: "Produits", icon: Package },
  { href: "/admin/commandes", label: "Commandes", icon: ReceiptText },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-lg border border-border bg-card p-4">
      <p className="px-2 text-sm font-semibold uppercase tracking-[0.12em] text-gold">Admin demo</p>
      <nav className="mt-4 grid gap-2">
        {adminLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-muted hover:bg-cream hover:text-foreground"
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
