"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { SiteNavbar } from "@/components/site-navbar";
import ProfileStep1 from "@/components/candidate/profile-step-1";
import ProfileStep2 from "@/components/candidate/profile-step-2";
import ProfileStep3 from "@/components/candidate/profile-step-3";
import { ProfileProgress } from "@/components/candidate/profile-progress";
import {
  jobCategories,
  jobCategoryNames,
} from "@/lib/job-categories";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CandidateProfilePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [highestQualification, setHighestQualification] =
    useState("");
  const [college, setCollege] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [skills, setSkills] = useState("");

  // Job Field = Excel wali category
  const [selectedJobField, setSelectedJobField] =
    useState("");

  // Preferred Job Field = Excel wali actual job
  const [preferredJobField, setPreferredJobField] =
    useState("");

  const [experience, setExperience] = useState("");

  const [step, setStep] = useState(1);
  const router = useRouter();

  const [hasPaid, setHasPaid] = useState(false);
  const [paymentChecking, setPaymentChecking] =
    useState(true);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  // ============================================
  // Load Existing Profile + Payment Status
  // ============================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const response = await fetch(
          `/api/profile?userId=${userId}`
        );

        const result = await response.json();

        if (!result.success) return;

        const profile = result.profile;

        setFullName(profile.user.fullName || "");
        setPhone(profile.phone || "");

        setDob(
          profile.dateOfBirth
            ? profile.dateOfBirth.substring(0, 10)
            : ""
        );

        setGender(profile.gender || "");

        setAddress(profile.address || "");
        setCity(profile.city || "");
        setState(profile.state || "");
        setPincode(profile.pincode || "");

        setHighestQualification(
          profile.highestQualification || ""
        );

        setCollege(profile.college || "");
        setPassingYear(profile.passingYear || "");
        setSkills(profile.skills || "");
        setSelectedJobField(profile.selectedJobField || "");
        setPreferredJobField(profile.preferredJobField || "");
        setExperience(profile.experience || "");

        // ========================================
        // Load saved Job
        // ========================================

        const savedJob =
          profile.preferredJobField || "";

        setPreferredJobField(savedJob);

        // Saved Job se uska Job Field / Category find karo
        if (savedJob) {
          const category = Object.entries(
            jobCategories
          ).find(([, jobs]) =>
            jobs.includes(savedJob)
          );

          if (category) {
            setSelectedJobField(category[0]);
          }
        }

        setExperience(profile.experience || "");
      } catch (error) {
        console.error("Profile loading error:", error);
      }
    };

    const checkPaymentStatus = async () => {
      try {
        const userId =
          localStorage.getItem("userId");

        if (!userId) {
          setPaymentChecking(false);
          return;
        }

        const response = await fetch(
          `/api/payment/check?userId=${userId}`
        );

        const result = await response.json();

        console.log(
          "PROFILE PAYMENT CHECK:",
          result
        );

        if (response.ok && result.success) {
          setHasPaid(result.paid);
        } else {
          setHasPaid(false);
        }
      } catch (error) {
        console.error(
          "Payment status check error:",
          error
        );

        setHasPaid(false);
      } finally {
        setPaymentChecking(false);
      }
    };

    checkPaymentStatus();
    loadProfile();
  }, []);

  // ============================================
  // Personal Information Change
  // ============================================

  const handleChange = (
    field: "fullName" | "phone" | "dob" | "gender",
    value: string
  ) => {
    switch (field) {
      case "fullName":
        setFullName(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "dob":
        setDob(value);
        break;

      case "gender":
        setGender(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================================
  // Location Change
  // ============================================

  const handleLocationChange = (
    field:
      | "address"
      | "city"
      | "state"
      | "pincode",
    value: string
  ) => {
    switch (field) {
      case "address":
        setAddress(value);
        break;

      case "city":
        setCity(value);
        break;

      case "state":
        setState(value);
        break;

      case "pincode":
        setPincode(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================================
  // Professional Information Change
  // ============================================

  const handleProfessionalChange = (
    field:
      | "highestQualification"
      | "college"
      | "passingYear"
      | "skills"
      | "preferredJobField"
      | "experience",
    value: string
  ) => {
    switch (field) {
      case "highestQualification":
        setHighestQualification(value);
        break;

      case "college":
        setCollege(value);
        break;

      case "passingYear":
        setPassingYear(value);
        break;

      case "skills":
        setSkills(value);
        break;

      case "preferredJobField":
        setPreferredJobField(value);
        break;

      case "experience":
        setExperience(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================================
  // Job Field Change
  // ============================================

  const handleJobFieldChange = (
    value: string
  ) => {
    setSelectedJobField(value);

    // Job Field change hone par purani Job clear
    setPreferredJobField("");

    setErrors((prev) => ({
      ...prev,
      selectedJobField: "",
      preferredJobField: "",
    }));
  };

  // ============================================
  // Validation
  // ============================================

  const validateStep = (
    currentStep: number
  ) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!fullName.trim()) {
        newErrors.fullName =
          "Full Name is required.";
      }

      if (!phone.trim()) {
        newErrors.phone =
          "Phone Number is required.";
      }

      if (!dob) {
        newErrors.dob =
          "Date of Birth is required.";
      }

      if (!gender) {
        newErrors.gender =
          "Please select your gender.";
      }
    }

    if (currentStep === 2) {
      if (!address.trim()) {
        newErrors.address =
          "Address is required.";
      }

      if (!city.trim()) {
        newErrors.city =
          "City is required.";
      }

      if (!state.trim()) {
        newErrors.state =
          "State is required.";
      }

      if (!pincode.trim()) {
        newErrors.pincode =
          "Pincode is required.";
      }
    }

    if (currentStep === 3) {
      if (!highestQualification.trim()) {
        newErrors.highestQualification =
          "Highest Qualification is required.";
      }

      if (!passingYear.trim()) {
        newErrors.passingYear =
          "Passing Year is required.";
      }

      if (!skills.trim()) {
        newErrors.skills =
          "Skills are required.";
      }

      // Excel wali Job Field / Category
      if (!selectedJobField) {
        newErrors.selectedJobField =
          "Please select a job field.";
      }

      // Excel wali actual Job
      if (!preferredJobField) {
        newErrors.preferredJobField =
          "Please select your preferred job.";
      }

      if (!experience) {
        newErrors.experience =
          "Please select your experience.";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ============================================
  // Payment Integration
  // ============================================

  const handlePayment = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      if (!userId) {
        router.push("/login");
        return;
      }

      // Check if candidate has already paid
      const paymentCheckResponse =
        await fetch(
          `/api/payment/check?userId=${userId}`
        );

      if (!paymentCheckResponse.ok) {
        const errorText =
          await paymentCheckResponse.text();

        console.error(
          "Payment check failed:",
          paymentCheckResponse.status,
          errorText
        );

        alert(
          "Unable to check previous payment status."
        );

        return;
      }

      const paymentCheck =
        await paymentCheckResponse.json();

      // Already paid → directly save/update profile
      if (paymentCheck.paid) {
        await handleSubmit();
        return;
      }

      // ==========================================
      // Create Razorpay Order
      // ==========================================

      const orderResponse = await fetch(
        "/api/payment/create-order",
        {
          method: "POST",
        }
      );

      const orderResult =
        await orderResponse.json();

      console.log(
        "CREATE ORDER STATUS:",
        orderResponse.status
      );

      console.log(
        "CREATE ORDER RESPONSE:",
        orderResult
      );

      if (!orderResult.success) {
        alert(
          orderResult.message ||
            "Unable to create payment."
        );

        return;
      }

      const order = orderResult.order;

      console.log(
        "RAZORPAY ORDER:",
        order
      );

      // ==========================================
      // Open Razorpay Checkout
      // ==========================================

      const options = {
        key: process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: "Shiv Shakti Multi Service",

        description:
          "Candidate Registration Fee",

        order_id: order.id,

        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // ======================================
            // Verify Payment
            // ======================================

            const verifyResponse =
              await fetch(
                "/api/payment/verify",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    userId:
                      localStorage.getItem(
                        "userId"
                      ),
                  }),
                }
              );

            const verifyText =
              await verifyResponse.text();

            console.log(
              "VERIFY STATUS:",
              verifyResponse.status
            );

            console.log(
              "VERIFY RESPONSE:",
              verifyText
            );

            if (!verifyResponse.ok) {
              console.error(
                "Payment verification API failed:",
                verifyText
              );

              alert(
                "Payment verification failed. Registration was not completed."
              );

              return;
            }

            let verifyResult;

            try {
              verifyResult =
                JSON.parse(verifyText);
            } catch (error) {
              console.error(
                "Verify API returned invalid JSON:",
                verifyText
              );

              alert(
                "Payment verification returned an invalid response."
              );

              return;
            }

            if (!verifyResult.success) {
              alert(
                verifyResult.message ||
                  "Payment verification failed. Registration was not completed."
              );

              return;
            }

            // ======================================
            // Payment Successfully Verified
            // ======================================

            setHasPaid(true);

            localStorage.setItem(
              "paymentSuccessMessage",
              "Payment successful. Your receipt has been sent to your registered email."
            );

            // Save Profile
            await handleSubmit();
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            alert(
              "Payment was completed, but verification failed. Please contact support."
            );
          }
        },

        prefill: {
          name: fullName,
        },

        theme: {
          color: "#18181b",
        },

        modal: {
          ondismiss: function () {
            console.log(
              "Payment popup closed."
            );
          },
        },
      };

      const Razorpay =
        window.Razorpay;

      const razorpay =
        new Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      alert(
        "Unable to start payment. Please try again."
      );
    }
  };

  // ============================================
  // Next Button
  // ============================================

  const handleNext = () => {
    if (!validateStep(step)) {
      return;
    }

    if (step === 3) {
      handlePayment();
      return;
    }

    setStep(step + 1);
  };

  // ============================================
  // Save / Update Profile
  // ============================================

  const handleSubmit = async () => {
    const userId =
      localStorage.getItem("userId");

    console.log(
      "Submitting Profile with User ID:",
      userId
    );

    try {
      if (!userId) {
        router.push("/login");
        return;
      }

      console.log({
        fullName,
        highestQualification,
        college,
        passingYear,
        skills,

        // Category is currently UI state
        selectedJobField,

        // Actual job will be saved
        preferredJobField,

        experience,
      });

      const response = await fetch(
        "/api/profile",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
            fullName,

            phone,
            dateOfBirth: dob,
            gender,

            address,
            city,
            state,
            pincode,

            highestQualification,
            college,
            passingYear,
            skills,

            // फिलहाल database में actual job save होगी
            preferredJobField,

            experience,
          }),
        }
      );

      const result =
        await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.push(
        "/candidate/dashboard"
      );
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0f0f10]">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <SiteNavbar />

      <main className="mx-auto flex max-w-3xl justify-center px-4 pt-28 pb-8">
        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold lg:text-3xl">
            Complete Your Profile
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-500">
            Complete your profile to help recruiters
            understand your skills, education and career
            preferences.
          </p>

          <div className="mt-4">
            <ProfileProgress step={step} />
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
            {step === 1 && (
              <ProfileStep1
                fullName={fullName}
                phone={phone}
                dob={dob}
                gender={gender}
                onChange={handleChange}
                errors={errors}
              />
            )}

            {step === 2 && (
              <ProfileStep2
                address={address}
                city={city}
                state={state}
                pincode={pincode}
                onChange={handleLocationChange}
                errors={errors}
              />
            )}

            {step === 3 && (
              <ProfileStep3
                highestQualification={
                  highestQualification
                }
                college={college}
                passingYear={passingYear}
                skills={skills}

                // New Job Field
                selectedJobField={
                  selectedJobField
                }

                // Actual Job
                preferredJobField={
                  preferredJobField
                }

                experience={experience}

                onChange={
                  handleProfessionalChange
                }

                // New category handler
                onJobFieldChange={
                  handleJobFieldChange
                }

                // Excel based data
                jobCategories={
                  jobCategories
                }

                jobCategoryNames={
                  jobCategoryNames
                }

                errors={errors}
              />
            )}
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
    
    {/* Back Button */}
    {step > 1 ? (
      <button
        type="button"
        onClick={() => setStep(step - 1)}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 text-base leading-none dark:border-zinc-600">
          ←
        </span>

        <span>Back</span>
      </button>
    ) : (
      <div className="hidden sm:block" />
    )}

    {/* Next / Pay Now / Submit Button */}
    <button
      type="button"
      onClick={handleNext}
      disabled={step === 3 && paymentChecking}
      className={`flex h-11 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold transition sm:w-auto sm:min-w-[140px] ${
        step === 3 && paymentChecking
          ? "cursor-not-allowed bg-zinc-300 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
          : step === 3 && !hasPaid
          ? "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]"
          : "bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      }`}
    >
      {step === 3
        ? paymentChecking
          ? "Checking..."
          : hasPaid
          ? "Submit"
          : "Pay Now"
        : "Next →"}
    </button>
  </div>
</div>
        </div>
      </main>
    </div>
  );
}

