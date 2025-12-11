import React from "react";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
