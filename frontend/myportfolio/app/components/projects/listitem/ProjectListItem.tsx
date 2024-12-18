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
import { BaseItemVariants, ContentWrapperVariants, frontBgVariant, FrontFrameVariants, pathVariant, BackgroundVariants } from "./listItemVariants";
interface ListProps {
  itemData: ItemData;
  isEnterComplete: boolean;
  project: ProjectInterface;
  index: number;
  dimension: CoordXY;


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
        filter: "drop-shadow(0 1px 0rem #ccccff)",

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
            rotateY: itemData.rotationData.itemBase.rotateY / 1.2,
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
            id={`clippath-${index}`}
            transform={`scale(${(dimension.x) / 100}, ${(dimension.x) / 100})`}
          >
            <motion.path
              variants={pathVariant}
              animate={props.animate}
              custom={itemData.path}

            />
          </motion.clipPath>

        </defs>
      </svg>
      <motion.div
        className="absolute"
        style={{
          filter: "drop-shadow(0 1px 0.2rem white)",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >


        <motion.div
          className={" relative w-56 h-56  "}


          style={{
            clipPath: `url(#clippath-${index})`,

          }}
        >


          <motion.div
            className=" w-full h-full absolute opacity-100     "
            variants={BackgroundVariants}
            animate={props.animate}
            custom={itemData}
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <motion.div className=" absolute   w-full h-full "
              variants={FrontFrameVariants}
              animate={props.animate}
              custom={itemData}

            >
              <motion.div
                className="  absolute   w-full h-full "
                variants={ContentWrapperVariants}
                animate={props.animate}
                custom={itemData}

              >
                <ProjectCard project={project} />
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
