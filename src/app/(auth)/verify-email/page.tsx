import { AuthCard } from "@/components/auth/auth-card";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Verify your email"
      subtitle="Click the link we sent you to activate your account."
    >
      <Link href="/sign-in" className="text-sm text-accent hover:underline">
        Back to sign in
      </Link>
    </AuthCard>
  );
}
