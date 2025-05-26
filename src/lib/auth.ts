import { logEvent } from "@/utils/sentry";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret"
);
const cookieName = "auth_token";

export async function signAuthToken(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h") // Token valid for 1 hour
      .sign(secret);

    return token;
  } catch (error) {
    logEvent("Token signing failed", "auth", { payload }, "error", error);
    throw new Error("Failed to sign authentication token");
  }
}

export async function verifyAuthToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    logEvent(
      "Token verification failed",
      "auth",
      { tokenSnippet: token.slice(0, 10) },
      "error",
      error
    );
    throw new Error("Invalid authentication token");
  }
}

export async function setAuthCookie(token: string) {
  try {
    const cookiesStore = await cookies();

    cookiesStore.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });
  } catch (error) {
    logEvent("Setting auth cookie failed", "auth", { token }, "error", error);
    throw new Error("Failed to set authentication cookie");
  }
}

export async function getAuthCookie() {
  try {
    const cookiesStore = await cookies();

    return cookiesStore.get(cookieName)?.value || null;
  } catch (error) {
    logEvent("Getting auth cookie failed", "auth", {}, "error", error);

    throw new Error("Failed to retrieve authentication cookie");
  }
}

export async function deleteAuthCookie() {
  try {
    const cookiesStore = await cookies();

    cookiesStore.delete(cookieName);
    logEvent("Auth cookie deleted", "auth", {}, "info");
  } catch (error) {
    logEvent("Deleting auth cookie failed", "auth", {}, "error", error);
    throw new Error("Failed to delete authentication cookie");
  }
}
