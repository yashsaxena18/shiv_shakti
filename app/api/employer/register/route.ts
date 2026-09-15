import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  employerName: z.string().min(2, "Employer name is required"),
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyAddress: z.string().min(5, "Company address is required"),
  candidatesRequired: z.number().min(1, "Must require at least 1 candidate"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.errors[0].message || "Please enter valid information.",
        },
        { status: 400 }
      );
    }

    const {
      employerName,
      companyName,
      phone,
      email,
      password,
      companyAddress,
      candidatesRequired,
    } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Atomic transaction for creating User and EmployerProfile
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: employerName, // Still storing for base user info
          email,
          password: hashedPassword,
          role: "employer", // Role is "employer" as requested
        },
      });

      await tx.employerProfile.create({
        data: {
          userId: user.id,
          employerName,
          companyName,
          phone,
          email,
          companyAddress,
          candidatesRequired,
          status: "PENDING", // By default as per schema, explicitly setting it for clarity
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Employer account created successfully.",
    });
  } catch (error) {
    console.error("API Error (Employer Register):", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
