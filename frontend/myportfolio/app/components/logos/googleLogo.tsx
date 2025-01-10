"use client";

import { useState } from "react";
import SvgPath from "../SvgMotionComponents/SvgPath";
import SvgWrapper from "../SvgMotionComponents/SvgWrapper";
import { COPIED, GMAIL } from "@/app";
import toast from "react-hot-toast";
import LogoButtonWrapper from "./LogoButtonWrapper";

const GoogleSVG = () => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <SvgWrapper viewBox="52 42 88 66" >
      <SvgPath
        isComplete={isComplete}
        fillColor="#4285f4"
        svgMotionProps={{
          stroke: "#4285f4",
          d: "M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6",
        }}
      />
      <SvgPath
        isComplete={isComplete}
        fillColor="#34a853"
        svgMotionProps={{
          stroke: "#34a853",
          d: "M120 108h14c3.32 0 6-2.69 6-6V59l-20 15",
        }}
      />

      <SvgPath
        isComplete={isComplete}
        fillColor="#fbbc04"
        svgMotionProps={{
          stroke: "#fbbc04",
          d: "M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2",
        }}
      />

      <SvgPath
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

      <SvgPath
        isComplete={isComplete}
        fillColor="#c5221f"
        svgMotionProps={{
          stroke: "#c5221f",
          d: "M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2",
        }}
      />
    </SvgWrapper>
  );
};

const GoogleLogo = () => {
  const copyHandler = () => {
    navigator.clipboard.writeText(GMAIL).then(() => {
      toast.success(COPIED + " " + GMAIL, {
        id: "gmail",
      });
    });
  };
  return (
    <LogoButtonWrapper onPress={copyHandler}>
      <GoogleSVG />
    </LogoButtonWrapper>
  );
};

export default GoogleLogo;
