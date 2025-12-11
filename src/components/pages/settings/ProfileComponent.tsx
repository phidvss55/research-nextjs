import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSuspense from "@/components/ui/loading-suspense";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import {
  Laptop,
  Link,
  Settings,
  Settings2,
  Shield,
  TriangleAlert,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AccountDeletion } from "./AccountDeletion";
import { AccountLinking } from "./AccountLinking";
import SessionManagement from "./SessionManager";
import ChangePasswordForm from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";
import { SetPasswordButton } from "./SetPasswordButton";
import { Badge } from "@/components/ui/badge";
import { PasskeyManagement } from "./SecurityManager";
import { TwoFactorAuth } from "./TwoFactorAuth";

export const ProfileSettingComponent = async () => {
  // const { user } = useAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (session == null) return redirect("/auth/login");

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-3xl font-bold text-gray-800">Update Profile</h2>

      <Tabs className="space-y-2" defaultValue="profile">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">
            <Settings />
            <span className="max-sm:hidden">Update profile</span>
          </TabsTrigger>

          <TabsTrigger value="password">
            <Settings2 />
            <span className="max-sm:hidden">Update password</span>
          </TabsTrigger>

          <TabsTrigger value="session">
            <Laptop />
            <span className="max-sm:hidden">Session Manager</span>
          </TabsTrigger>

          <TabsTrigger value="security">
            <Shield />
            <span className="max-sm:hidden">Security Manager</span>
          </TabsTrigger>

          <TabsTrigger value="accounts">
            <Link />
            <span className="max-sm:hidden">Account Links</span>
          </TabsTrigger>

          <TabsTrigger value="deletion">
            <TriangleAlert />
            <span className="max-sm:hidden">Account Deletion</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent>
              <UpdateProfile />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session">
          <Card>
            <CardContent>
              <SessionsTab currentSessionToken={session.session.token} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <LoadingSuspense>
            <SecurityTab
              email={session.user.email}
              isTwoFactorEnabled={session.user.twoFactorEnabled ?? false}
            />
          </LoadingSuspense>
        </TabsContent>

        <TabsContent value="accounts">
          <LoadingSuspense>
            <LinkedAccountsTab />
          </LoadingSuspense>
        </TabsContent>

        <TabsContent value="deletion">
          <LoadingSuspense>
            <AccountDeletion />
          </LoadingSuspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

async function SessionsTab({
  currentSessionToken,
}: {
  currentSessionToken: string;
}) {
  const sessions = await auth.api.listSessions({ headers: await headers() });

  return (
    <Card>
      <CardContent>
        <SessionManagement
          sessions={sessions}
          currentSessionToken={currentSessionToken}
        />
      </CardContent>
    </Card>
  );
}

async function LinkedAccountsTab() {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  const nonCredentialAccounts = accounts.filter(
    (a) => a.providerId !== "credential"
  );

  return (
    <Card>
      <CardContent>
        <AccountLinking currentAccounts={nonCredentialAccounts} />
      </CardContent>
    </Card>
  );
}

async function SecurityTab({
  email,
  isTwoFactorEnabled,
}: {
  email: string;
  isTwoFactorEnabled: boolean;
}) {
  const [passkeys, accounts] = await Promise.all([
    auth.api.listPasskeys({ headers: await headers() }),
    auth.api.listUserAccounts({ headers: await headers() }),
  ]);

  const hasPasswordAccount = accounts.some(
    (a) => a.providerId === "credential"
  );

  return (
    <div className="space-y-6">
      {hasPasswordAccount ? (
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password for improved security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Set Password</CardTitle>
            <CardDescription>
              We will send you a password reset email to set up a password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SetPasswordButton email={email} />
          </CardContent>
        </Card>
      )}
      {hasPasswordAccount && (
        <Card>
          <CardHeader className="flex items-center justify-between gap-2">
            <CardTitle>Two-Factor Authentication</CardTitle>
            <Badge variant={isTwoFactorEnabled ? "default" : "secondary"}>
              {isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </CardHeader>
          <CardContent>
            <TwoFactorAuth isEnabled={isTwoFactorEnabled} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Passkeys</CardTitle>
        </CardHeader>
        <CardContent>
          <PasskeyManagement passkeys={passkeys} />
        </CardContent>
      </Card>
    </div>
  );
}
