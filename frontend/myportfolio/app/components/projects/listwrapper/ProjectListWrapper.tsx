"use client";
import ProjectItem from "../listitem/ProjectListItem";
import { AnimationDefinition, motion } from "framer-motion";
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ProjectInterface } from "@/app/utils/interfaces";

import {
  coordReducer,
  CounterAction,
} from "../reducers/coordReducer";
import { createCoordInitialState } from "../reducers/setUpReducer";
import { recalculateDimensions } from "../reducers/setUpReducer";


interface WrapperProps {
  rotations: number;
  direction: number;
  projects: ProjectInterface[];
}
interface DimChange {
  parentRef: RefObject<HTMLUListElement>;
  childRef: MutableRefObject<HTMLLIElement[]>;
  coordDispatch: Dispatch<CounterAction>;
}



const onDimChange = ({ parentRef, childRef: itemRef, coordDispatch }: DimChange) => {
  if (parentRef && parentRef.current && itemRef.current && itemRef.current.length > 0) {
    const parentDim = parentRef.current.getBoundingClientRect();
    const childDim = itemRef.current[0].getBoundingClientRect();
    const updatedCoords = recalculateDimensions(parentDim, childDim);

    coordDispatch({
      type: "resize",
      coords: updatedCoords,
      dimensions: {
        wrapperDim: { x: parentDim.width, y: parentDim.height },
        childDim: { x: childDim.width, y: childDim.height },
      },
    });
  }
};


const ProjectListWrapper = ({ rotations, projects }: WrapperProps) => {
  const parentRef = useRef<HTMLUListElement>(null);
  const childRef = useRef<HTMLLIElement[]>([]);
  const [clickTimer, setClickTimer] = useState<boolean>(false);
  const [coordState, coordDispatch] = useReducer(
    coordReducer,
    { initRotation: rotations, projects: projects },
    createCoordInitialState
  );

  useEffect(() => {
    const clickTimeout = setTimeout(() => {
      setClickTimer(false);
    }, 0.8);

    return () => clearTimeout(clickTimeout);
  }, [clickTimer]);
  useLayoutEffect(() => {

    onDimChange({ parentRef, childRef, coordDispatch });
  }, []);

  const resetCoordVariant = (definition: AnimationDefinition) => {
    coordDispatch({ type: "resetVariant", definition: definition });
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

          }
        }}
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
          <motion.ul ref={parentRef} className="absolute w-full h-full ">


            {[0, 1, 2, 3, 4, 5].map((item, i) => (

              <ProjectItem
                key={i}
                ref={(el) => {
                  if (el) childRef.current[i] = el;
                }}
                index={i}

                reset={resetCoordVariant}
                itemData={coordState.itemData[i]}
                isEnterComplete={coordState.isEnterComplete}
                className={"absolute  w-56 h-56 "}
                initial="initial"
                animate={coordState.variant}
                onAnimationComplete={resetCoordVariant}
                dimension={coordState.dimensions.childDim}
                project={coordState.projects[i]}
                svgTransform={coordState.svgTransform}


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


