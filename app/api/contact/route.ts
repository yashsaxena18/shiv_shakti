import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues?.[0]?.message || "Please enter valid information.",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = result.data;

    // Send email using Resend
    await resend.emails.send({
      from: "Shiv Shakti Multi Service <info@shivshaktimultiservice.co.in>",
      to: "jobshiring.hrteam@gmail.com",
      replyTo: "jobshiring.hrteam@gmail.com",
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("API Error (Contact):", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while sending the message." },
      { status: 500 }
    );
  }
}
