// app/api/admin/candidates/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const candidate = await prisma.candidateProfile.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
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

    return NextResponse.json({
      success: true,
      candidate,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

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

    await prisma.candidateProfile.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidate deleted successfully.",
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