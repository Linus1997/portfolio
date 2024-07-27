
import {
  animate,
  animationControls,
  AnimationDefinition,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useMotionValueEvent,
  VariantLabels,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { useRef, useEffect, forwardRef, useState, useMemo } from "react";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";
import { baseStyles } from "@nextui-org/react";
import React from "react";
import { AnimationCoord, ItemData } from "./ProjectListWrapper";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/app/utils/interfaces";

interface ListProps {

  index: number;
  animationCoord?: AnimationCoord;
  callback: (definition: AnimationDefinition) => void;
  project: ProjectInterface | null
  var: string;
  
}

const ProjectItem = forwardRef<HTMLLIElement, HTMLMotionProps<"li"> & ScriptProps & ListProps>(
  (props, ref) => {
    const { animate, initial, variants, animationCoord, project, onAnimationComplete } = props;
  
  
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
        style={{ backfaceVisibility: "visible",
        
        }}
        onAnimationComplete={onAnimationComplete}
        custom={animationCoord}
        initial={initial}
        animate={animate}
        variants={variants}
        whileHover={{scale: 1.2}}
       
      >
      <div className=" relative w-full h-full rounded-2xl" 
      
      >
       <div>
      <motion.div className="absolute bg-zinc-400 w-full h-full rounded-xl shadow-inner  " style={{top: 0, right:0  , rotateX: 0, rotateY: 0}}/>
      <motion.div className="absolute bg-zinc-500 w-full h-full rounded-xl shadow-inner" style={{top: 0, right:0 , rotateX: 20, rotateY: 0, }} />
      <motion.div className="absolute bg-zinc-600 w-full h-full rounded-xl shadow-inner" style={{top: 0, right:0, rotateX: 50, rotateY: 0}} />
      </div>
        
        <motion.div  className={props.className + "w-[95%] h-[95%]   rounded-xl bg-white "} >
        {project ?  <ProjectCard project={null} /> :
        <div className={props.className + "w-[95%] h-[95%] rounded-xl bg-white"} />}
        </motion.div>
      </div>
      </motion.li>
    );
  }
);

const itemVariants = {
  initial: {rotateY: 0, zIndex:0, transition: {duration:0}},
  left: {rotateY: 180, zIndex:20},
  right: {rotate: 180}
};


ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
