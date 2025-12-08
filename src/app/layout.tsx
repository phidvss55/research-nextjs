import AdminNavbar from "@/components/header";
import AdminSidebar from "@/components/sidebar";
import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AdminSidebar />
        <AdminNavbar />

        <main className="ml-64 mt-14 p-8 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
