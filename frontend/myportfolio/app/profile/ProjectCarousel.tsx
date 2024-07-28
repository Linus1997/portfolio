"use client";
import { LayoutGroup, motion } from "framer-motion";

import {
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import testdata from "../utils/testdata.json";
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
    }, 100)

    return () => clearTimeout(timeOut);
  }, [direction])

  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center">
     {/*  <button className={`w-28 `} onClick={() => rotate(1)}>
        <svg
          className="w-full h-full stroke-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button> */}
    {/*   <div className="w-4/6 "> */}
        <ProjectListWrapper rotations={rotations} direction={direction} projects={projects}/>
     {/*  </div> */}
    {/*   <button className={`w-28`} onClick={() => rotate(-1)}>
        <svg
          className=" w-full h-full stroke-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default ProjectCarousel;
