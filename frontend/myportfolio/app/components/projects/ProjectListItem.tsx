import {
  animate,
  animationControls,
  AnimationDefinition,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useMotionValueEvent,
  VariantLabels,
  Variants,
} from "framer-motion";
import { ScriptProps } from "next/script";
import {
  useRef,
  useEffect,
  forwardRef,
  useState,
  useMemo,
  Children,
} from "react";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";
import { baseStyles } from "@nextui-org/react";
import React from "react";
import { RotationData, duration, ItemData } from "./ProjectListWrapper";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/app/utils/interfaces";

interface ListProps {
  index: number;
  coordXY: ItemData;
  isEnterComplete: boolean;
  var: string;
}

const ProjectItem = forwardRef<
  HTMLLIElement,
  HTMLMotionProps<"li"> & ScriptProps & ListProps
>((props, ref) => {
  const {
    animate,
    initial,
    variants,
    coordXY,
    isEnterComplete: hasEntered,

    onAnimationComplete,
  } = props;

  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);
  const [boxShadow, setBoxShadow] = useState<string>("");



  return (
    <motion.li
      ref={ref}
      className={props.className}
      
      style={
        {
          filter: "drop-shadow(0 0 0.75rem crimson)"
        }
      }
      onAnimationComplete={onAnimationComplete}
      custom={coordXY}
      initial={initial}
      animate={animate}
      variants={variants}
      whileHover={
        hasEntered
          ? {
              scale:
                coordXY.rotationData.zIndex === 40
                  ? 1.2
                  : coordXY.rotationData.scale + 0.1,
              rotateY: coordXY.rotationData.rotateY / 1.2,
            }
          : {}
      }
    >
      <div className=" relative w-full h-full rounded-2xl">
        <motion.circle
          variants={itemVariants}
          animate={props.animate}
          custom={coordXY}
          style={{
            filter: "drop-shadow(0 200px 0.75rem crimson)"
          }}
          className="absolute z-10 h-full w-full rounded-xl"
        />

        {props.children}
      </div>
    </motion.li>
  );
});

const itemVariants: Variants = {
  initial: (i: RotationData) => ({
    backgroundImage: ` linear-gradient(${i.rotateY}deg, rgba(255,2,3,4), rgba(25,2,3,1) )`,
    transition: { duration: 0 },
  }),
  rotate: (i: RotationData) => ({
    backgroundImage: ` linear-gradient(${
      i.rotateY + i.rotateX
    }deg, rgba(255,0,0,0), rgba(255,0,0,1) )`,

    transition: { type: "spring", stiffness: 100, duration: duration },
  }),
  right: (i: RotationData) => ({
    transition: { duration: duration },
  }),
};

// cool animation
/* const itemVariants : Variants = {
  initial: (i: CoordXY) => ({

    backgroundImage: ` linear-gradient(${i.initial.rotateY}, rgba(255,0,0,0), rgba(255,0,0,1) )`,
    transition: { duration: 0 },
  }),
  left: (i: CoordXY) => ({
    x: i.left.x,
    y: i.left.y,

    zIndex: i.left.zIndex,
    rotateX: i.left.rotateX,
    rotateY: i.left.rotateY,

    transition: { type: "spring", stiffness: 100,  duration: duration },
  }),
  right: (i: CoordXY) => ({
    x: i.right.x,
    y: i.right.y,

    zIndex: i.right.zIndex,
    rotateX: i.right.rotateX,
    rotateY: i.right.rotateY,
    transition: { duration: duration },
  }),
}; */
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
