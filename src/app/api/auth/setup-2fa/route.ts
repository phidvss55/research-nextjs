import { NextRequest, NextResponse } from "next/server";
import totpManager from "../lib/totp";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const email = searchParams?.get("email");
  if (!email) {
    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 }
    );
  }

  const time2fa = totpManager.cGenerateKey(email);
  return NextResponse.json({ data: time2fa, success: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data.token || !data.secret) {
    return NextResponse.json(
      { success: false, error: "Invalid params" },
      { status: 400 }
    );
  }

  try {
    const result = totpManager.cVerifyToken(data.token, data.secret);
    if (!result) {
      throw new Error("Wrong code");
    }

    console.log("data.email", data.email);
    await db
      .update(user)
      .set({
        twoFactorEnabled: true,
      })
      .where(eq(user.email, data.email));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Wrong code" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: null, success: true }, { status: 200 });
}
