import {
  animate,
  animationControls,
  AnimationDefinition,
  HTMLMotionProps,
  motion,
  useAnimationFrame,
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
import { baseStyles, Image } from "@nextui-org/react";
import React from "react";
import {
  RotationData,
  duration,
  ItemData,
  CoordXY,
} from "./ProjectListWrapper";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/app/utils/interfaces";

interface ListProps {
  index: number;
  coordXY: ItemData;
  isEnterComplete: boolean;
  var: string;
  project: ProjectInterface;
  dimension: CoordXY;
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
    isEnterComplete,
    project,
    onAnimationComplete,
    dimension,
  } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [startHovering, setStartHovering] = useState<boolean>(false);
  
  

  useAnimationFrame((t, delta) => {
    if(coordXY.rotationData.zIndex !== 40){
    const distance = dimension.x * delta;
    const rotate = Math.sin(t / 10000) * -45;

    const y = (1 + Math.sin(t / 2500)) * 30;


    if ( props.index === 1 && !isEnterComplete ) {
      //console.log(t, delta, distance, distance / 1000);
      console.log(y)
      
    }

  
    if (cardRef.current && startHovering && backgroundRef.current && shadowRef.current){
      cardRef.current.style.transform = `translateY(${y}px) rotateY(${rotate}deg)`;
      backgroundRef.current.style.transform = `translateY(${y}px) rotateY(${-rotate}deg)`;

    }}
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setStartHovering(true);
    }, 200);
    return () => clearTimeout(timeOut);
  }, [isEnterComplete]);
  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);
  const [boxShadow, setBoxShadow] = useState<string>("");

  return (
    <motion.li
      ref={ref}
      className={props.className}
      style={{
        perspective: dimension.x*dimension.y
      }}
      onAnimationComplete={onAnimationComplete}
      custom={coordXY}
      initial={initial}
      animate={animate}
      variants={variants}
    >
      <div className=" relative w-full h-full rounded-2xl">
        <motion.div
          className={"relative w-[100%] h-[100%] top-0 z-50 rounded-xl bg-transparent "}
          variants={projectVariants}
          animate={animate}
          custom={coordXY}
          style={{transformStyle: "preserve-3d"}}
          whileHover={
            isEnterComplete
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
       {/*    <div ref={backgroundRef} className="absolute h-full w-full bg-white"
          style={{transformStyle: "flat"}}>

          </div> */}
          <div className="cube" ref={cardRef}>
        <div className="side front" >
        <ProjectCard project={project} />
          </div>
        <div className="side left" />
        <div className="side right" />
        <div className="side top" />
        <div className="side bottom" />
        <div className="side back" />
      </div>
          {/**  CARD Ref */}
          {/* <motion.div ref={cardRef} style={{
            transformStyle: "flat"
          }}>
            <ProjectCard project={project} />
          </motion.div> */}
        </motion.div>

        {isEnterComplete && (
          <motion.div
            className={"absolute  opacity-25 z-0 rounded-xl bg-white "}
            variants={shadowVariants}
            animate={animate}
            custom={coordXY}
            style={{
              // rotateX: 8,

              height: dimension.y,
              width: dimension.x,

              bottom: -200,
            }}
            ref={shadowRef}
          >
            <Image
             
              isBlurred
              width={dimension.x}
              height={dimension.y}
              className="m-0 w-full h-full bg-black object-cover self-stretch"
              src={project ? project.images[0] : undefined}
              alt=""
              isZoomed
            />
          </motion.div>
        )}
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

const projectVariants: Variants = {
  rotate: (i: ItemData) => ({
    scale: i.rotationData.scale,
    visibility: "visible",

    opacity: i.rotationData.opacity,

    rotateX: i.rotationData.rotateX,
    rotateY: i.rotationData.rotateY,
    transition: { duration: duration },
  }),
  still: (i: ItemData) => ({
    scale: i.rotationData.scale,
    visibility: "visible",
    rotateX: i.rotationData.rotateX,
    rotateY: i.rotationData.rotateY,
    opacity: i.rotationData.opacity,
    transition: { repeat: Infinity, duration: 1 },
  }),
};
const CardVariants: Variants = {
  rotate: (i: ItemData) => ({
    scale: i.rotationData.scale,
    visibility: "visible",

    opacity: i.rotationData.opacity,

    rotateX: i.rotationData.rotateX,
    rotateY: i.rotationData.rotateY,
    transition: { duration: duration },
  }),
};

const shadowVariants: Variants = {
  rotate: (i: ItemData) => ({
    visibility: "visible",
    ...i.shadowProperties,
    opacity: i.shouldDisplay ? 0.25 : 0.1,
    rotateX: i.rotationData.rotateX,
    rotateY: i.rotationData.rotateY,
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
