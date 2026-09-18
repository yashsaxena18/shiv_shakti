import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function requireAdmin() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const payload = verifyToken(token) as {
      id: string;
      role: string;
    };

    if (payload.role !== "admin") {
      throw new Error("Forbidden");
    }

    return payload;
  } catch (error: any) {
    if (error.message === "Forbidden") {
      throw error;
    }
    // Token verification failed (e.g. invalid signature, expired)
    throw new Error("Unauthorized");
  }
}