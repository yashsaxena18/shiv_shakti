import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  try {
    // Allow only authenticated admin
    await requireAdmin();

    const candidates = await prisma.candidateProfile.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const stats = {
      total: candidates.length,
      applied: candidates.filter(c => c.status === "Applied").length,
      shortlisted: candidates.filter(c => c.status === "Shortlisted").length,
      interview: candidates.filter(c => c.status === "Interview").length,
      selected: candidates.filter(c => c.status === "Selected").length,
      rejected: candidates.filter(c => c.status === "Rejected").length,
    };

    return NextResponse.json({
      success: true,
      candidates,
      stats,
    });

  } catch (error: any) {
    console.error(error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (error.message === "Forbidden") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch candidates.",
      },
      { status: 500 }
    );
  }
}