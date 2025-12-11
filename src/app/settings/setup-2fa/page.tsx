import AdminLayout from "@/components/layouts/AdminLayout";
import Setup2FAComponent from "@/components/pages/Setup2Fa";

export default function TwoFactorSettingsPage() {
  return (
    <AdminLayout>
      <Setup2FAComponent />
    </AdminLayout>
  );
}
