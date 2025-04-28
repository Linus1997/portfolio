import {
  animate,
  easeIn,
  easeInOut,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { Dispatch, forwardRef, useEffect, useReducer, useRef, useState } from "react";
import React from "react";
import { ProjectInterface } from "@/app/utils/interfaces";



import ProjectCard from "../projectcontent/ProjectCard";
import { Point, ItemData, RotationPair } from "../utils/sharedInterfaces";
import { BaseItemVariants, shapePathVariant, BackgroundVariants, framePathVariant, FrontFrameVariants, CornerPathVariants } from "./listItemVariants";
import SvgWrapper from "../../SvgMotionComponents/SvgWrapper";
import ClipPaths from "../SVGs/ClipPaths";
import SVGStrokes from "../SVGs/SVGStrokes";
import { focusedFrame, focusedPath } from "../paths";
import { CounterAction } from "../reducers/coordReducer";
import { initialInteractionState, itemInteractionReducer } from "./itemReducer";


const DEFAULT_POSITION = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};


interface ListProps {
  itemData: ItemData;
  isEnterComplete: boolean;
  project: ProjectInterface;
  index: number;
  dimension: Point;
  svgTransform: string;
  x: number
  y: number
  
  isTimeOut: boolean;
  rotationPair: RotationPair;
  stateDispatch: Dispatch<CounterAction>;
  reset: (definition: string) => void;
}
/**
 * hover -> expandera knapp
 * 
 */


/**
 * A carousel item component rendered via Framer Motion,
 * displaying a background shape, frame, and project content.
 *
 * @param {HTMLMotionProps<"li"> & ScriptProps & ListProps} props - The component props, including item data and project info.
 * @returns {JSX.Element} The rendered carousel item.
 */
const ProjectItem = forwardRef<HTMLLIElement, HTMLMotionProps<"li"> & ScriptProps & ListProps>(
  (props, ref) => {
    const {
      itemData,
      project,
      dimension,
      index,
      svgTransform,
      animate,
      x,
      y,
      stateDispatch,
      onAnimationComplete,
      className,
      initial,
      isEnterComplete,
      isTimeOut,
      rotationPair,
      reset,
    } = props;
    const [itemState, setItemState] = useReducer(itemInteractionReducer, initialInteractionState)
    

    

    useEffect(()=>{
 
    }, [itemData])
    return (
      <motion.li
        ref={ref}
        className={className}
        onAnimationComplete={onAnimationComplete}
        initial={initial}
        animate={animate}
        custom={{data: itemData, rotPair: rotationPair, parent:{x:x, y:y}}}
        variants={BaseItemVariants}
        style={{
      
          zIndex: itemData.zIndex, pointerEvents: "none",
          borderRadius: "10px",
          border: "1px"
        
        }}

        // whileHover={{
        //   scaleX: (x-dimension.x)/dimension.x,
        //   scaleY: (y-100)/dimension.y,
          //   y: Math.round(y/ 2 - dimension.y / 2),
          
          // }}
          >
        <motion.div
        className="absolute"
        style={{
          ...DEFAULT_POSITION,
        }}
        whileHover={{
          scaleX: (x-dimension.x)/dimension.x,
          scaleY: (y)/dimension.y,
          y: Math.round(y/ 2 - dimension.y ),
       }}
        
        >
  

        <motion.div
          className="absolute"
          style={{ top: 0, left: 0, bottom: 0, right: 0 }}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}

       
        >
          <motion.div
            className="absolute w-full h-full"
            variants={BackgroundVariants}
            animate={animate}
            custom={itemData}
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              // clipPath: `url(#shape-path-${index})`,
              pointerEvents: "auto",
            }}
            onClick={() =>
              stateDispatch({
                type: "moveXTimes",
                dist2Front: itemData.rotationData.dist2Front,
              })
            }
          >

            <motion.div
              className="absolute w-full h-full opacity-100"
              style={{ top: 0, left: 0, bottom: 0, right: 0 }}

            >
              <motion.div
                className="absolute w-full h-full"
                style={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 10,
                  // clipPath: `url(#frame-path-${index})`,

                }}

              >
                <motion.div
                  className="absolute w-full h-full bg-transparent"
                  style={{ top: 0, left: 0, bottom: 0, right: 0 }}
                >
                  <motion.div
                    className="absolute w-full h-full"
                    variants={FrontFrameVariants}
                    custom={itemData}
                    animate={animate}
                    // whileHover={{
                    //   scaleX: (x - dimension.x) / dimension.x,
                    //   scaleY: (y - 100) / dimension.y,
                    //   y: Math.round(y / 2 - dimension.y / 2),
                    // }}
                    style={{ top: 0, left: 0, bottom: 0, right: 0}}
                  >
                    <ProjectCard project={project} index={itemData.zIndex} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>
      </motion.li>
    );
  }
);

ProjectItem.displayName = "ProjectItem";
export default React.memo(ProjectItem);
