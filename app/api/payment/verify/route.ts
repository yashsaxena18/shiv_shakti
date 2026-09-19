import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = await req.json();

    // 1. REQUIRED DATA CHECK
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return NextResponse.json({ success: false, message: "Payment details are missing." }, { status: 400 });
    }

    // 2. VERIFY RAZORPAY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(body).digest("hex");
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Payment verification failed." }, { status: 400 });
    }

    // 3. FETCH PAYMENT FROM RAZORPAY
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // 4. PAYMENT MUST BE CAPTURED
    if (payment.status !== "captured") {
      return NextResponse.json({ success: false, message: "Payment has not been captured." }, { status: 400 });
    }

    // 5. GET USER
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, fullName: true, email: true },
    });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // 6. Check whether payment already exists
    const existingPayment = await prisma.payment.findUnique({ where: { razorpayOrderId: razorpay_order_id } });

    let finalReceiptNumber: string;
    let paymentRecord;

    // 7. Existing payment
    if (existingPayment) {
      if (existingPayment.receiptNumber) {
        // Receipt already exists
        finalReceiptNumber = existingPayment.receiptNumber;
        paymentRecord = existingPayment;
      } else {
        // Existing payment but receipt number missing
        finalReceiptNumber = `SSMS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        paymentRecord = await prisma.payment.update({
          where: { id: existingPayment.id },
          data: { receiptNumber: finalReceiptNumber },
        });
      }
    } else {
      // 8. New payment
      finalReceiptNumber = `SSMS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      paymentRecord = await prisma.payment.create({
        data: {
          userId,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          receiptNumber: finalReceiptNumber,
          amount: Number(payment.amount),
          currency: payment.currency,
          status: "SUCCESS",
        },
      });
    }

    // 9. PAYMENT MODE
    const paymentMode = process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ? "Razorpay (Test Mode)" : "Razorpay (Live Mode)";

    // 10. RECEIPT DATE
    const receiptDate = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const receiptTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

    // 11. CREATE PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { width, height } = page.getSize();

    // COLORS
    const black = rgb(0.05, 0.05, 0.05);
    const darkGray = rgb(0.25, 0.25, 0.25);
    const gray = rgb(0.45, 0.45, 0.45);
    const lightGray = rgb(0.90, 0.90, 0.90);
    const boxGray = rgb(0.96, 0.96, 0.96);
    const green = rgb(0.05, 0.45, 0.18);

    // HELPER FUNCTIONS
    const drawCenteredText = (text: string, y: number, size: number, font: typeof regularFont, color = black) => {
      const textWidth = font.widthOfTextAtSize(text, size);
      page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
    };

    const drawLine = (y: number, thickness = 1, color = lightGray) => {
      page.drawLine({ start: { x: 35, y }, end: { x: width - 35, y }, thickness, color });
    };

    const drawBox = (x: number, y: number, w: number, h: number) => {
      page.drawRectangle({ x, y, width: w, height: h, borderColor: lightGray, borderWidth: 1, color: rgb(1, 1, 1) });
    };

    // HEADER
    drawCenteredText("SHIV SHAKTI MULTI SERVICE", height - 55, 20, boldFont, black);
    drawCenteredText("Sidcul, Uttarakhand, India   |   +91 7088642658   |   shivshaktimultiservice.co.in", height - 78, 7.5, regularFont, darkGray);
    drawLine(height - 95, 1.2, darkGray);

    // TITLE
    drawCenteredText("PAYMENT RECEIPT", height - 135, 24, boldFont, black);
    drawCenteredText("Candidate Registration", height - 158, 11, regularFont, gray);

    // SUMMARY BOX
    const summaryX = 35;
    const summaryY = 585;
    const summaryW = 525;
    const summaryH = 100;
    drawBox(summaryX, summaryY, summaryW, summaryH);
    const columnWidth = summaryW / 4;

    const summaryItems = [
      { title: "Receipt Date", value: receiptDate, sub: receiptTime },
      { title: "Receipt Number", value: finalReceiptNumber, sub: "" },
      { title: "Payment Status", value: "SUCCESS", sub: "" },
      { title: "Payment Mode", value: paymentMode, sub: paymentMode.includes("Test Mode") ? "" : "" },
    ];

    summaryItems.forEach((item, index) => {
      const centerX = summaryX + columnWidth * index + columnWidth / 2;

      if (index > 0) {
        page.drawLine({
          start: { x: summaryX + columnWidth * index, y: summaryY + 15 },
          end: { x: summaryX + columnWidth * index, y: summaryY + summaryH - 15 },
          thickness: 0.8,
          color: lightGray,
        });
      }

      const titleWidth = boldFont.widthOfTextAtSize(item.title, 8.5);
      page.drawText(item.title, { x: centerX - titleWidth / 2, y: summaryY + 57, size: 8.5, font: boldFont, color: darkGray });

      const valueSize = index === 1 || index === 3 ? 8 : 10;
      const valueWidth = boldFont.widthOfTextAtSize(item.value, valueSize);
      page.drawText(item.value, {
        x: centerX - valueWidth / 2,
        y: summaryY + 35,
        size: valueSize,
        font: index === 2 || index === 0 || index === 1 ? boldFont : boldFont,
        color: index === 2 ? green : black,
      });

      if (item.sub) {
        const subWidth = regularFont.widthOfTextAtSize(item.sub, 7.5);
        page.drawText(item.sub, { x: centerX - subWidth / 2, y: summaryY + 19, size: 7.5, font: regularFont, color: gray });
      }
    });

    // CANDIDATE DETAILS
    const candidateBoxY = 450;
    drawBox(35, candidateBoxY, 525, 105);

    page.drawText("CANDIDATE DETAILS", { x: 50, y: candidateBoxY + 78, size: 13, font: boldFont, color: black });
    page.drawLine({ start: { x: 190, y: candidateBoxY + 82 }, end: { x: 545, y: candidateBoxY + 82 }, thickness: 1, color: lightGray });

    page.drawText("Name", { x: 50, y: candidateBoxY + 52, size: 10, font: boldFont });
    page.drawText(user.fullName, { x: 430, y: candidateBoxY + 52, size: 10, font: regularFont });
    page.drawLine({ start: { x: 50, y: candidateBoxY + 40 }, end: { x: 545, y: candidateBoxY + 40 }, thickness: 0.6, color: lightGray });

    page.drawText("Email", { x: 50, y: candidateBoxY + 18, size: 10, font: boldFont });
    const emailWidth = regularFont.widthOfTextAtSize(user.email, 9);
    page.drawText(user.email, { x: 545 - emailWidth, y: candidateBoxY + 18, size: 9, font: regularFont, color: darkGray });

    // TRANSACTION DETAILS
    const transactionBoxY = 235;
    drawBox(35, transactionBoxY, 525, 190);

    page.drawText("TRANSACTION DETAILS", { x: 50, y: transactionBoxY + 163, size: 13, font: boldFont });
    page.drawLine({ start: { x: 205, y: transactionBoxY + 167 }, end: { x: 545, y: transactionBoxY + 167 }, thickness: 1, color: lightGray });

    const transactionRows = [
      ["Payment ID", paymentRecord.razorpayPaymentId || "N/A"],
      ["Order ID", paymentRecord.razorpayOrderId || "N/A"],
      ["Amount Paid", `INR ${(paymentRecord.amount / 100).toFixed(2)}`],
      ["Currency", paymentRecord.currency || "INR"],
      ["Status", "SUCCESS"],
    ];

    let rowY = transactionBoxY + 130;

    transactionRows.forEach(([label, value], index) => {
      page.drawText(label, { x: 50, y: rowY, size: 10, font: boldFont });
      const valueWidth = regularFont.widthOfTextAtSize(value, 9);
      page.drawText(value, {
        x: 545 - valueWidth,
        y: rowY,
        size: 9,
        font: index === 4 ? boldFont : regularFont,
        color: index === 4 ? green : darkGray,
      });

      if (index < transactionRows.length - 1) {
        page.drawLine({ start: { x: 50, y: rowY - 12 }, end: { x: 545, y: rowY - 12 }, thickness: 0.6, color: lightGray });
      }

      rowY -= 29;
    });

    // THANK YOU BOX
    const thankBoxY = 100;
    drawBox(35, thankBoxY, 525, 105);

    drawCenteredText("Thank you for registering with Shiv Shakti Multi Service.", thankBoxY + 65, 10, boldFont, black);
    drawCenteredText("We appreciate your trust in us.", thankBoxY + 45, 9, regularFont, darkGray);
    page.drawLine({ start: { x: 150, y: thankBoxY + 28 }, end: { x: 445, y: thankBoxY + 28 }, thickness: 0.7, color: lightGray });
    drawCenteredText("This is a computer-generated receipt and does not require a physical signature.", thankBoxY + 12, 7.5, regularFont, gray);

    // FOOTER
    page.drawLine({ start: { x: 35, y: 55 }, end: { x: 560, y: 55 }, thickness: 1, color: darkGray });
    drawCenteredText("www.shivshaktimultiservice.co.in", 35, 8, regularFont, darkGray);

    // SAVE PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    // EMAIL
    const emailResult = await resend.emails.send({
      from: "Shiv Shakti Multi Service <info@shivshaktimultiservice.co.in>",
      to: user.email,
      replyTo: "jobshiring.hrteam@gmail.com",
      subject: "Payment Receipt - Shiv Shakti Multi Service",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #18181b;">
          <h2 style="margin-bottom: 5px;">Shiv Shakti Multi Service</h2>
          <p>Dear Sir/Mam ${user.fullName},</p>
          <p>Your candidate registration payment has been successfully verified.</p>
          <div style="border: 1px solid #e4e4e7; border-radius: 8px; padding: 18px; margin: 20px 0;">
            <p><strong>Receipt Number:</strong> ${finalReceiptNumber}</p>
            <p><strong>Receipt Date:</strong> ${receiptDate}</p>
            <p><strong>Amount Paid:</strong> INR ${(paymentRecord.amount / 100).toFixed(2)}</p>
            <p><strong>Payment Status:</strong> <span style="color:#087f3f;">SUCCESS</span></p>
          </div>
          <p>Your payment receipt is attached to this email as a PDF.</p>
          <p>Please keep this receipt for your records.</p>
          <p>Regards,<br /><strong>Shiv Shakti Multi Service</strong></p>
        </div>
      `,
      attachments: [{ filename: `${finalReceiptNumber}.pdf`, content: pdfBuffer }],
    });

    console.log("Receipt email sent:", emailResult);

    // SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      message: "Payment verified and receipt sent successfully.",
      payment: paymentRecord,
      receiptNumber: finalReceiptNumber,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false, message: "Unable to verify payment." }, { status: 500 });
  }
}