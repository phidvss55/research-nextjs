export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800">Update Profile</h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="+1 234 567 890"
            className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
