"use client";

import { Settings } from "lucide-react";
import { useAuth } from "./context/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AdminNavbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="h-14 bg-white/60 backdrop-blur border-b border-gray-200 fixed top-0 right-0 left-64 z-20 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="font-semibold text-gray-800 tracking-wide">
          Admin Panel
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-4 cursor-pointer">
            <div className="bg-gray-200 px-3 py-1 rounded-sm text-sm text-gray-600 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Hello, {user?.name}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-h-12">
            <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
