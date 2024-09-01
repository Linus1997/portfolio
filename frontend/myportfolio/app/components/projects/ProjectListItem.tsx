import {
  AnimationDefinition,
  AnimationPlaybackControls,
  HTMLMotionProps,
  motion,
  MotionValue,
  progress,
  TargetAndTransition,
  useAnimate,
  useAnimation,
  useAnimationControls,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { forwardRef, useEffect, useState } from "react";
import React from "react";
import { ItemData, CoordXY } from "./ProjectListWrapper";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/app/utils/interfaces";
import { ElementPair } from "./paths";
import { interpolate, Interpolator } from "flubber";

interface ListProps {
  itemData: ItemData;
  isEnterComplete: boolean;
  project: ProjectInterface;
  glowState: string;
  index: number;
  currentPath: ElementPair<string, string>;
  nextPath: ElementPair<string, string>;
  dimension: CoordXY;
 
}

const ProjectItem = forwardRef<
  HTMLLIElement,
  HTMLMotionProps<"li"> & ScriptProps & ListProps
>((props, ref) => {
  const {
    animate,
    initial,
    itemData,
    isEnterComplete,
    project,
    dimension,
    index,
    currentPath,
    nextPath,

    onAnimationComplete,
  } = props;
const controls =useAnimationControls();
const controlsShape =useAnimationControls();

  const progress = useMotionValue<number>(0)

  const transform = useTransform(progress,[0, 1] , [currentPath.outer, nextPath.outer], {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.5 })
  });


useEffect(()=> {
  
  animation(progress, 1, {duration:duration, ease:"easeIn"})
  controls.set()
}, [animate])

  return (
    <motion.li
      ref={ref}
      className={props.className}
      onAnimationComplete={onAnimationComplete}
      custom={itemData}
      initial={initial}
     // animate={animate}
      variants={BaseItemVariants}
      style={{ filter: "drop-shadow(0 1px 0rem #ccccff)" }}
      whileHover={
        isEnterComplete
          ? {
              scale:
                itemData.rotationData.itemBase.zIndex === 40
                  ? 1.2
                  : itemData.rotationData.itemBase.scale,
              rotateY: itemData.rotationData.itemBase.rotateY / 1.2,
            }
          : {}
      }
    >
      <div
        className="relative w-full h-full "
        style={{ filter: "drop-shadow(0 1px 0.2rem white)" }}
      >
        {/**
         * effect to hide clip glitch ------------------------
         */}
        {/*         <motion.div
          className="absolute rounded-2xl pointer-events-none "
          custom={itemData}
          initial="glowOff"
          animate={glowState}
          variants={glowVariant}
          style={{
            zIndex: 6,
          }}
        />
        <motion.div
          className="absolute inset-14 rounded-2xl pointer-events-none"
          custom={itemData}
          initial="glowOff"
          animate={glowState}
          variants={glowBackVariant}
          style={{
            zIndex: 0, 
          }}
        /> */}
        {/**
         * -----------------------------------------------------------------
         */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          viewBox={`0 0 ${dimension.x} ${dimension.y}`}
          width={0}
          height={0}
        >
          <defs>
            <motion.clipPath
              id={`item-shape-${index}`}
              transform={`scale(${dimension.x / 100}, ${dimension.y / 100})`}
            >
              <motion.path
              d={transform}
                
              />
            </motion.clipPath>
            {/* <motion.clipPath
              id={`front-shape-${index}`}
              transform={`scale(${dimension.x / 100}, ${dimension.y / 100})`}
            >
              <motion.path
                animate={animate}
                variants={ShapeVariants}
              custom={{i: inner, curr:currentPath.inner}}
              />
            </motion.clipPath> */}
          </defs>
        </svg>
              
        <motion.div
          className={" relative w-[100%] h-[100%]  "}
          variants={ItemWrapperVariants}
        //  animate={animate}
          custom={itemData}
          ref={scope}
          style={{ clipPath: `url(#item-shape-${index})` }}
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
            style={{  }}
            variants={frontBgVariant}
           // animate={animate}
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
            animate={animate}
            custom={itemData}
          />

          <motion.div
            className=" z-[4] absolute w-full h-full overflow-hidden  "
           
            variants={CardVariants}
           // animate={animate}
            custom={itemData}
          >
            {/* <ProjectCard project={project} /> */}
          </motion.div>
        </motion.div>
      </div>
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

const ItemWrapperVariants: Variants = {
  enter: (i: ItemData): TargetAndTransition => ({
    ...i.enterData.itemWrapper,
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
    //clipPath: `url(#item-shape-${i.index})`,
    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
    //clipPath: `url(#item-shape-${i.index})`,
    transition: { duration: duration },
  }),
  still: (i: ItemData): TargetAndTransition => ({
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
    //clipPath: `url(#item-shape-${i.index})`,
    transition: { duration: duration },
  }),
};
const getShapes = (interPolator: Interpolator): string[] => {
  const paths = [];
  for (let i = 0; i <= 1; i += 0.5) {
    paths.push(interPolator(i));
  }
  return paths;
};



const CardVariants: Variants = {
  enter: (i: ItemData): TargetAndTransition => ({
    paddingTop: "10%",
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 0,
  }),
  rotate: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.projectWrapper,
    bottom: 0,

    transition: { duration: duration },
  }),
};

const rearBgVariant: Variants = {
  rotate: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #515252, #1B3541 )`,
    transition: { duration: duration },
  }),
};

const frontBgVariant: Variants = {
  rotate: (i: ItemData): TargetAndTransition => ({
    ...i.backgroundProps.front,

    transition: { duration: duration },
  }),
};

const glowVariant: Variants = {
  glowOff: (i: ItemData): TargetAndTransition => ({
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",

    ...i.rotationData.middleGlow,
    transition: { duration: duration },
  }),
  glowOn: (i: ItemData): TargetAndTransition => ({
    boxShadow:
      "0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5)", // Glow during rotation
    filter: "drop-shadow(0 -6mm 4mm rgb(160, 0, 210))",
    //  scale: i.rotationData.scale,
    transition: { duration: duration },
  }),
};

ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
