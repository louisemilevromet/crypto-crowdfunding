"use client";

import { useState } from "react";
import CrowdFundingCard from "./CrowdFundingCard";
import Animation from "./Animation";

export default function Hero() {
  return (
    <section className="w-full mt-24 mb-12 mx-auto h-[calc(100vh-9rem)] px-4 lg:px-6 flex items-center justify-center">
      <div className="w-full mx-auto relative max-w-[1082px] h-full flex items-center justify-center">
        <div className="absolute inset-0 z-20 pointer-events-auto">
          <div className="aspect-[16/9] w-full h-full overflow-hidden">
            <Animation border={true} />
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] z-30 pointer-events-none">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-full p-4 text-center flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Empower the Future of Crypto
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mb-4">
                  Join the revolution in crypto crowdfunding. Support
                  groundbreaking blockchain projects and be part of the next big
                  innovation.
                </p>
              </div>
              <div className="pointer-events-auto">
                <CrowdFundingCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
