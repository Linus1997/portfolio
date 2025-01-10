"use client";
import {
  motion,
} from "framer-motion";
import {
  Attributes,
  FC,
  ReactNode,
  SVGProps,
} from "react";

interface Props  {
  children: ReactNode;


}

const SvgWrapper: FC<Props &  SVGProps<SVGSVGElement>  > = ({
  children,
  ...rest
  
}) => {
  

  return (
    <svg

     
      
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export default SvgWrapper;
