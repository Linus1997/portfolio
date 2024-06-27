"use client";
import { Button } from "@nextui-org/react";
import {
  motion,
  motionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Dispatch, FC, ReactNode, RefObject, SetStateAction, useState } from "react";

interface Props {
  children: ReactNode;
  minX: number;
  minY: number;
  width: number;
  height: number;
  targetRef: RefObject<SVGSVGElement> | null
 /*  setHasClicked: Dispatch<SetStateAction<boolean>>;
  setShowTooltip: Dispatch<SetStateAction<boolean>>; */
}

const LogoSvg: FC<Props> = ({
  children,
  minX,
  minY,
  width,
  height,
  targetRef
/*   setHasClicked,
  setShowTooltip */
}) => {
/*    */

  return (
    
      <motion.svg
        ref={targetRef}
       /*  onClick={() => clickHandler()} */
        viewBox={`${minX} ${minY} ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
       
      >
        {children}
      </motion.svg>
      
  );
};

export default LogoSvg;
