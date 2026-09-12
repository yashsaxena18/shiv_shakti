import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Get userId from query
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    // -----------------------------------------
    // 1. Validate userId
    // -----------------------------------------

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          paid: false,
          payment: null,
          message: "User ID is missing.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // 2. Find latest successful payment
    // -----------------------------------------

    const payment = await prisma.payment.findFirst({
      where: {
        userId: userId,
        status: "SUCCESS",
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        receiptNumber: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        razorpayPaymentId: true,
      },
    });

    // -----------------------------------------
    // 3. Return payment status
    // -----------------------------------------

    return NextResponse.json(
      {
        success: true,

        // true if successful payment exists
        paid: !!payment,

        // Payment details for dashboard
        payment: payment || null,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PAYMENT CHECK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        paid: false,
        payment: null,
        message:
          "Unable to check payment status.",
      },
      {
        status: 500,
      }
    );
  }
}