import type { LucideIcon } from "lucide-react";

export function StatsCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 soft-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-cream text-coffee">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-sm text-muted">{detail}</p>
    </div>
  );
}
