import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id: candidateId } = await params;
    const body = await req.json();
    const amount = Number(body.amount);

    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { success: false, message: "Valid amount is required." },
        { status: 400 }
      );
    }

    console.log("mark-paid called with id:", candidateId);

    // Find candidate and their user ID (check both id and userId just in case)
    const candidate = await prisma.candidateProfile.findFirst({
      where: {
        OR: [
          { id: candidateId },
          { userId: candidateId }
        ]
      },
      include: { user: true },
    });

    console.log("Found candidate:", candidate);

    if (!candidate) {
      console.error(`Candidate with ID ${candidateId} not found in DB!`);
      return NextResponse.json(
        { success: false, message: "Candidate not found." },
        { status: 400 } // Changed from 404 to 400 to trace
      );
    }

    // Check if they already have a SUCCESS payment
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: candidate.userId,
        status: "SUCCESS"
      }
    });

    if (existingPayment) {
      return NextResponse.json(
        { success: false, message: "User is already paid." },
        { status: 400 }
      );
    }

    const receiptNumber = `CASH_${Date.now()}_${candidate.userId.substring(0, 5)}`;

    const newPayment = await prisma.payment.create({
      data: {
        userId: candidate.userId,
        mode: "CASH",
        amount: amount * 100, // store in paise
        currency: "INR",
        status: "SUCCESS",
        receiptNumber: receiptNumber,
      },
    });

    const dateStr = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata', 
      dateStyle: 'long', 
      timeStyle: 'short' 
    });



    return NextResponse.json({
      success: true,
      message: "User successfully upgraded to paid.",
      payment: newPayment,
      receiptDetails: {
        amount,
        receiptNumber,
        dateStr,
        candidateName: candidate.user.fullName,
        phone: candidate.phone,
      }
    });

  } catch (error: any) {
    console.error("Mark Paid API Error:", error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
