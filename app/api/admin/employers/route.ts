import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  try {
    // Allow only authenticated admin
    await requireAdmin();

    const employers = await prisma.employerProfile.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const stats = {
      total: employers.length,
      pending: employers.filter((e) => e.status === "PENDING").length,
      approved: employers.filter((e) => e.status === "APPROVED").length,
      rejected: employers.filter((e) => e.status === "REJECTED").length,
    };

    return NextResponse.json({
      success: true,
      employers,
      stats,
    });
  } catch (error: any) {
    console.error("API Error (Admin Employers GET):", error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (error.message === "Forbidden") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to fetch employers." },
      { status: 500 }
    );
  }
}
