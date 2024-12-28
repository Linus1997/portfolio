"use client";

import {
  useEffect,
  useState,
} from "react";
import { ProjectInterface } from "@/app/utils/interfaces";

import { getProjects } from "@/app/utils/helperfunction";
import ProjectListWrapper from "./listwrapper/ProjectListWrapper";

interface ProjectIndices {
  left: number;
  start: number;
  right: number;
}

/**
 * -----------------------------------------------------------
 *                        WRAPPER
 * -----------------------------------------------------------
 */

/**
 *
 * @returns
 */

const ProjectCarousel = () => {
  const [projects] = useState<ProjectInterface[]>(getProjects());
  

  const [rotations, setRotations] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const rotate = (direction: number) => {
    // if (!startAnimation) {

    // setCoord((prev) => rotateArray(prev, direction));
    setDirection(direction);
    setRotations((prev) => prev + direction);
  };
  useEffect(() => {
    const timeOut = setTimeout(()=> {
      setDirection(0);
    }, 1000)

    return () => clearTimeout(timeOut);
  }, [direction])

  if (!projects || projects.length == 0) return <></>;
  return (

    <>

        <ProjectListWrapper rotations={rotations} direction={direction} projects={projects}/>
    </>
  );
};

export default ProjectCarousel;
