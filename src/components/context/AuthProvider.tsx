"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { Session, User } from "better-auth/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchSession = async () => {
    try {
      const { data } = await authClient.getSession();
      setSession(data?.session || null);
      setUser(data?.user || null);
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setSession(null);
            setUser(null);
            router.push("/login"); // redirect to login page
          },
        },
      });

      await authClient.signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const refreshSession = async () => {
    setIsLoading(true);
    await fetchSession();
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
