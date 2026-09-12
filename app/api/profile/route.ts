import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ============================================
// POST - Save / Update Candidate Profile
// ============================================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("========== PROFILE POST START ==========");
    console.log("Received profile data:", body);

    const {
      userId,
      phone,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      pincode,
      highestQualification,
      college,
      passingYear,
      skills,
      selectedJobField,
      preferredJobField,
      experience,
      fullName,
    } = body;

    // Check userId
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
        },
        { status: 400 }
      );
    }

    // Save / update CandidateProfile
    const profile = await prisma.candidateProfile.upsert({
      where: {
        userId,
      },

      update: {
        phone,

        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth)
          : null,

        gender,

        address,
        city,
        state,

        country: "India",

        pincode,
        highestQualification,
        college,
        passingYear,
        skills,
        selectedJobField,
        preferredJobField,
        experience,
      },

      create: {
        userId,

        phone,

        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth)
          : null,

        gender,

        address,
        city,
        state,

        country: "India",

        pincode,
        highestQualification,
        college,
        passingYear,
        skills,
        selectedJobField,
        preferredJobField,
        experience,
      },
    });

    console.log(
      "PROFILE UPSERT SUCCESS:",
      profile
    );

    // Update User table
    const updatedUser =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          fullName,
          profileCompleted: true,
        },

        select: {
          id: true,
          fullName: true,
          email: true,
          profileCompleted: true,
        },
      });

    console.log(
      "USER UPDATE SUCCESS:",
      updatedUser
    );

    console.log(
      "========== PROFILE POST END =========="
    );

    return NextResponse.json({
      success: true,
      message: "Profile saved successfully.",
      profile: {
        ...profile,
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error(
      "PROFILE API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================
// GET - Get Candidate Profile
// ============================================

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const userId =
      searchParams.get("userId");

    console.log(
      "========== PROFILE GET START =========="
    );

    console.log(
      "PROFILE GET USER ID:",
      userId
    );

    // Check userId
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------
    // First get User
    // --------------------------------------------

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },

        select: {
          id: true,
          fullName: true,
          email: true,
          profileCompleted: true,
        },
      });

    console.log(
      "PROFILE GET USER:",
      user
    );

    // User does not exist
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------
    // Get CandidateProfile
    // --------------------------------------------

    const profile =
      await prisma.candidateProfile.findUnique({
        where: {
          userId,
        },
      });

    console.log(
      "PROFILE GET CANDIDATE PROFILE:",
      profile
    );

    // --------------------------------------------
    // If profile doesn't exist yet
    // --------------------------------------------

    if (!profile) {
      return NextResponse.json({
        success: true,

        profile: {
          user,

          phone: "",
          dateOfBirth: null,
          gender: null,

          address: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",

          highestQualification: "",
          college: "",
          passingYear: "",

          skills: "",
          selectedJobField: "",
          preferredJobField: "",
          experience: "",
        },
      });
    }

    // --------------------------------------------
    // Profile exists
    // --------------------------------------------

    console.log(
      "========== PROFILE GET SUCCESS =========="
    );

    return NextResponse.json({
      success: true,

      profile: {
        ...profile,
        user,
      },
    });
  } catch (error) {
    console.error(
      "PROFILE GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading profile.",
      },
      {
        status: 500,
      }
    );
  }
}