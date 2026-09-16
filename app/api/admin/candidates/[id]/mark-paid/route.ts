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

    // Find candidate and their user ID
    const candidate = await prisma.candidateProfile.findUnique({
      where: { id: candidateId },
      include: { user: true },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found." },
        { status: 404 }
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

    // Send email receipt
    try {
      await resend.emails.send({
        from: "Shiv Shakti Multi Service <noreply@shivshaktimultiservice.com>",
        to: candidate.user.email,
        subject: "Cash Payment Receipt - Shiv Shakti",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Payment Receipt</h2>
            <p>Dear <strong>${candidate.user.fullName}</strong>,</p>
            <p>We have successfully received your cash payment. Thank you for upgrading to Premium Candidate!</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${amount}</p>
              <p style="margin: 5px 0;"><strong>Payment Mode:</strong> Cash</p>
              <p style="margin: 5px 0;"><strong>Receipt ID:</strong> ${receiptNumber}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
            
            <p>If you have any questions, please contact our support team.</p>
            <p>Best Regards,<br/><strong>Shiv Shakti Multi Service</strong></p>
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
