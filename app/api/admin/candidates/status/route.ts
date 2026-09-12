import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function PUT(request: Request) {
  try {
    // Only Admin Allowed
    await requireAdmin();

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate ID and status are required.",
        },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidateProfile.findUnique({
      where: {
        id,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate not found.",
        },
        { status: 404 }
      );
    }

    await prisma.candidateProfile.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidate status updated successfully.",
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
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}