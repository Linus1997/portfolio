"use client";
import ProjectItem from "../listitem/ProjectListItem";
import { AnimationDefinition, motion, useAnimationFrame } from "framer-motion";
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
  checkData,
  carouselReducer,
  CounterAction,
  VariantState,
  recalculateDimensions,
} from "../reducers/coordReducer";
import { createCoordInitialState as createCarouselInitialState } from "../reducers/setUpReducer";
import { ItemShadow } from "../listitem/listItemVariants";



interface WrapperProps {

  projects: ProjectInterface[];
}
interface DimChange {
  parentRef: RefObject<HTMLUListElement>;
  childRef: MutableRefObject<HTMLLIElement[]>;
  stateDispatch: Dispatch<CounterAction>;
}


/**
 * Recalculates bounding dimensions for the parent UL container and
 * the first LI item, then dispatches a "resize" action with updated
 * coordinates and dimensions.
 *
 * @param {object} params
 * @param {RefObject<HTMLUListElement>} params.parentRef - Reference to the UL container.
 * @param {MutableRefObject<HTMLLIElement[]>} params.childRef - Reference to the array of LI items.
 * @param {Dispatch<CounterAction>} params.stateDispatch - Dispatch function for the reducer.
 */
function updateDimensions({ parentRef, childRef, stateDispatch }: DimChange): void {
  if (!parentRef.current || !childRef.current || childRef.current.length === 0) {
    return;
  }

  const wrapperDim = parentRef.current.getBoundingClientRect();
  const childDim = childRef.current[0].getBoundingClientRect();

  stateDispatch({
    type: "resize",
   
    dimensions: {
      wrapperDim: wrapperDim,
      childDim: childDim,
    },
  });
}


/**
 * Dispatches a "resetVariant" action if the provided animation definition
 * is recognized as one of the valid carousel states in `checkData`.
 *
 * @param {AnimationDefinition} definition - The current animation definition from Framer Motion.
 * @param {Dispatch<CounterAction>} dispatch - The reducer's dispatch function.
 */
function handleResetCoordVariant(
  definition: AnimationDefinition,
  dispatch: Dispatch<CounterAction>
): void {
  const variantString = definition.toString();
  if (checkData.includes(variantString)) {
    dispatch({
      type: "resetVariant",
      definition: variantString,
    });
  }
}

/**
 * Renders a slideshow carousel of projects, with left/right rotation controls
 * and a state reducer managing the items' positions and animation variants.
 *
 * @param {WrapperProps} props - Contains the array of projects to display.
 * @returns {JSX.Element|null} The rendered carousel or null if no projects.
 */
function ProjectListWrapper({ projects }: WrapperProps): JSX.Element | null {
  const parentRef = useRef<HTMLUListElement>(null);
  const childRef = useRef<HTMLLIElement[]>([]);


  const [state, dispatch] = useReducer(
    carouselReducer,
    { projects },
    createCarouselInitialState
  );



  useLayoutEffect(() => {
    updateDimensions({ parentRef, childRef, stateDispatch: dispatch });
  }, []);

  if (!projects || projects.length === 0) return null;

  return (
    <div className="flex flex-row h-96 w-full content-center justify-center bg-gray-900">
      <button
        className="w-28"
        onClick={() => {
          if (!state.rotTimeout) {

            dispatch({ type: "rotateRight" });
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
        <div className="relative w-[63em] h-96">
          <motion.ul ref={parentRef} className="absolute w-full h-full">
            {state.itemData.map((item, i) => (
              <div key={`item-${i}`}><ProjectItem
                ref={(el) => {
                  if (el) childRef.current[i] = el;
                }}
                index={i}
                reset={(definition) => handleResetCoordVariant(definition, dispatch)}
                itemData={state.itemData[i]}
                isEnterComplete={state.isEnterComplete}
                className="absolute w-56 h-56"
                initial={VariantState.INIT}
                animate={state.variant}
                onAnimationComplete={(definition) => handleResetCoordVariant(definition, dispatch)}
                rotationPair={state.angle[i]}
                
                project={state.projects[i]}
                svgTransform={state.svgTransform}
                isTimeOut={state.rotTimeout}
                stateDispatch={dispatch} />

                <motion.div
                  className="absolute w-56 h-5"
                  style={{

                    background: 'rgba(0,0,0,1)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: 0,
                  }}

                  animate={state.variant}
                  initial={VariantState.INIT}
                  variants={ItemShadow}
                  custom={{itemData: item}}
                  />

                  
              </div>
            ))}
          </motion.ul>
        </div>
      </div>

      <button
        className="w-28"
        onClick={() => {
          if (!state.rotTimeout) {

            dispatch({ type: "rotateLeft" });
          }
        }}
      >
        <svg
          className="w-full h-full stroke-slate-400"
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
}

export default ProjectListWrapper;




