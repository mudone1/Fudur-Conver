import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Image
        src="/logo.png"
        alt="Fudur Conver"
        width={280}
        height={280}
        className="rounded-lg"
        priority
      />
      <p className="max-w-md text-ink-muted">
        One inbox. Context-aware reply suggestions. You stay in control of
        every message you send.
      </p>
      <div className="flex gap-3">
        <Link
          href="/sign-up"
          className="rounded-md bg-accent px-5 py-2.5 text-accent-ink font-medium hover:opacity-90 transition"
        >
          Get started
        </Link>
        <Link
          href="/sign-in"
          className="rounded-md border border-border px-5 py-2.5 text-ink font-medium hover:bg-surface transition"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
