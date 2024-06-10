"use client";
import { LogoAnimationDuration } from "@/app";
import {
  motion,
  motionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FC, ReactNode, useState } from "react";

interface Props {
children: ReactNode
}
const LogoSvg: FC<Props> = ({children}) => {
  

  return (
    <div
      className="w-fit h-fit"
      style={{
        border: "none",
        padding: "0",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.svg
        className="w-[100px] h-[100px]"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </motion.svg>
    </div>
  );
};

export default LogoSvg;
