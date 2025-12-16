"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { disable2FA, setup2Fa, verify2FA } from "@/services/auth";
import { codeSchema } from "@/schemas/verify2fa.schema";

const Setup2FAComponent = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [data, setData] = useState<any>({});
  const [code, setCode] = useState<string>("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const session = await authClient.getSession();
        setVerified(session?.data?.user?.twoFactorEnabled ?? false);
      } catch (err) {
        console.error("err::", err);
        setVerified(false);
      }
    };
    fetch();
  }, []);

  const onSetup2FA = async () => {
    try {
      const session = await authClient.getSession();
      const res = await setup2Fa(session?.data?.user?.email as string);
      setData(res.data);
      setTwoFAEnabled(true);
      setCode("");
    } catch (err) {
      console.error("err::", err);
      toast.error("Failed to setup 2FA");
    }
  };

  const handleSetupCode = async () => {
    try {
      codeSchema.parse({ token: code });
      const payload = {
        token: code,
        secret: data.secret,
        email: data.user,
      };
      const res = await verify2FA(payload);
      if (res) {
        toast.success("2FA enabled successfully");
        setTwoFAEnabled(false);
      } else {
        toast.error("Failed to enable 2FA, please check your code");
      }
    } catch (err) {
      console.error("err::", err);
      toast.error("Failed to setup 2FA");
    }
  };

  const onDisable2FA = async () => {
    try {
      const session = await authClient.getSession();
      await disable2FA(session.data?.user.email as string);

      toast.success("2FA disabled successfully");
      setVerified(false);
    } catch (err) {
      console.error("err::", err);
      toast.error("Failed to disable 2FA");
    }
  };

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

            {!verified ? (
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
                onClick={onSetup2FA}
              >
                Enable 2FA
              </button>
            ) : (
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
                onClick={onDisable2FA}
              >
                Disable 2FA
              </button>
            )}
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
            <div className="flex justify-start py-4">
              {/* <div className="w-40 h-40 bg-gray-200 rounded-md animate-pulse"></div> */}
              <QRCode value={data.url} />
            </div>

            {/* Spacer */}
            <div className="w-full">
              <p>Or enter the code manually</p>
              <Input value={data.secret} disabled />
            </div>

            {/* Input Code */}
            <div>
              <label className="block font-medium text-gray-700">
                Authentication Code
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="flex justify-start text-white space-x-4">
              {verified ? (
                <button
                  className="bg-green-600 px-6 py-2 rounded-md shadow hover:bg-green-700 transition cursor-pointer"
                  onClick={handleSetupCode}
                >
                  Verify Code
                </button>
              ) : (
                <button className="bg-red-600 px-6 py-2 rounded-md shadow hover:bg-red-700 transition mt-4">
                  Disable 2FA
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Setup2FAComponent;
