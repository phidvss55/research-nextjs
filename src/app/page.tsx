import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function Homepage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700">Card {i}</h3>
            <p className="text-gray-500 mt-1">Beautiful card content here.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
