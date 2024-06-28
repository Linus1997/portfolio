"use client";
import { useState } from "react";
import SvgPath from "../SvgMotionComponents/SvgPath";
import SvgWrapper from "../SvgMotionComponents/SvgWrapper";
import { Button, Tooltip } from "@nextui-org/react";
import { COPIED, COPY } from "@/app";
import LogoButtonAnimation from "./LogoButtonAnimation";

const DiscordSVG = () => {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <SvgWrapper minX={0} minY={0} width={127.14} height={96.36}>
      <SvgPath
        isComplete={isComplete}
        fillColor="#5865f2"
        svgMotionProps={{
          onAnimationComplete: () => {
            setIsComplete(true);
          },

          stroke: "#5865f2",
          d: "M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z",
        }}
      />
    </SvgWrapper>
  );
};

const DiscordLogo = () => {
  const [hasClicked, setHasClicked] = useState(false);

  return (
    <Tooltip content={`${hasClicked ? COPIED : COPY}`} placement="bottom">
      <LogoButtonAnimation>
        <Button
          className="w-full h-full p-6 bg-opacity-0"
          isIconOnly
          startContent={<DiscordSVG />}
        />
      </LogoButtonAnimation>
    </Tooltip>
  );
};

export default DiscordLogo;
