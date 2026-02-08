import React from "react";
import Link from "next/link";

export default function ManagerHubPage() {
  const stats = [
    { label: "Active Projects", value: 8 },
    { label: "Team Members", value: 24 },
    { label: "Tasks Due", value: 31 },
    { label: "Utilization", value: "73%" },
  ];

  const projects = [
    {
      name: "Website Redesign",
      owner: "Design Team",
      status: "On Track",
      progress: 68,
    },
    { name: "Mobile App", owner: "Product", status: "At Risk", progress: 42 },
    { name: "Marketing Q1", owner: "Marketing", status: "On Track", progress: 80 },
  ];

  const team = [
    { name: "Alice Nguyen", role: "Project Manager", status: "Available" },
    { name: "Brian Lee", role: "Frontend Engineer", status: "Busy" },
    { name: "Carla Gomez", role: "Designer", status: "Available" },
    { name: "David Kim", role: "Backend Engineer", status: "Busy" },
  ];

  const activities = [
    { title: "Task 'Create wireframes' completed", time: "2h ago" },
    { title: "New comment on 'API contract'", time: "5h ago" },
    { title: "Brian pushed 'auth fixes'", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600" />
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Manager Hub</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">Export</button>
            <button className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">New</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="text-sm text-gray-500">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">{s.value}</div>
            </div>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg border border-gray-200 bg-white">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Projects</h2>
              <button className="text-sm text-blue-600 hover:underline">View all</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.name} className="rounded-md border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-base font-semibold text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">Owner: {p.owner}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      p.status === "On Track"
                        ? "text-green-700 border-green-300 bg-green-50"
                        : "text-amber-700 border-amber-300 bg-amber-50"
                    }`}>{p.status}</span>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-100 rounded">
                      <div
                        className="h-2 bg-blue-600 rounded"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Progress: {p.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:underline">Refresh</button>
            </div>
            <ul className="p-4 space-y-3">
              {activities.map((a, idx) => (
                <li key={idx} className="flex items-start justify-between">
                  <div className="text-sm text-gray-800">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-700">Team</h2>
            <div className="flex items-center gap-2">
              <button className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">Invite</button>
              <button className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">Assign</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {team.map((m) => (
                  <tr key={m.name}>
                    <td className="px-4 py-2 text-sm text-gray-800">{m.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{m.role}</td>
                    <td className="px-4 py-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        m.status === "Available"
                          ? "text-green-700 border-green-300 bg-green-50"
                          : "text-amber-700 border-amber-300 bg-amber-50"
                      }`}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 text-sm text-gray-500">
          <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
