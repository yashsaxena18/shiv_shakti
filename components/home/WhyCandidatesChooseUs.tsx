"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const benefits = [
  { number: "01", title: "One-Time Registration", description: "Pay a nominal ₹499 registration fee once and create your candidate profile for the recruitment process." },
  { number: "02", title: "Career Preference Based", description: "Tell us about your preferred role, industry, skills and location so opportunities can align with your career goals." },
  { number: "03", title: "Multiple Industries", description: "Explore opportunities across automotive, manufacturing, engineering, electrical, EV and other industries." },
  { number: "04", title: "Multiple Locations", description: "Discover opportunities across Haridwar, SIDCUL, Pantnagar and other growing industrial locations." },
  { number: "05", title: "Professional Profile", description: "Build a structured candidate profile that presents your education, skills and experience clearly." },
  { number: "06", title: "Job Opportunities", description: "Our process is designed around giving interview opportunities to candidates as per their skills and experience." },
];

const testimonials = [
  { name: "Ravi Sharma", role: "Factory / Manufacturing", location: "Haridwar" },
  { name: "Rahul Kumar", role: "ITI / Technical", location: "Haridwar" },
  { name: "Rudra Verma", role: "Construction / Civil", location: "Uttarakhand" },
  { name: "Komal Singh", role: "Driver / Delivery", location: "Haridwar" },
  { name: "Raju Mehta", role: "Warehouse / Logistics", location: "SIDCUL" },
  { name: "Amit Rawat", role: "Security", location: "Haridwar" },
  { name: "Neha Sharma", role: "Housekeeping / Cleaning", location: "Haridwar" },
  { name: "Vikas Chauhan", role: "Hotel / Hospitality", location: "Uttarakhand" },
  { name: "Priya Joshi", role: "Restaurant / Food", location: "Haridwar" },
  { name: "Ankit Kumar", role: "Hospital / Healthcare", location: "Haridwar" },
  { name: "Pooja Negi", role: "Accounts & Finance", location: "SIDCUL" },
  { name: "Deepak Singh", role: "HR / Recruitment", location: "Haridwar" },
  { name: "Shivani Rawat", role: "Office / Back Office", location: "Haridwar" },
  { name: "Rohit Bisht", role: "Computer / IT", location: "Uttarakhand" },
  { name: "Anjali Gupta", role: "BPO / Call Center", location: "Haridwar" },
  { name: "Mohit Kumar", role: "Sales / Marketing", location: "Haridwar" },
  { name: "Karan Verma", role: "Digital Marketing / Creative", location: "SIDCUL" },
  { name: "Nisha Kapoor", role: "Retail / Store", location: "Haridwar" },
  { name: "Arjun Rawat", role: "Automobile / Garage", location: "Haridwar" },
  { name: "Kavita Sharma", role: "Power / Solar / Electrical", location: "Uttarakhand" },
];

function CandidateSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const candidateTicker = [...testimonials, ...testimonials];

  const getHalfWidth = () => sliderRef.current?.scrollWidth ? sliderRef.current.scrollWidth / 2 : 0;

  const applyPosition = (position: number) => {
    const slider = sliderRef.current;
    const halfWidth = getHalfWidth();
    if (!slider || !halfWidth) return;

    while (position <= -halfWidth) position += halfWidth;
    while (position > 0) position -= halfWidth;

    positionRef.current = position;
    slider.style.transform = `translate3d(${position}px, 0, 0)`;
  };

  useEffect(() => {
    const speed = 42;

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;

      const delta = Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;

      if (!draggingRef.current) {
        applyPosition(positionRef.current - (speed * delta) / 1000);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;

    draggingRef.current = true;
    setIsDragging(true);
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartPositionRef.current = positionRef.current;
    slider.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== event.pointerId) return;

    applyPosition(dragStartPositionRef.current + event.clientX - dragStartXRef.current);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    draggingRef.current = false;
    setIsDragging(false);
    pointerIdRef.current = null;

    const slider = sliderRef.current;
    if (slider?.hasPointerCapture(event.pointerId)) slider.releasePointerCapture(event.pointerId);

    lastTimeRef.current = null;
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    draggingRef.current = false;
    setIsDragging(false);
    pointerIdRef.current = null;
    lastTimeRef.current = null;
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-8 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-900/80 sm:w-20" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-8 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-900/80 sm:w-20" />

      <div className={`overflow-hidden rounded-2xl ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        <div
          ref={sliderRef}
          className="flex w-max select-none touch-pan-y gap-2 will-change-transform sm:gap-4"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {candidateTicker.map((candidate, index) => (
            <article
              key={`${candidate.name}-${index}`}
              className="relative flex h-[118px] w-[112px] shrink-0 flex-col justify-between overflow-hidden rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-0.5 dark:border-white dark:bg-zinc-950 dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] sm:h-[170px] sm:w-[255px] sm:rounded-2xl sm:p-5 sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-zinc-400 sm:text-[9px] sm:tracking-[0.16em]">Candidate</span>
                <span className="text-[8px] font-bold text-zinc-300 dark:text-zinc-700 sm:text-[10px]">
                  {String((index % testimonials.length) + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white dark:bg-white dark:text-black sm:h-10 sm:w-10 sm:text-xs">
                  {candidate.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-[10px] font-bold text-black dark:text-white sm:text-sm">{candidate.name}</h4>
                  <p className="mt-0.5 truncate text-[7px] font-medium text-zinc-400 sm:text-[10px]">Candidate</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800 sm:pt-3">
                <p className="truncate text-[8px] font-bold leading-4 text-zinc-800 dark:text-zinc-200 sm:text-xs sm:leading-5">{candidate.role}</p>
                <p className="mt-0.5 truncate text-[7px] font-medium text-zinc-500 sm:text-[10px]">{candidate.location}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black dark:bg-white sm:h-1" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhyCandidatesChooseUs() {
  return (
    <section id="stories" className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/40 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-zinc-200/60 blur-3xl dark:bg-zinc-800/40" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-800/30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-950">
              <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black dark:text-white sm:text-xs">Candidate First</span>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              Get Your Dream Job Oppurtunity With Us.
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="group relative overflow-hidden rounded-2xl border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-950 dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)] sm:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black sm:h-9 sm:w-9 sm:text-[11px]">
                  {benefit.number}
                </span>

                <span className="text-lg text-zinc-200 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-zinc-800 sm:text-xl">
                  ↗
                </span>
              </div>

              <div className="mt-4 sm:mt-5">
                <h3 className="text-sm font-bold leading-5 text-black dark:text-white sm:text-lg">{benefit.title}</h3>
                <p className="mt-2 text-[11px] leading-5 text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-6">{benefit.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full dark:bg-white" />
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">Candidate Stories</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl lg:text-4xl dark:text-white">Our Candidates</h3>
            </div>

            <p className="max-w-md text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
              Candidates from different backgrounds, skills and career fields exploring their next professional opportunity.
            </p>
          </div>

          <div className="mt-8">
            <CandidateSlider />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400 sm:text-[10px]">← Swipe / Drag to explore →</p>

            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-5 rounded-full bg-black dark:bg-white" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border-2 border-black bg-black p-6 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-white dark:text-black sm:mt-12 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">Create your Profile Now and Get your Job :)</h3>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-zinc-300 dark:border-black/20 dark:text-zinc-600">
                Proven Trusted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}