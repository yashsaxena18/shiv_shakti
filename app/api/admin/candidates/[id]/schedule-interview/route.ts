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
    const { companyName, designation, date, time, location } = body;

    if (!companyName || !designation || !date || !time || !location) {
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
        designation,
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
        subject: `✨ INTERVIEW INVITATION: ${companyName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <p>✨ <strong>INTERVIEW INVITATION</strong></p>

            <p>Dear Candidate,</p>

            <p>Greetings from Shiv Shakti Multi Service.</p>

            <p>We are pleased to inform you that your interview has been officially scheduled with <strong>${companyName}</strong>. Kindly find the interview details below:</p>

            <p>━━━━━━━━━━━━━━━━━━<br/>
            🏢 <strong>Company:</strong> ${companyName}<br/>
            💼 <strong>Designation:</strong> ${designation}<br/>
            📅 <strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN')}<br/>
            ⏰ <strong>Time:</strong> ${time}<br/>
            📍 <strong>Location:</strong> ${location}<br/>
            ━━━━━━━━━━━━━━━━━━</p>

            <p><strong>Important:</strong><br/>
            Please arrive 10–15 minutes before the scheduled time and come prepared with the necessary documents and a copy of your updated resume.</p>

            <p>We wish you success in your interview and look forward to your presence.<br/>
            Please Provide Rating : Link </p>

            <p>Warm Regards,<br/>
            <strong>Shiv Shakti Multi Service</strong><br/>
            <span style="color: #666; font-size: 0.9em;">Recruitment • Placement • Multi Services</span></p>
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
