
import { Button } from "@nextui-org/react";
import GeneralItem from "../sandboxtesting/generalItem";
import { useState } from "react";
import ProjectListWrapper from "../projects/listwrapper/ProjectListWrapper";
import { ProjectInterface } from "@/app/utils/interfaces";
import PulseBlur from "../SvgMotionComponents/PulseBlur";
import StrokeBorderFilter from "../SvgMotionComponents/StrokeBorderFilter";
import TestRFiber from "../sandboxtesting/TestRFiber";




interface props {
  projects: ProjectInterface[]
}
const ScrollItemTwo = ({ projects }: props) => {

  return (
      <><PulseBlur /><StrokeBorderFilter /><div className=" w-full h-full ">
      <ProjectListWrapper projects={projects} />
      <TestRFiber />
    </div></>
  );
};

export default ScrollItemTwo;
