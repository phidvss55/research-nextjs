import PublicLayout from "@/components/layouts/PublicLayout";
import TwoFactorComponent from "@/components/pages/auth/two-factor/TwoFactorComponent";

export default async function SignupPage() {
  return (
    <PublicLayout>
      <TwoFactorComponent />
    </PublicLayout>
  );
}
