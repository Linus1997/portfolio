import { ProjectInterface } from "@/app/utils/interfaces";
import { motion, motionValue, useMotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useEffect, useState } from "react";
import ScrollItemTwo from "./ScrollItemTwo";
import ScrollItemOne from "./scrollItemOne";
import MovingBorder from "../sandboxtesting/movingborder";
interface Props {

  projects: ProjectInterface[]
}

const ScrollContainer: FC<Props> = ({ projects }) => {
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    console.log("här")
  }, [])
  return (
    <motion.div className="">
      <ScrollItemOne />
      <ScrollItemTwo projects={projects} />
    <MovingBorder />
<div className="">
      
      </div>
    </motion.div>
  )
}
export default ScrollContainer;