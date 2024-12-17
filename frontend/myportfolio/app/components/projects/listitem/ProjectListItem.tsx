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
            className="z-[10] absolute w-full h-full pointer-events-none"
            animate={
              isEnterComplete
                ? {
                  opacity: [0, 8, 0],

                  backgroundImage: backgroundImages,
                }
                : {
                  opacity: 0,
                }
            }
            transition={{
              delay: 0.5,
              duration: 1.5,
            }}
          />
          <motion.div
            className=" z-[3] w-full h-full absolute opacity-100 bg-slate-800 "
            style={{}}
            variants={frontBgVariant}
            animate={props.animate}
            custom={itemData}
          >
            <div
              className="w-full h-full bg-white  "
              style={{
                borderRadius: `${itemData.backgroundProps.front.borderRadius}em`,
              }}
            />
          </motion.div>
          <motion.div
            className=" z-[1] w-full h-full absolute opacity-100     "
            variants={rearBgVariant}
            animate={props.animate}
            custom={itemData}
          />
          <motion.div className=" z-[4] absolute   w-full h-full "
            variants={CardWrapperVariants}
            animate={props.animate}
            custom={itemData}

          >
            <motion.div
              className=" z-[4] absolute   w-full h-full "
              variants={CardVariants}
              animate={props.animate}
              custom={itemData}

            >
              <ProjectCard project={project} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
});
const backgroundImages = [
  `linear-gradient(${45}deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0))`,

  `linear-gradient(${45}deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4) 100%, rgba(255, 255, 255, 0.1))`,
];

const duration: number = 0.4;
const BaseItemVariants: Variants = {
  initial: (): TargetAndTransition => ({
    visibility: "hidden",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,

  }),
  enter: (i: ItemData): TargetAndTransition => ({
    ...i.enterData.itemBase,
    transition: { duration: duration },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,

    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,

    transition: { duration: duration },
  }),
  still: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,

    transition: { duration: duration },
  }),
};


const pathVariant: Variants = {
  initial: (path: string): TargetAndTransition => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (path: string): TargetAndTransition => ({
    d: path0
    ,
    transition: {
      duration: duration
    }
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),
  still: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),


};


const CardWrapperVariants: Variants = {
  enter: (i: ItemData): TargetAndTransition => ({
    //paddingTop: "10%",


    top: "6%",
    left: 0,
    right: 0,
    bottom: 0,

  }),
  still: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.frame,
    bottom: 0,

  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.frame,

    bottom: 0,
    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.frame,

    bottom: 0,
    transition: { duration: duration },
  }),
};

const CardVariants: Variants = {
  enter: (i: ItemData): TargetAndTransition => ({
    //paddingTop: "10%",


    top: "6%",
    left: 0,
    right: 0,
    bottom: 0,

  }),
  still: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.frame,
    bottom: 0,

  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.frame,

    bottom: 0,
    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.frame,

    bottom: 0,
    transition: { duration: duration },
  }),
};

const rearBgVariant: Variants = {
  rotate: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #515252, #1B3541 )`,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    transition: { duration: duration },
  }),
};

const frontBgVariant: Variants = {
  rotate: (i: ItemData): TargetAndTransition => ({
    ...i.backgroundProps.front,

    transition: { duration: duration },
  }),
};

ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
