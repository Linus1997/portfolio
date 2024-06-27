"use client";

import {
  motion,
  motionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ReactNode,
  RefAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import LogoPath from "./SvgMotionComponents/LogoPath";
import LogoSvg from "./SvgMotionComponents/LogoSvg";
import { Button, Tooltip } from "@nextui-org/react";
import { COPIED, COPY as COPY } from "@/app";
import LogoButtonAnimation from "./LogoButtonAnimation";
import { clickHandler } from "@/app/utils/helperfunction";
import TooltipWrapper from "./TooltipWrapper";

interface LogoSVGProps {
  targetRef: RefObject<SVGSVGElement> | null;
}
const GoogleSVG = ({ targetRef }: LogoSVGProps) => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <LogoSvg minX={52} minY={42} width={88} height={66} targetRef={targetRef}>
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

const GoogleLogo = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const targetRef = useRef<SVGSVGElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setRect(rect);
    }
  }, [targetRef]);
  return (
    /*        <Tooltip
      content={`${hasClicked ? COPIED : COPY}`}
      placement="bottom"
      classNames={{
        base: "text-black"
      }}
      
      
      isOpen={true}
    > */
    <TooltipWrapper
      hasClicked={false}
      defaultContent={""}
      targetRef={rect}
    >
      <Button
        className="w-full h-full p-6 bg-opacity-0"
        isIconOnly
        onPress={() => {
          clickHandler(setHasClicked);
        }}
        disableRipple
        startContent={<GoogleSVG targetRef={targetRef} />}
      />
    </TooltipWrapper>
  );
};


export default GoogleLogo;
