"use client";

import { ThemeToggle } from "./theme-toggle";
import type { WorkspaceSummary } from "@/types/workspace";

export function Topbar({ workspace }: { workspace: WorkspaceSummary | null }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-surface px-5">
      <div className="text-sm text-ink-muted">
        {workspace ? workspace.name : "No workspace selected"}
      </div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
