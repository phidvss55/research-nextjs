import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Full Stack Playwright Demo
      </h1>
      <nav>
        <ul className="flex space-x-6 gap-5 !mt-4 ">
          <li>
            <Link href="/users">
              <span className="text-blue-600 hover:underline">Users</span>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <span className="text-blue-600 hover:underline">Posts</span>
            </Link>
          </li>
          <li>
            <Link href="/manager-hub">
              <span className="text-blue-600 hover:underline">Manager Hub</span>
            </Link>
          </li>
          <li>
            <Link href="/manager-hub/figma">
              <span className="text-blue-600 hover:underline">Manager Hub — Figma</span>
            </Link>
          </li>
          <li>
            <Link href="/manager-hub/member-department">
              <span className="text-blue-600 hover:underline">Member & Department (Figma)</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
