import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    // We can delete the User directly (which cascades to EmployerProfile)
    // First, find the EmployerProfile to get the userId
    const employerProfile = await prisma.employerProfile.findUnique({
      where: { id },
    });

    if (!employerProfile) {
      return NextResponse.json(
        { success: false, message: "Employer not found." },
        { status: 404 }
      );
    }

    // Deleting the User will Cascade and delete EmployerProfile
    await prisma.user.delete({
      where: {
        id: employerProfile.userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Employer deleted successfully.",
    });
  } catch (error: any) {
    console.error("API Error (Admin Employers DELETE):", error);

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
      { success: false, message: "Unable to delete employer." },
      { status: 500 }
    );
  }
}
