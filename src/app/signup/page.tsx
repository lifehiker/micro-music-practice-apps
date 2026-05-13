import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getOptionalSession } from "@/lib/auth-session";

export default async function SignupPage() {
  const session = await getOptionalSession();
  if (session?.user?.id) {
    redirect("/app");
  }

  return (
    <main className="shell grid min-h-screen place-items-center py-10">
      <AuthForm mode="signup" />
    </main>
  );
}
