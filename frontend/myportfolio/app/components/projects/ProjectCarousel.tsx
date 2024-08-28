"use client";
import { LayoutGroup, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import {
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import testdata from "../../utils/testdata.json";
import { ProjectInterface } from "@/app/utils/interfaces";

import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";
import ProjectItem from "./ProjectListItem";
import ProjectListWrapper from "./ProjectListWrapper";

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
  const [projects] = useState<ProjectInterface[]>([...testdata]);
  
  const [ProjectIndices, setIndices] = useState<ProjectIndices>({
    start: getIndex(0, -1, projects.length),
    left: 0,
    right: getIndex(0, 1, projects.length),
  });
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
