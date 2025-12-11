import PublicLayout from "@/components/layouts/PublicLayout";
import LoginForm from "@/components/pages/auth/LoginForm";

export default async function LoginPage() {
  return (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  );
}
