import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const updateStatusSchema = z.object({
  id: z.string(),
  status: z.string(),
});

export async function PUT(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const result = updateStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { id, status } = result.data;

    await prisma.employerProfile.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Status updated successfully.",
    });
  } catch (error: any) {
    console.error("API Error (Admin Employers Status PUT):", error);

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
      { success: false, message: "Unable to update status." },
      { status: 500 }
    );
  }
}
