import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { otpRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {

    const ip =
  request.headers.get("x-forwarded-for") ??
  "127.0.0.1";

const { success } = await otpRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Too many OTP attempts. Please try again after 5 minutes.",
    },
    {
      status: 429,
    }
  );
}

    const { email, otp } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    if (!user.resetOtp || !user.resetOtpExpiry) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP not found.",
        },
        { status: 400 }
      );
    }

    if (user.resetOtp !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        { status: 400 }
      );
    }

    if (new Date() > user.resetOtpExpiry) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP expired.",
        },
        { status: 400 }
      );
    }

    // Generate Secure Reset Token
    const resetToken = crypto.randomUUID();

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),

        // OTP ko invalidate kar do
        resetOtp: null,
        resetOtpExpiry: null,
      },
    });

    return NextResponse.json({
      success: true,
      token: resetToken,
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