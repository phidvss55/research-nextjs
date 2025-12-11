import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await getUserSession();
    if (session?.session != null) {
      redirect("/");
    }
  } catch (error) {
    console.log(error);
    redirect("/");
  }

  return (
    <>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
