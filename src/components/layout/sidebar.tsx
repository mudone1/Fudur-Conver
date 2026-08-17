"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  Sparkles,
  Target,
  Plug,
  BarChart3,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/personas", label: "AI Personas", icon: Sparkles },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/connections", label: "Connections", icon: Plug },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="px-5 py-5">
        <Link href="/dashboard" className="font-display text-lg">
          <span className="text-ink">Fudur</span>{" "}
          <span className="text-accent">Conver</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href as never}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-surface-raised text-ink font-medium"
                  : "text-ink-muted hover:bg-surface-raised hover:text-ink"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
