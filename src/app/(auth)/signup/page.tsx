import PublicLayout from "@/components/layouts/PublicLayout";
import SignupForm from "@/components/pages/auth/SignupForm";

export default async function SignupPage() {
  return (
    <PublicLayout>
      <SignupForm />
    </PublicLayout>
  );
}
