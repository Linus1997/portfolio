import {
  HTMLMotionProps,
  motion,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { forwardRef } from "react";
import React from "react";
import { ProjectInterface } from "@/app/utils/interfaces";



import ProjectCard from "../projectcontent/ProjectCard";
import { path0 } from "../paths";
import { CoordXY, ItemData } from "../utils/sharedInterfaces";
import { BaseItemVariants, shapePathVariant, BackgroundVariants, framePathVariant, FrontFrameVariants } from "./listItemVariants";
interface ListProps {
  itemData: ItemData;
  isEnterComplete: boolean;
  project: ProjectInterface;
  index: number;
  dimension: CoordXY;
  svgTransform: string;

  reset: (definition: string) => void;
}


const ProjectItem = forwardRef<
  HTMLLIElement,
  HTMLMotionProps<"li"> & ScriptProps & ListProps
>((props, ref) => {
  const {
    itemData,
    isEnterComplete,
    project,
    dimension,
    index,
    svgTransform,
    onAnimationComplete,
  } = props;


  return (
    <motion.li
      ref={ref}
      className={props.className}
      onAnimationComplete={onAnimationComplete}
      custom={itemData}
      initial={props.initial}
      animate={props.animate}
      variants={BaseItemVariants}
      style={{
        //filter: "drop-shadow(0 1px 0rem #ccccff)",

        zIndex: itemData.zIndex
      }}
      // FLYTTA WHILE HOVER till Variant
      whileHover={
        isEnterComplete
          ? {
            scale:
              itemData.zIndex === 30
                ? 1.2
                :
                itemData.zIndex === 0 ?
                  1 : itemData.rotationData.itemBase.scale,

          }
          : {}
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        viewBox={`0 0 ${dimension.x} ${dimension.y}`}
        width={0}
        height={0}
      >
        <defs>

          <motion.clipPath
            id={`shape-path-${index}`}
            transform={svgTransform}
          >
            <motion.path
              variants={shapePathVariant}
              animate={props.animate}
              custom={itemData.shapePath}

            />
          </motion.clipPath>
          <motion.clipPath
            id={`frame-path-${index}`}
            transform={svgTransform} //move calculation into reducer.
          >
            <motion.path
              variants={framePathVariant}
              animate={props.animate}
              custom={itemData.framePath}

            />
          </motion.clipPath>

        </defs>
      </svg>
      <motion.div
        className="absolute"
        style={{
          //filter: "drop-shadow(0 1px 0.2rem white)",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >


        <motion.div
          className={" absolute w-full h-full "}
          variants={BackgroundVariants}
          animate={props.animate}
          custom={itemData}
          style={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            clipPath: `url(#shape-path-${index})`
          }}

        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-full h-full"
            viewBox={`0 0 ${dimension.x} ${dimension.x}`}


          >



            <motion.path
              variants={shapePathVariant}
              animate={props.animate}
              stroke={"#000000"}
              fill={"none"}
              strokeOpacity="1"
              transform={svgTransform}
              strokeWidth={"2px"}
              custom={itemData.shapePath}

            />





            <motion.path
              variants={framePathVariant}
              animate={props.animate}
              stroke={"#000000"}
              fill={"none"}
              strokeOpacity="1"
              transform={svgTransform}
              strokeWidth={"1px"}
              custom={itemData.framePath}

            />
            {/* <motion.path


                fill={"#000000"}
                fillOpacity={"0.2"}

                transform={svgTransform}
                animate={{
                  d: ""                  
                }}
              

              /> */}
          </svg>

          <motion.div
            className="  w-full h-full absolute opacity-100    "
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >

            <motion.div
              className="  absolute  w-full h-full "

              style={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                clipPath: `url(#frame-path-${index})`,
                filter: "drop-shadow(0 1px 0.2rem white)"
              }}
            >
              <motion.div
                className=" h-full w-full absolute bg-pink-400  "

                style={
                  {
                    top: 0, left: 0,
                    bottom: 0, right: 0
                  }}
              >
                <motion.div
                  className=" h-full w-full absolute "
                  variants={FrontFrameVariants}
                  custom={props.itemData}
                  animate={props.animate}
                  style={
                    {
                      top: 0, left: 0,
                      bottom: 0, right: 0
                    }
                  }
                >
                  <ProjectCard project={project} />
                </motion.div>
              </ motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
});




ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
