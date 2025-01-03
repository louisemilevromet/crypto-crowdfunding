"use client";

import { useState, useEffect } from "react";
import CrowdFundingCard from "./CrowdFundingCard";
import Animation from "./Animation";

export default function Hero() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("header");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  return (
    <section className="w-full flex items-center justify-center min-h-screen mt-24">
      <div className="w-full mx-auto relative max-w-[1082px] aspect-[3/4] sm:aspect-[1/1] md:aspect-[4/3] lg:aspect-[16/9]">
        <div className="absolute inset-0 z-20 pointer-events-auto">
          <div className="w-full h-full overflow-hidden">
            <Animation />
          </div>
        </div>

        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-evenly py-8 sm:py-12 md:py-16">
          <div className="w-full text-center flex flex-col items-center justify-center gap-6 p-4 md:p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Empower the Future of Crypto
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl">
                Join the revolution in crypto crowdfunding. Support
                groundbreaking blockchain projects and be part of the next big
                innovation.
              </p>
            </div>
          </div>
          <div className="pointer-events-auto w-full max-w-md px-4 text-center">
            <CrowdFundingCard />
          </div>
        </div>
      </div>
    </section>
  );
}
