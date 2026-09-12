import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function requireAdmin() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = verifyToken(token) as {
    id: string;
    role: string;
  };

  if (payload.role !== "admin") {
    throw new Error("Forbidden");
  }

  return payload;
}