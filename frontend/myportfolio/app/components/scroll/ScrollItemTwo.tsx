
import { Button } from "@nextui-org/react";
import GeneralItem from "../sandboxtesting/generalItem";
import { useState } from "react";
import ProjectListWrapper from "../projects/listwrapper/ProjectListWrapper";
import { ProjectInterface } from "@/app/utils/interfaces";
import PulseBlur from "../SvgMotionComponents/PulseBlur";
import StrokeBorderFilter from "../SvgMotionComponents/StrokeBorderFilter";
import TestRFiber from "../sandboxtesting/TestRFiber";
import TestWrapper from "./test";
import { motion, useMotionValue, useTransform } from "framer-motion";






function CarouselDrag() {
  const centerX = 400;
  const centerY = 300;
  const a = 200;
  const b = 100;
  const n = 6; // 6 items

  // 🟡 Startvinkel för hela carousel-systemet
  const globalAngle = useMotionValue(0);

  // 🔵 Varje items basvinkel (delat jämt över varvet)
  const items = Array.from({ length: n }, (_, i) => ({
    id: i,
    baseAngle: (360 / n) * i + 90, // Start från Top (90°), sen jämnt
  }));

  const handleDrag = (event: any, info: { delta: { x: any; }; }) => {
    const deltaX = info.delta.x;
    globalAngle.set(globalAngle.get() + deltaX * 0.005); // tweak hastigheten här
  };

  return (
    <div style={{ background: "#111", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {items.map((item) => {
        const itemAngle = useTransform(globalAngle, (ga) => {
          const fullAngle = item.baseAngle + (ga * 180) / Math.PI; // konvertera radian delta till grader
          const rad = (fullAngle * Math.PI) / 180;
          return rad;
        });

        const x = useTransform(itemAngle, (rad) => centerX + a * Math.cos(rad));
        const y = useTransform(itemAngle, (rad) => centerY + b * Math.sin(rad));

        return (
          <motion.div
            key={item.id}
            drag="x"
            dragConstraints={{ left: -1000, right: 1000 }}
            onDrag={handleDrag}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "deepskyblue",
              position: "absolute",
              x,
              y,
            }}
          >
            {item.id}
          </motion.div>
        );
      })}
    </div>
  );
}

interface props {
  projects: ProjectInterface[]
}
const ScrollItemTwo = ({ projects }: props) => {

  return (
      <><PulseBlur /><StrokeBorderFilter /><div className=" w-full h-full ">
      {/* <ProjectListWrapper projects={projects} /> */}
      <TestWrapper />
      <CarouselDrag/>
    </div></>
  );
};

export default ScrollItemTwo;
