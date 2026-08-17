const STATS = [
  { label: "Conversations", value: "0" },
  { label: "Unread messages", value: "0" },
  { label: "AI suggestions", value: "0" },
  { label: "Replies sent", value: "0" },
] as const;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-2xl text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Overview for your workspace. Connect a platform or explore demo
          data to get started.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="text-2xl font-display text-ink">{stat.value}</div>
            <div className="mt-1 text-xs text-ink-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-sm text-ink-muted">
          The unified inbox, contacts, personas, and goals ship in Phase 2
          and Phase 3. This dashboard shell, auth, and workspace model are
          the Phase 1 foundation.
        </p>
      </div>
    </div>
  );
}
