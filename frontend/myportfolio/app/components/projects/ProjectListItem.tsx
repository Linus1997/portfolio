import {
  easeInOut,
  HTMLMotionProps,
  motion,
  MotionValue,
  TargetAndTransition,
  useAnimate,
  useAnimationControls,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { forwardRef, useEffect, useRef } from "react";
import React from "react";
import { ProjectInterface } from "@/app/utils/interfaces";
import { Interpolator } from "flubber";
import { VariantProps } from "@nextui-org/react";
import { InterpolatedPath } from "./reducers/morphReducer";
import { CoordXY, ItemData } from "./reducers/coordReducer";
import { Variant } from "./ProjectListWrapper";
import { animate } from "framer-motion";
import ProjectCard from "./ProjectCard";
interface ListProps {
  itemData: ItemData;
  isEnterComplete: boolean;
  project: ProjectInterface;
  index: number;
  dimension: CoordXY;
  interpolatedPath: InterpolatedPath;
  isMoveLeft: boolean;
  isMoveRight: boolean;
  isStill: boolean;
  isToStillCompleted: boolean;
 
  reset: (definition: string) => void;
}

const morphStep = [0.2, 0.4, 0.6, 0.8, 1];
const ProjectItem = forwardRef<
  HTMLLIElement,
  HTMLMotionProps<"li"> & ScriptProps & ListProps
>((props, ref) => {
  const {
    itemData,
    isEnterComplete,
    project,
    isStill,
    dimension,
    index,
    isMoveLeft,
    isMoveRight,
    onAnimationComplete,
    interpolatedPath,
    isToStillCompleted,
    reset,
  } = props;
  // const morphValue = useMotionValue<number>(0);
  // const value = useMotionValue<number>(1);
 
  // const [scope, animatePath] = useAnimate();
  // const move = useTransform(morphValue, (progress) => {
  //   console.log(progress)
  //   if (isMoveLeft) return interpolatedPath.next(progress);
  //   else if (isMoveRight) return interpolatedPath.prev(progress);
  //   else return interpolatedPath.current
    
  // });

  // const moveLeft = useTransform(morphValue, (progress) => {
  //   console.log(progress)
  //   return interpolatedPath.next(progress)
    
    
    
  // });
  // const moveRight = useTransform(morphValue, (progress) => {
  //   console.log(progress)
  //   return interpolatedPath.next(progress)
    
    
    
  // });
  
  //   useEffect(() => {
  //   if(false)
  //   if (isStill && !isToStillCompleted ) {
  //     morphValue.set(1)
  //     animatePath(morphValue, 1, {
  //       duration: duration,
  //      ease: easeInOut,
  //       onComplete: () => {
          
  //         reset(Variant.isStill);
  //         morphValue.set(0);          
         
  //       },
  //     });
  //   } else if (isMoveLeft) {
      
  //     animatePath(morphValue, 1, {
  //       duration: duration,
  //       ease: easeInOut,
  //       onComplete: () => {
          
  //         reset(Variant.isMorphLeft);
          
  //       },
  //     });
  //   } else if (isMoveRight) {
      
  //     animatePath(morphValue, 1, {
  //       duration: duration ,
  //        ease: easeInOut,
  //       onComplete: () => {
          
  //         reset(Variant.isMorphRight);
          
  //       },
  //     });
  //   }
  // }, [
  //   animatePath,
  //   isMoveLeft,
  //   isMoveRight,
  //   isStill,
  //   isToStillCompleted,
  //   morphValue,
  //   move,
  //   reset,
  // ]);

  return (
    <motion.li
      ref={ref}
      className={props.className}
      onAnimationComplete={onAnimationComplete}
      custom={itemData}
      initial={props.initial}
      animate={props.animate}
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
      <motion.div
        className="relative w-[14em] h-[14em] overflow-hidden "
        style={{ filter: "drop-shadow(0 1px 0.2rem white)"  }}
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
              id={`item-shape-${index}`}
              transform={`scale(${(dimension.x+20) / 100}, ${(dimension.x+20) / 100})`}
            >
              <motion.path
                // Start with the initial shape
              d={interpolatedPath.current}
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
          className={" absolute w-[20em] h-[20em] "}
          variants={ItemWrapperVariants2}
          animate={props.animate}
          custom={{i: itemData, inter: interpolatedPath}}
          style={{ clipPath: `url(#item-shape-${index})`,
              
              
              
              
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

          <motion.div
            className=" z-[4] absolute w-full h-full overflow-hidden  "
            variants={CardVariants}
            animate={props.animate}
            custom={itemData}
          >
            <ProjectCard project={project} />
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

const getShapes2 = (interPolator: Interpolator): string[] => {
  const paths = [];
  for (let i = 0; i <= 1; i += 0.5) {
    paths.push("path('"+interPolator(i)+"')");
  }
  return paths;
};

interface bla{
  i:ItemData;
  inter: InterpolatedPath;
}
const ItemWrapperVariants2: Variants = {
  enter: ({i, inter}: bla): TargetAndTransition => ({
    ...i.enterData.itemWrapper,
    
  }),
  rotateLeft: ({i, inter}: bla): TargetAndTransition => ({
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
    
    //clipPath: `url(#item-shape-${i.index})`,
    transition: { duration: duration },
  }),
  rotateRight: ({i, inter}: bla): TargetAndTransition => ({
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
    
    //clipPath: `url(#item-shape-${i.index})`,
    transition: { duration: duration },
  }),
  still: ({i, inter}: bla): TargetAndTransition => ({
    visibility: "visible", ///ta bort
    ...i.rotationData.itemWrapper,
   
    //clipPath: `url(#item-shape-${i.index})`,
    transition: { duration: duration },
  }),
};

interface ShapeData {
  i: InterpolatedPath;
  transform: MotionValue<any>;
}
const ShapeVariants: Variants = {
  enter: (i: InterpolatedPath): VariantProps<any> => ({
    d: i.current,
  }),
  rotateLeft: (i: InterpolatedPath): TargetAndTransition => ({
    d: getShapes(i.next),

    transition: { duration: duration },
  }),
  rotateRight: (i: InterpolatedPath): TargetAndTransition => ({
    d: getShapes(i.prev),

    transition: { duration: duration },
  }),
  still: (i: InterpolatedPath): TargetAndTransition => ({
    d: i.current,
    transition: {},
  }),
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

ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
