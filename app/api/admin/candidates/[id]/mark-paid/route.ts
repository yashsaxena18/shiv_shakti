import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email receipt
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: candidate.user.email,
        subject: "Payment Receipt - Shiv Shakti Multi Service",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <p><strong>Payment Receipt</strong></p>

            <p>Dear Sir/Mam ${candidate.user.fullName},</p>

            <p>We are pleased to confirm that your payment has been successfully received. Thank you for choosing Shiv Shakti Multi Service and upgrading to our Premium Candidate service.</p>

            <p><strong>Payment Details</strong></p>

            <p>Amount Paid: ₹${amount}<br/>
            Payment Method: Cash<br/>
            Receipt ID: ${receiptNumber}<br/>
            Payment Date: ${dateStr}<br/>
            Service: Premium Candidate</p>

            <p>Your payment has been recorded successfully, and your Premium Candidate service is now active.</p>

            <p>⭐ <strong>We Value Your Feedback</strong></p>

            <p>We would love to hear about your experience with Shiv Shakti Multi Service.</p>

            <p>👉 [Leave a Review]</p>

            <p>Thank you for choosing Shiv Shakti Multi Service.</p>

            <p>Warm Regards,<br/>
            <strong>Shiv Shakti Multi Service</strong><br/>
            <span style="color: #666; font-size: 0.9em;">Recruitment & Placement Services</span></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send receipt email:", emailError);
      // We don't fail the request if email fails
    }

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
