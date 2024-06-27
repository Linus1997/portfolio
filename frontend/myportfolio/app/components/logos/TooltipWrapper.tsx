import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import LogoButtonAnimation from "./LogoButtonAnimation";

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
    const [rectData, setRectData] = useState<RectData | null>(null)
    useEffect(() => {
        if (domRect) {
          const d: RectData = {
            width: domRect.width-domRect.x,
            x: domRect.left,
          };
          setRectData(d);
        }
      }, [domRect]);
  return (
    <LogoButtonAnimation>
      <div className="flex flex-col content-center justify-center w-full h-full relative ">
        <motion.div
          className={`h-3 absolute z-10`}
         style={{width: rectData?.width}}
          initial={{ x: 0, borderBottomWidth: 0, borderTopWidth: 0, opacity: 0 }}
          animate={{
            x: rectData?.x,
           
            height: 20,
            borderBottomWidth: 2,
            borderTopWidth: 2,
            opacity: 1,
            
          }}
          transition={{
            duration: 2
          }}
        >
          {" 333"}
        </motion.div>
        <div className="w-full h-full">{children}</div>
      </div>
    </LogoButtonAnimation>
  );
};

export default TooltipWrapper;
