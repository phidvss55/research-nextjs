import AdminNavbar from "@/components/header";
import AdminSidebar from "@/components/sidebar";
import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "../context/AuthProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await getUserSession();
    if (session?.session == null) {
      redirect("/login");
    }
  } catch (error) {
    console.log(error);
    redirect("/login");
  }

  return (
    <AuthProvider>
      <AdminSidebar />
      <AdminNavbar />
      <main className="ml-64 mt-14 p-8 min-h-screen">{children}</main>
    </AuthProvider>
  );
}
