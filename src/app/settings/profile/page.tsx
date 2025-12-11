import AdminLayout from "@/components/layouts/AdminLayout";
import { ProfileSettingComponent } from "@/components/pages/settings/ProfileComponent";

export default function ProfileSettingsPage() {
  return (
    <AdminLayout>
      <ProfileSettingComponent />
    </AdminLayout>
  );
}
