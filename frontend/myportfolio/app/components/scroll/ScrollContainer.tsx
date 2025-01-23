import { ProjectInterface } from "@/app/utils/interfaces";
import { motion, motionValue, useMotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useEffect, useState } from "react";
import ScrollItemTwo from "./ScrollItemTwo";
import ScrollItemOne from "./scrollItemOne";
import MovingBorder from "../sandboxtesting/movingborder";
import TestRFiber from "../sandboxtesting/threeFiberDreiRapier/TestRFiber";
interface Props {

  projects: ProjectInterface[]
}

const ScrollContainer: FC<Props> = ({ projects }) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className="w-full h-full">
      <ScrollItemOne />
      <ScrollItemTwo projects={projects} />


      <MovingBorder />
      <div className="">

      </div>


      {/* <TestRFiber></TestRFiber> */}
    </motion.div>
  )
}
export default ScrollContainer;