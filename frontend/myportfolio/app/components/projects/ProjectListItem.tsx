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

    onAnimationComplete,
  } = props;

  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);
  const [boxShadow, setBoxShadow] = useState<string>("");

  /*    useEffect(() => {
      if (coord.x != null && coord.y != null) {
       
        if(x.get() === 0){
          x.set(coord.x);
          y.set(coord.y);
          setProject(coord.project)
        } else {
      //  console.log("Index: ", props.index, "coord: ", coord);
      x2.set(x.get());
      y2.set(y.get());
      const duration: number = 0.4;
        
        animate(x, coord.x, { type: "spring", duration: duration }).then(()=> {
          x.set(x2.get());
        });
        animate(y, coord.y, { type: "spring", duration: duration }).then(()=> {
          y.set(y2.get());
        });
        }

        
       // console.log(props.index, project?.projectID, project?.images[0])
        //console.log(coord.zIndex,x.getPrevious(), x.get())
        //animate(x, x.getPrevious(),{type:"spring"})
      }
      
    }, [coord]); */

  return (
    <motion.li
      ref={ref}
      className={props.className}
      //onAnimationComplete={(definition) => props.callback(definition)}
      style={{
        
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      onAnimationComplete={onAnimationComplete}
            custom={coordXY}
      initial={initial}
      animate={animate}
      variants={variants}
      whileHover={{ scale: coordXY.rotationData.zIndex ===40?  1.5 : coordXY.rotationData.scale + 0.1  }}
    >
      <div className=" relative w-full h-full rounded-2xl">
        <motion.div
          variants={itemVariants}
          animate={props.animate}
          custom={coordXY}
          className="absolute z-10 h-full w-full rounded-xl"
        />

        {props.children}
      </div>
    </motion.li>
  );
});

const itemVariants: Variants = {
  initial: (i: RotationData) => ({
    backgroundImage: ` linear-gradient(${i.rotateY}deg, rgba(255,0,0,0), rgba(255,0,0,1) )`,
    transition: { duration: 0 },
  }),
  left: (i: RotationData) => ({
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
