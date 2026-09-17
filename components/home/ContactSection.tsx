"use client";

import {
    Clock3,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Failed to send message");
                return;
            }

            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="
        relative
        overflow-hidden
        border-t
        border-zinc-200
        bg-white
        py-16
        dark:border-zinc-800
        dark:bg-[#0f0f10]
        sm:py-20
        lg:py-24
      "
        >
            {/* =====================================================
          BACKGROUND
      ====================================================== */}

            <div
                className="
          pointer-events-none
          absolute
          right-[-100px]
          top-[-100px]
          h-72
          w-72
          rounded-full
          bg-zinc-100
          blur-3xl
          dark:bg-zinc-900
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          bottom-[-120px]
          left-[-100px]
          h-80
          w-80
          rounded-full
          bg-zinc-100
          blur-3xl
          dark:bg-zinc-900
        "
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* =====================================================
            HEADER
        ====================================================== */}

                <div className="max-w-2xl">
                    <div
                        className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black
              bg-white
              px-3
              py-1.5
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              dark:border-white
              dark:bg-zinc-950
            "
                    >
                        <span
                            className="
                h-1.5
                w-1.5
                rounded-full
                bg-black
                dark:bg-white
              "
                        />

                        <span
                            className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-black
                dark:text-white
                sm:text-xs
              "
                        >
                            Contact Us
                        </span>
                    </div>

                    <h2
                        className="
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-zinc-950
              sm:text-4xl
              lg:text-5xl
              dark:text-white
            "
                    >
                        Let&apos;s take the next step together.
                    </h2>

                    <p
                        className="
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-zinc-600
              sm:text-base
              sm:leading-7
              dark:text-zinc-400
            "
                    >
                        Have a question about registration, your candidate
                        profile or career opportunities? Our team is here to
                        help.
                    </p>
                </div>

                {/* =====================================================
            CONTENT
        ====================================================== */}

                <div
                    className="
            mt-10
            grid
            gap-6
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-8
            xl:gap-10
          "
                >
                    {/* ===================================================
              CONTACT INFORMATION
          =================================================== */}

                    <div className="space-y-3 sm:space-y-4">
                        {/* Address */}

                        <div
                            className="
                group
                rounded-2xl
                border-2
                border-black
                bg-zinc-50
                p-5
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                dark:border-white
                dark:bg-zinc-950
                dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]
                dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.7)]
                sm:p-6
              "
                        >
                            <div className="flex gap-4">
                                <div
                                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-black
                    text-white
                    dark:bg-white
                    dark:text-black
                  "
                                >
                                    <MapPin size={18} strokeWidth={1.8} />
                                </div>

                                <div>
                                    <h3
                                        className="
                      text-sm
                      font-bold
                      text-black
                      dark:text-white
                      sm:text-base
                    "
                                    >
                                        Office Address
                                    </h3>

                                    <p
                                        className="
                      mt-2
                      text-xs
                      leading-5
                      text-zinc-600
                      dark:text-zinc-400
                      sm:text-sm
                      sm:leading-6
                    "
                                    >
                                        Plot No. 1407 Salempur Mehdood
                                        <br />
                                        Near Mantra Appartment
                                        <br />
                                        Nehru Colony, Haridwar
                                        <br />
                                        Uttarakhand - 249403
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}

                        <a
                            href="mailto:jobshiring.hrteam@gmail.com"
                            className="
                group
                block
                rounded-2xl
                border-2
                border-black
                bg-zinc-50
                p-5
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                dark:border-white
                dark:bg-zinc-950
                dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]
                dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.7)]
                sm:p-6
              "
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-black
                    text-white
                    dark:bg-white
                    dark:text-black
                  "
                                >
                                    <Mail size={18} strokeWidth={1.8} />
                                </div>

                                <div className="min-w-0">
                                    <h3
                                        className="
                      text-sm
                      font-bold
                      text-black
                      dark:text-white
                      sm:text-base
                    "
                                    >
                                        Email
                                    </h3>

                                    <p
                                        className="
                      mt-1
                      break-all
                      text-xs
                      text-zinc-600
                      dark:text-zinc-400
                      sm:text-sm
                    "
                                    >
                                        jobshiring.hrteam@gmail.com
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Phone */}

                        <a
                            href="tel:+917088642658"
                            className="
                group
                block
                rounded-2xl
                border-2
                border-black
                bg-zinc-50
                p-5
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                dark:border-white
                dark:bg-zinc-950
                dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]
                dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.7)]
                sm:p-6
              "
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-black
                    text-white
                    dark:bg-white
                    dark:text-black
                  "
                                >
                                    <Phone size={18} strokeWidth={1.8} />
                                </div>

                                <div>
                                    <h3
                                        className="
                      text-sm
                      font-bold
                      text-black
                      dark:text-white
                      sm:text-base
                    "
                                    >
                                        Phone
                                    </h3>

                                    <p
                                        className="
                      mt-1
                      text-xs
                      text-zinc-600
                      dark:text-zinc-400
                      sm:text-sm
                    "
                                    >
                                        +91 7088642658
                                    </p>
                                </div>
                            </div>
                        </a>

                        {/* Working Hours */}

                        <div
                            className="
                group
                rounded-2xl
                border-2
                border-black
                bg-zinc-50
                p-5
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                dark:border-white
                dark:bg-zinc-950
                dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]
                dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.7)]
                sm:p-6
              "
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-black
                    text-white
                    dark:bg-white
                    dark:text-black
                  "
                                >
                                    <Clock3 size={18} strokeWidth={1.8} />
                                </div>

                                <div>
                                    <h3
                                        className="
                      text-sm
                      font-bold
                      text-black
                      dark:text-white
                      sm:text-base
                    "
                                    >
                                        Working Hours
                                    </h3>

                                    <p
                                        className="
                      mt-1
                      text-xs
                      leading-5
                      text-zinc-600
                      dark:text-zinc-400
                      sm:text-sm
                    "
                                    >
                                        Monday - Saturday
                                        <br />
                                        9:30 AM - 6:30 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===================================================
              CONTACT FORM
          =================================================== */}

                    <div
                        className="
              rounded-2xl
              border-2
              border-black
              bg-white
              p-5
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              dark:border-white
              dark:bg-zinc-950
              dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]
              sm:rounded-3xl
              sm:p-8
              lg:p-10
            "
                    >
                        <div>
                            <p
                                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-500
                  sm:text-xs
                "
                            >
                                Get In Touch
                            </p>

                            <h3
                                className="
                  mt-2
                  text-xl
                  font-bold
                  tracking-tight
                  text-black
                  sm:text-2xl
                  dark:text-white
                "
                            >
                                Send us a message
                            </h3>

                            <p
                                className="
                  mt-2
                  text-xs
                  leading-5
                  text-zinc-500
                  sm:text-sm
                  sm:leading-6
                  dark:text-zinc-400
                "
                            >
                                Tell us how we can help with your registration,
                                profile or career-related questions.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
                        >
                            {/* Name + Email */}

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      text-zinc-700
                      dark:text-zinc-300
                    "
                                    >
                                        Your Name
                                    </label>

                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(event) =>
                                            handleChange("name", event.target.value)
                                        }
                                        placeholder="Enter your name"
                                        className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-zinc-300
                      bg-white
                      px-4
                      text-sm
                      text-zinc-950
                      outline-none
                      transition-all
                      placeholder:text-zinc-400
                      focus:border-black
                      focus:ring-2
                      focus:ring-black/10
                      dark:border-zinc-700
                      dark:bg-zinc-900
                      dark:text-white
                      dark:placeholder:text-zinc-500
                      dark:focus:border-white
                      dark:focus:ring-white/10
                    "
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      text-zinc-700
                      dark:text-zinc-300
                    "
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(event) =>
                                            handleChange("email", event.target.value)
                                        }
                                        placeholder="you@example.com"
                                        className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-zinc-300
                      bg-white
                      px-4
                      text-sm
                      text-zinc-950
                      outline-none
                      transition-all
                      placeholder:text-zinc-400
                      focus:border-black
                      focus:ring-2
                      focus:ring-black/10
                      dark:border-zinc-700
                      dark:bg-zinc-900
                      dark:text-white
                      dark:placeholder:text-zinc-500
                      dark:focus:border-white
                      dark:focus:ring-white/10
                    "
                                    />
                                </div>
                            </div>

                            {/* Phone */}

                            <div>
                                <label
                                    htmlFor="contact-phone"
                                    className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                  "
                                >
                                    Phone Number
                                </label>

                                <input
                                    id="contact-phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(event) =>
                                        handleChange("phone", event.target.value)
                                    }
                                    placeholder="+91 XXXXX XXXXX"
                                    className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-zinc-300
                    bg-white
                    px-4
                    text-sm
                    text-zinc-950
                    outline-none
                    transition-all
                    placeholder:text-zinc-400
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/10
                    dark:border-zinc-700
                    dark:bg-zinc-900
                    dark:text-white
                    dark:placeholder:text-zinc-500
                    dark:focus:border-white
                    dark:focus:ring-white/10
                  "
                                />
                            </div>

                            {/* Message */}

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                  "
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={(event) =>
                                        handleChange("message", event.target.value)
                                    }
                                    placeholder="How can we help you?"
                                    className="
                    min-h-[130px]
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-zinc-300
                    bg-white
                    p-4
                    text-sm
                    leading-6
                    text-zinc-950
                    outline-none
                    transition-all
                    placeholder:text-zinc-400
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/10
                    dark:border-zinc-700
                    dark:bg-zinc-900
                    dark:text-white
                    dark:placeholder:text-zinc-500
                    dark:focus:border-white
                    dark:focus:ring-white/10
                  "
                                />
                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                  group
                  inline-flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-black
                  px-5
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-zinc-800
                  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]
                  active:translate-y-0
                  active:shadow-none
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  dark:bg-white
                  dark:text-black
                  dark:hover:bg-zinc-200
                "
                            >
                                {loading ? "Sending..." : "Send Message"}

                                {!loading && (
                                    <Send
                                        size={16}
                                        strokeWidth={2}
                                        className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                                    />
                                )}
                            </button>

                            <p
                                className="
                  text-center
                  text-[10px]
                  leading-5
                  text-zinc-400
                "
                            >
                                We&apos;ll use your details only to respond to your
                                enquiry.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}