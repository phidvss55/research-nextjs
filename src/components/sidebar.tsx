"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Roles", href: "/admin/roles" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900/95 backdrop-blur text-gray-100 h-screen fixed left-0 top-0 shadow-lg border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-5 text-xl font-bold tracking-wide bg-gray-900/80 border-b border-gray-800">
        Interia Admin
      </div>

      {/* Main Navigation */}
      <nav className="mt-4 px-3 space-y-2 flex-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                active
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "hover:bg-gray-800 hover:text-white text-gray-300"
              }`}
            >
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Settings Section */}
      <div className="px-3 py-4 border-t border-gray-800 bg-gray-900/80">
        <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 tracking-wider">
          Settings
        </h4>

        <div className="space-y-2">
          {/* Update Profile */}
          <Link
            href="/settings/profile"
            className={`block px-4 py-2 rounded-md text-sm transition-all ${
              pathname === "/settings/profile"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            Update Profile
          </Link>

          {/* 2FA Setup */}
          <Link
            href="/settings/setup-2fa"
            className={`block px-4 py-2 rounded-md text-sm transition-all ${
              pathname === "/settings/setup-2fa"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            Two-Factor Auth (2FA)
          </Link>
        </div>
      </div>
    </aside>
  );
}
