import { HTMLMotionProps, motion, Variants } from "framer-motion";
import { ScriptProps } from "next/script";
import { forwardRef, useEffect, useState } from "react";
import React from "react";
import { ItemData, CoordXY } from "./ProjectListWrapper";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/app/utils/interfaces";

interface ListProps {
  itemData: ItemData;
  isEnterComplete: boolean;
  project: ProjectInterface;
  glowState: string;
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
    glowState,
    onAnimationComplete,
  } = props;
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const shineOnHoverDuration = 2;
  useEffect(() => {
    const reset = setTimeout(() => {
      if (mouseEnter) setMouseEnter(false);
    }, shineOnHoverDuration * 1000);
    return () => clearTimeout(reset);
  }, [mouseEnter]);

  return (
    <motion.li
      ref={ref}
      className={props.className}
      onAnimationComplete={onAnimationComplete}
      custom={itemData}
      initial={initial}
      animate={animate}
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
        className="relative w-full h-full rounded-2xl"
        style={{ filter: "drop-shadow(0 1px 0.2rem white)" }}
      >
        {/**
         * effect to hide clip glitch ------------------------
         */}
        <motion.div
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
        />
        {/**
         * -----------------------------------------------------------------
         */}
        <motion.div
          className={" relative w-[100%] h-[100%]  "}
          variants={ItemWrapperVariants}
          animate={animate}
          custom={itemData}
          onHoverStart={() => setMouseEnter(true)}
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
            className=" z-[3] w-full h-full absolute opacity-10  "
            style={{}}
            variants={frontBgVariant}
            animate={animate}
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
            className=" z-[1] w-full h-full absolute opacity-100 rounded-2xl    "
            variants={rearBgVariant}
            animate={animate}
            custom={itemData}
          />

          <motion.div
            className=" z-[4] absolute w-full h-full  "
            style={{}}
            variants={CardVariants}
            animate={animate}
            custom={itemData}
          >
            <ProjectCard project={project} />
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
  initial: () => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (i: ItemData) => (
    console.log(i.enterData.itemBase),
    {
      ...i.enterData.itemBase,
      transition: { duration: 1 },
    }
  ),
  rotate: (i: ItemData) => ({
    // opacity: 1,
    // visibility: "visible",
    // x: i.rotationData.x,
    // y: i.rotationData.y,
    // scale: i.rotationData.scale,
    // rotateX: i.rotationData.rotateX,
    // rotateY: i.rotationData.rotateY,
    // zIndex: i.rotationData.zIndex,
    ...i.rotationData.itemBase,
  
    transition: { duration: duration },
  }),
};

const ItemWrapperVariants: Variants = {
  enter: (i: ItemData) => ({
    ...i.enterData.itemWrapper,
  }),
  rotate: (i: ItemData) => ({
    //scale: i.rotationData.scale, /// tabort?
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
    transition: { duration: duration },
  }),
};
const CardVariants: Variants = {
  enter: (i: ItemData) => ({
    paddingTop: "10%",
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 0,
  }),
  rotate: (i: ItemData) => ({
    ...i.rotationData.projectWrapper,

    transition: { duration: duration },
  }),
};

const rearBgVariant: Variants = {
  rotate: (i: ItemData) => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #515252, #1B3541 )`,
    transition: { duration: duration },
  }),
};

const frontBgVariant: Variants = {
  rotate: (i: ItemData) => ({
    bottom: 0,
    top: `${i.backgroundProps.front.top}%`,
    paddingLeft: `${i.backgroundProps.front.paddingLeft}%`,
    paddingRight: `${i.backgroundProps.front.paddingRight}%`,
    transition: { duration: duration },
  }),
};

const glowVariant: Variants = {
  glowOff: (i: ItemData) => ({
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",

    ...i.rotationData.middleGlow,
    transition: { duration: duration },
  }),
  glowOn: (i: ItemData) => ({
    boxShadow:
      "0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.5)", // Glow during rotation
    filter: "drop-shadow(0 -6mm 4mm rgb(160, 0, 210))",
    //  scale: i.rotationData.scale,
    transition: { duration: duration },
  }),
};

/**
 * TODO: Inset som parameter f;r att bakgre bilden ska lysa
 */

const glowBackVariant: Variants = {
  glowOff: (i: ItemData) => ({
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",

    ...i.rotationData.backGlow,
    transition: { duration: 0 },
  }),
  glowOn: (i: ItemData) => ({
    filter: "drop-shadow(0 -6mm 4mm rgb(160, 0, 210))",

    
    transition: { duration: duration },
  }),
};
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
