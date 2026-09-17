import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";

const createCandidateSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  selectedJobField: z.string().min(1, "Job category is required"),
  preferredJobField: z.string().min(1, "Preferred job is required"),
  experience: z.string().min(1, "Experience is required"),
  city: z.string().min(1, "City is required"),
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const result = createCandidateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues?.[0]?.message || "Invalid information provided.",
        },
        { status: 400 }
      );
    }

    const { fullName, phone, email, selectedJobField, preferredJobField, experience, city } = result.data;
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists in the system." },
        { status: 409 }
      );
    }

 
    const hashedPassword = await bcrypt.hash("00000000", 12);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          role: "candidate",
          profileCompleted: false, 
        },
      });

      await tx.candidateProfile.create({
        data: {
          userId: user.id,
          phone,
          selectedJobField,
          preferredJobField,
          experience,
          city,
          status: "Applied",
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Candidate manually added successfully.",
    });
  } catch (error) {
    console.error("API Error (Admin Create Candidate):", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while adding the candidate." },
      { status: 500 }
    );
  }
}
