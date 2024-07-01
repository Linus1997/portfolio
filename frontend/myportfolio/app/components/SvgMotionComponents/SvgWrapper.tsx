"use client";
import {
  motion,
} from "framer-motion";
import {
  FC,
  ReactNode,
} from "react";

interface Props {
  children: ReactNode;
  minX: number;
  minY: number;
  width: number;
  height: number;

}

const SvgWrapper: FC<Props> = ({
  children,
  minX,
  minY,
  width,
  height,
  
  
}) => {
  

  return (
    <motion.svg

     
      viewBox={`${minX} ${minY} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </motion.svg>
  );
};

export default SvgWrapper;
