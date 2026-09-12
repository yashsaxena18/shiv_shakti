import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { loginRateLimit } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const ip =
  request.headers.get("x-forwarded-for") ??
  "127.0.0.1";

const { success } = await loginRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      success: false,
      message: "Too many login attempts. Please try again after 1 minute.",
    },
    {
      status: 429,
    }
  );
}
    const body = await request.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

//   console.log(process.env.JWT_SECRET);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found.",
        },
        { status: 404 }
      );
    }

    

    console.log("Entered Password:", password);
console.log("Hash:", user.password);


const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );


    
// console.log("Password Match:", isPasswordCorrect);






    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password.",
        },
        { status: 401 }
      );
    }

    const token = generateToken({
  id: user.id,
  role: user.role,
});

(await cookies()).set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
});

    return NextResponse.json({
  success: true,
  message: "Login successful.",
  user: {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profileCompleted: user.profileCompleted,
  },
});
  } catch (error) {
  console.error("API Error:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Something went wrong.",
    },
    { status: 500 }
  );
  
}

}