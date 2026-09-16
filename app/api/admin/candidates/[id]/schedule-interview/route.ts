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
    const { companyName, date, time, location } = body;

    if (!companyName || !date || !time || !location) {
      return NextResponse.json(
        { success: false, message: "All interview fields are required." },
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

    // Create the interview
    const newInterview = await prisma.interview.create({
      data: {
        candidateId: candidate.id,
        companyName,
        date: new Date(date),
        time,
        location,
        status: "SCHEDULED",
      },
    });

    // Clean up old interviews (delete interviews older than 3 months for this candidate)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    await prisma.interview.deleteMany({
      where: {
        candidateId: candidate.id,
        date: {
          lt: threeMonthsAgo,
        },
      },
    });

    // Send email
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: candidate.user.email,
        subject: `Interview Scheduled: ${companyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Interview Scheduled</h2>
            <p>Dear <strong>${candidate.user.fullName}</strong>,</p>
            <p>We are excited to inform you that an interview has been scheduled for your profile!</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Company:</strong> ${companyName}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN')}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
              <p style="margin: 5px 0;"><strong>Location/Link:</strong> ${location}</p>
            </div>
            
            <p>Please ensure you are prepared and arrive/join on time.</p>
            <p>Best Regards,<br/><strong>Shiv Shakti Multi Service</strong></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send interview email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Interview scheduled successfully.",
      interview: newInterview,
    });

  } catch (error: any) {
    console.error("Schedule Interview Error:", error);

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
