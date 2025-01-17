"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import rain from "@/public/assets/bright-rain.png";

export default function Animation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function screenToSVG({ x: screenX, y: screenY }: { x: number; y: number }) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const rect = svg.getBoundingClientRect();

    const viewBoxWidth = 1512;
    const viewBoxHeight = 982;
    const scaleX = viewBoxWidth / rect.width;
    const scaleY = viewBoxHeight / rect.height;

    return {
      x: screenX * scaleX,
      y: screenY * scaleY,
    };
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={rain}
        alt="noise"
        layout="fill"
        objectFit="cover"
        className={`absolute left-0 top-0 mix-blend-overlay opacity-20 rounded-2xl  pointer-events-none z-10`}
      />

      <svg
        ref={svgRef}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const coords = screenToSVG({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
          setMousePosition(coords);
        }}
        viewBox="0 0 1512 982"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute inset-0 w-full h-full rounded-2xl`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g clipPath="url(#clip0_878_1737)">
          <rect width="1512" height="982" fill="#1C1C1C" />
          <g filter="url(#filter0_f_878_1737)">
            <path
              d="M984 217.5C984 359 658.5 387.756 583 456.5C507.5 525.244 158.359 964 -19.5 964C-162.829 1141.33 -139 1008 -52.805 933.553C-174.626 933.553 -103.184 -0.252945 -103.184 -97.0044C-103.184 -193.756 355.031 -40.2318 476.852 -40.2318C763.466 -126.742 984 120.749 984 217.5Z"
              fill="#2B2BFF"
              opacity="0.4"
            />
          </g>
          <g filter="url(#filter1_f_878_1737)">
            <ellipse
              cx="983.5"
              cy="-15.5"
              rx="332.5"
              ry="263.5"
              fill="#6B66FF"
              opacity="0.3"
            />
          </g>

          <motion.g
            id="mouse-input"
            style={{ mixBlendMode: "color-dodge" }}
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{
              type: "spring",
              mass: 0.1,
              stiffness: 50,
              damping: 15,
            }}
            filter="url(#filter2_f_878_1737)"
          >
            <path
              d="M145.315 -7.65351C122.208 154.962 385.107 134.277 519.445 103.607C555.57 82.7502 509.545 -26.117 443.829 -95.7139C378.113 -165.311 548.881 -294.712 484.481 -387.158C420.081 -479.603 174.199 -210.923 145.315 -7.65351Z"
              fill="#2B2BFF"
            />
            <path
              d="M233.221 -116.853C162.602 -177.782 -362.623 426.665 -182.463 523.08C-19.1196 610.495 401.825 195.226 451.222 153.295C512.968 100.882 321.496 -40.6913 233.221 -116.853Z"
              fill="#4B47FF"
            />
            <path
              d="M98.7067 -164.626C43.8658 -288.255 -143.801 -301.321 -235.873 -301.321C-327.946 -301.321 -513.6 -280.817 -519.637 -198.8C-527.184 -96.2787 -414.484 -88.7404 -414.484 128.363C-414.484 345.467 -216.754 206.259 23.2375 206.259C215.231 206.259 153.548 -40.9977 98.7067 -164.626Z"
              fill="#8583FF"
            />
          </motion.g>
        </g>
        <defs>
          <filter
            id="filter0_f_878_1737"
            x="-424"
            y="-429"
            width="1708"
            height="1780.99"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_878_1737"
            />
          </filter>
          <filter
            id="filter1_f_878_1737"
            x="351"
            y="-579"
            width="1265"
            height="1127"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_878_1737"
            />
          </filter>
          <filter
            id="filter2_f_878_1737"
            x="-960"
            y="-845.921"
            width="1932.12"
            height="1821.06"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="160"
              result="effect1_foregroundBlur_878_1737"
            />
          </filter>
          <clipPath id="clip0_878_1737">
            <rect width="1512" height="982" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
