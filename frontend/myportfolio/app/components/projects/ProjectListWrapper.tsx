"use client";
import ProjectItem from "./ProjectListItem";
import { AnimationDefinition, motion, useMotionValue } from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ProjectInterface } from "@/app/utils/interfaces";

import {
  coordReducer,
  createCoordInitialState,
  ItemBase,
  recalculateDimensions,
} from "./reducers/coordReducer";
import { createMorphInitialState, morphReducer } from "./reducers/morphReducer";

interface WrapperProps {
  rotations: number;
  direction: number;
  projects: ProjectInterface[];
}

export const Variant = Object.freeze({
  INIT: "initial",
  ENTER: "enter",
  ROTATE: "rotate",
  ROTATELEFT: "rotateLeft",
  ROTATERIGHT: "rotateRight",
  STILL: "still",
  GLOW: "glowOn",
  GLOWOFF: "glowOff",
  isMorphLeft: "isMoveLeft",
  isMorphRight: "isMoveRight",
  isStill: "isStill",
});

const ProjectListWrapper = ({ rotations, projects }: WrapperProps) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<Array<HTMLLIElement>>([]);
  const [clickTimer, setClickTimer] = useState<boolean>(false);
  const [coordState, coordDispatch] = useReducer(
    coordReducer,
    { initRotation: rotations, projects: projects },
    createCoordInitialState
  );
  const [morphState, morphDispatch] = useReducer(
    morphReducer,
    undefined,
    createMorphInitialState
  );
  useEffect(() => {
    const clickTimeout = setTimeout(() => {
      setClickTimer(false);
    }, 0.8);

    return () => clearTimeout(clickTimeout);
  }, [clickTimer]);
  useLayoutEffect(() => {
    const onDimChange = () => {
      if (wrapperRef.current && itemRef.current && itemRef.current.length > 0) {
        const wrapperDim = wrapperRef.current.getBoundingClientRect();
        const childDim = itemRef.current[0].getBoundingClientRect();
        const updatedCoord = recalculateDimensions(wrapperDim, childDim);

        coordDispatch({
          type: "resize",
          coords: updatedCoord,
          dimensions: {
            wrapperDim: { x: wrapperDim.width, y: wrapperDim.height },
            childDim: { x: childDim.width, y: childDim.height },
          },
        });
      }
    };
    onDimChange();
  }, []);
  const resetCoordVariant = (definition: AnimationDefinition) => {
    coordDispatch({ type: "resetVariant", definition: definition });
  };

  const resetMorphAnimation = (definition: string) => {
    morphDispatch({ type: "resetMorph", definition: definition });
  };

  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center bg-gray-900 ">
      <button
        className={`w-28 `}
        onClick={() => {
          if (!clickTimer) {
            setClickTimer(true)
          coordDispatch({ type: "moveRight" });
          morphDispatch({ type: "morphRight" });
        }}}
      >
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
      </button>
      <div>
        <div className="relative  w-[63em] h-96 py-4">
          <motion.ul ref={wrapperRef} className="absolute w-full h-full ">
            {[0, 1, 2, 3, 4, 5].map((item, i) => (
              <ProjectItem
                key={i}
                ref={(el) => {
                  if (el) itemRef.current[i] = el;
                }}
                index={i}
                interpolatedPath={morphState.interpolatedPaths[i]}
                reset={resetMorphAnimation}
                itemData={coordState.itemData[i]}
                isEnterComplete={coordState.isEnterComplete}
                className={"absolute w-[14em] h-[14rem] self-stretch  "}
                initial="initial"
                animate={coordState.variant}
                onAnimationComplete={resetCoordVariant}
                dimension={coordState.dimensions.childDim}
                project={coordState.projects[i]}
                isMoveLeft={morphState.isMorphLeft}
                isMoveRight={morphState.isMorphRight}
                isStill={morphState.isStill}
                isToStillCompleted={morphState.toStillComplete}
              />
            ))}
          </motion.ul>
        </div>
      </div>
      <button
        className={`w-28`}
        onClick={() => {
          if (!clickTimer) {
            setClickTimer(true)
            coordDispatch({ type: "moveLeft" });
            morphDispatch({ type: "morphLeft" });
          }
        }}
      >
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
      </button>
    </div>
  );
};

export default ProjectListWrapper;
