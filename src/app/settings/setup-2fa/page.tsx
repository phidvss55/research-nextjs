export default function TwoFactorSettingsPage() {
  const twoFAEnabled = false; // Replace based on user state (example only)

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800">
        Two-Factor Authentication
      </h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* IF 2FA is disabled */}
        {!twoFAEnabled && (
          <>
            <p className="text-gray-600">
              Add an extra layer of security to your account using authenticator
              apps such as Google Authenticator or Authy.
            </p>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition">
              Enable 2FA
            </button>
          </>
        )}

        {/* IF 2FA is enabled */}
        {twoFAEnabled && (
          <>
            <p className="text-gray-600">
              Scan the QR code with your authenticator app, then enter the code
              below to confirm.
            </p>

            {/* QR Code Placeholder */}
            <div className="flex justify-center py-4">
              <div className="w-40 h-40 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Input Code */}
            <div>
              <label className="block font-medium text-gray-700">
                Authentication Code
              </label>
              <input
                type="text"
                placeholder="123456"
                className="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Verify Button */}
            <button className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition">
              Verify Code
            </button>

            {/* Disable 2FA Button */}
            <button className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700 transition mt-4">
              Disable 2FA
            </button>
          </>
        )}
      </div>
    </div>
  );
}
