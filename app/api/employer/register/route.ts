import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";

const registerSchema = z.object({
  employerName: z.string().min(2, "Employer name is required"),
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyAddress: z.string().min(5, "Company address is required"),
  candidatesRequired: z.number().min(1, "Must require at least 1 candidate"),
  selectedJobField: z.string().min(1, "Job category is required"),
  preferredJobField: z.string().min(1, "Preferred job is required"),
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
      selectedJobField,
      preferredJobField,
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
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          fullName: employerName, // Still storing for base user info
          email,
          password: hashedPassword,
          role: "employer", // Role is "employer" as requested
        },
      });

      await tx.employerProfile.create({
        data: {
          userId: newUser.id,
          employerName,
          companyName,
          phone,
          email,
          companyAddress,
          candidatesRequired,
          selectedJobField,
          preferredJobField,
          status: "PENDING", // By default as per schema, explicitly setting it for clarity
        },
      });

      return newUser;
    });

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Employer account created and logged in successfully.",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    console.error("API Error (Employer Register):", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
