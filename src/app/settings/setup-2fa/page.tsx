import AdminLayout from "@/components/layouts/AdminLayout";
import Setup2FAComponentCustom from "@/components/pages/CustomSetupTwoFactor";

export default function TwoFactorSettingsPage() {
  return (
    <AdminLayout>
      <Setup2FAComponentCustom />
    </AdminLayout>
  );
}
