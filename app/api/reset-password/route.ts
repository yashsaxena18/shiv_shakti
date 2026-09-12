import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reset link.",
        },
        { status: 400 }
      );
    }

    if (
      !user.resetTokenExpiry ||
      new Date() > user.resetTokenExpiry
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset link expired.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,

        resetToken: null,
        resetTokenExpiry: null,

        resetOtp: null,
        resetOtpExpiry: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}