export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-surface p-8">
      <div className="font-display text-sm">
        <span className="text-ink">Fudur</span>{" "}
        <span className="text-accent">Conver</span>
      </div>
      <div>
        <h1 className="font-display text-xl text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
