"use client";
import { LogoAnimationDuration } from "@/app";
import {
  motion,
  motionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import LogoPath from "./SvgMotionComponents/LogoPath";
import LogoSvg from "./SvgMotionComponents/LogoSvg";

const GoogleLogo = () => {
  const [isComplete, setIsComplete] = useState(false);
"52 42 88 66"
  return (
 <LogoSvg minX={52} minY={42} width={88} height={66}>
        <LogoPath
          isComplete={isComplete}
          fillColor="#4285f4"
          svgMotionProps={{
            stroke: "#4285f4",
            d: "M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6",
          }}
        />
        <LogoPath
          isComplete={isComplete}
          fillColor="#34a853"
          svgMotionProps={{
            stroke: "#34a853",
            d: "M120 108h14c3.32 0 6-2.69 6-6V59l-20 15",
          }}
        />

        <LogoPath
          isComplete={isComplete}
          fillColor="#fbbc04"
          svgMotionProps={{
            stroke: "#fbbc04",
            d: "M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2",
          }}
        />

        <LogoPath
          isComplete={isComplete}
          fillColor="#ea4335"
          svgMotionProps={{
            onAnimationComplete: () => {
              setIsComplete(true);
            },
            stroke: "#ea4335",
            d: "M72 74V48l24 18 24-18v26L96 92",
          }}
        />

        <LogoPath
          isComplete={isComplete}
          fillColor="#c5221f"
          svgMotionProps={{
            stroke: "#c5221f",
            d: "M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2",
          }}
        />
      </LogoSvg>
  );
};

export default GoogleLogo;
