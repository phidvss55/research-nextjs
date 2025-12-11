export const setup2Fa = async (email: string) => {
  const res = await fetch("/api/auth/setup-2fa?email=" + email, {
    method: "GET",
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export const verify2FA = async (data: any) => {
  const res = await fetch("/api/auth/setup-2fa", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export const disable2FA = async (email: string) => {
  const res = await fetch("/api/auth/disable-2fa", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    throw new Error("Failed to disable 2FA");
  }
  return await res.json();
};
