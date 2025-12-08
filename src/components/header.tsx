export default function AdminNavbar() {
  return (
    <header className="h-14 bg-white/60 backdrop-blur border-b border-gray-200 fixed top-0 right-0 left-64 z-20 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="font-semibold text-gray-800 tracking-wide">
          Admin Panel
        </h1>

        <div className="flex items-center gap-4">
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
            Hello, Admin
          </div>
        </div>
      </div>
    </header>
  );
}
