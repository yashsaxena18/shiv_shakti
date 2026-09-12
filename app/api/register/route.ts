import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter valid information.",
        },
        { status: 400 }
      );
    }

    const { fullName, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully.",
    });
  } catch(error) {
    console.error("API Error:",error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}