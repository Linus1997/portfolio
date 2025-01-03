import { ProjectInterface } from "@/app/utils/interfaces";
import { motion, motionValue, useMotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useState } from "react";
import ScrollItemTwo from "./ScrollItemTwo";
import ScrollItemOne from "./scrollItemOne";
interface Props {
  
    projects: ProjectInterface[]
  }
  
  const ScrollContainer: FC<Props> = ({ projects}) => {
    const {scrollYProgress} = useScroll();
    return (
    <motion.div className="">
      <ScrollItemOne />
      <ScrollItemTwo projects={projects} />
    </motion.div>
  )
  }
  export default ScrollContainer;