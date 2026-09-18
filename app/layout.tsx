// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shivshaktimultiservice.co.in"),
  title: "Shiv Shakti Multi Service | Premium Recruitment Consultancy",
  description: "Shiv Shakti Multi Service is a modern recruitment consultancy helping teams hire with clarity and confidence.",
  keywords: [
    "Recruitment in Haridwar", 
    "Job Consultancy", 
    "Hiring agency", 
    "Shiv Shakti Multi Service", 
    "Jobs in Uttarakhand", 
    "Placement agency",
    "Career Opportunities",
    "top placement agency in India",
    "top placement agency in Haridwar",
    "best placement agency in Uttarakhand",
    "Professional hiring agency in India",
    "Most trusted placement agency in India",
    "Recruitment services in Haridwar",
    "Staffing solutions in Uttarakhand",
    "Job placement services in Haridwar",
    "Top HR consultancy in Uttarakhand",
    "Shubham Machal",
    "shubhammachalofficial",
    "Industrial consultancy",
    "sidcul jobs",
    "Haridwar Jobs",
    "Available Sidcul Industrial Jobs",
    "onrole jobs",
    "permanent jobs",

    
  ],
  openGraph: {
    title: "Shiv Shakti Multi Service | Premium Recruitment Consultancy",
    description: "Shiv Shakti Multi Service is a modern recruitment consultancy helping People to get the Jobs.",
    url: "https://www.shivshaktimultiservice.co.in/",
    siteName: "Shiv Shakti Multi Service",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Shakti Multi Service | Premium Recruitment Consultancy",
    description: "Shiv Shakti Multi Service is a modern recruitment consultancy helping People to get the Jobs.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
