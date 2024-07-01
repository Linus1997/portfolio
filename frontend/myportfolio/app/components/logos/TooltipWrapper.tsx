import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import LogoButtonAnimation from "./LogoButtonAnimation";
import { COPY } from "@/app";

interface Props {
  hasClicked: boolean;
  defaultContent: string;
  responseContent?: string;
  targetRef?: DOMRect | null;
  children: ReactNode;
}
const TooltipWrapper = ({
  hasClicked,
  defaultContent,
  responseContent,
  targetRef: domRect,
  children,
}: Props) => {
  interface RectData {
    width?: number;
    x?: number;
  }
  const [rectData, setRectData] = useState<RectData | null>(null);
  useEffect(() => {
    if (domRect) {
      const d: RectData = {
        width: domRect.width,
        x: domRect.left,
      };
      setRectData(d);
    }
  }, [domRect]);
  return (
    
      <div className="flex flex-col content-center justify-center w-full h-full relative ">
        <motion.div
          className={`h-3 absolute z-10 
          bg-black bg-opacity-50
            flex flex-col text-center
            justify-center 
                    `}
          style={{
            width: rectData?.width,
            x: rectData?.x,
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }}
          initial={{
            scaleY: 0,
            opacity: 0,
          }}
          animate={{
            scaleY: 1,
            height: 20,

            opacity: 1,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <motion.p > {"copy"} </motion.p>
        </motion.div>
        <div className="w-full h-full">{children}</div>
      </div>
   
  );
};

export default TooltipWrapper;
