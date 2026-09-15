import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(req: Request) {
  try {
    // Allow only authenticated admin
    await requireAdmin();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "paid" or "unpaid"

    const candidates = await prisma.candidateProfile.findMany({
      include: {
        user: {
          include: {
            payments: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Filter by type if provided
    let filteredCandidates = candidates;
    if (type === "paid") {
      filteredCandidates = candidates.filter(
        (c) => c.user?.payments?.some((p) => p.status === "SUCCESS")
      );
    } else if (type === "unpaid") {
      filteredCandidates = candidates.filter(
        (c) => !c.user?.payments?.some((p) => p.status === "SUCCESS")
      );
    }

    const stats = {
      total: filteredCandidates.length,
      applied: filteredCandidates.filter(c => c.status === "Applied").length,
      shortlisted: filteredCandidates.filter(c => c.status === "Shortlisted").length,
      interview: filteredCandidates.filter(c => c.status === "Interview").length,
      selected: filteredCandidates.filter(c => c.status === "Selected").length,
      rejected: filteredCandidates.filter(c => c.status === "Rejected").length,
    };

    return NextResponse.json({
      success: true,
      candidates: filteredCandidates,
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