import { LogoAnimationDuration } from "@/app";
import { SVGMotionProps, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface Props {
  isComplete: boolean;
  fillColor: string;
  svgMotionProps: SVGMotionProps<SVGPathElement>;
}
const LogoPath: FC<Props> = ({ isComplete, fillColor, svgMotionProps }) => {
    const [isStrokeFadeOut, setIsStrokeFadeout] = useState<boolean>(false);
    useEffect(() => {
        if (isComplete) {
          const timer = setTimeout(() => {
            setIsStrokeFadeout(true);
          }, 2000); // Duration of the initial animation
    
          return () => clearTimeout(timer);
        }
      }, [isComplete]);
  return (
   <>  
    <motion.path
      initial={{ pathLength: 0, strokeDasharray: "0, 1", strokeOpacity: 1 }}
      animate={{
        pathLength: 1,
        strokeDasharray: "5, 20, 22 ",
        strokeOpacity: isStrokeFadeOut? 0 : 1,
        fill: isComplete ? `${fillColor}` : "none",
        fillOpacity: isComplete ? 1 : 0,
      }}
      transition={{
        duration: 3,
        strokeDasharray: { duration: 1, ease: "easeInOut" },
        strokeDashoffset: { duration: 2, ease: "easeInOut" },
        ease: "easeInOut",
        fillOpacity: { duration: 2, ease: "easeIn", initial: 0 },
        strokeOpacity: isStrokeFadeOut? {delay: 0, duration: 1, ease: "easeInOut"} : {}
      }}
      strokeWidth={0.2}
      {...svgMotionProps}

    />
    </>
  );
};

export default LogoPath;
