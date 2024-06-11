import { motion, motionValue, useMotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useState } from "react";
interface Props {
    children: ReactNode;
  
  }
  
  const ScrollContainer: FC<Props> = ({children}) => {
    const {scrollYProgress} = useScroll();
    return (
    <motion.div>
      {children}
    </motion.div>
  )
  }
  export default ScrollContainer;