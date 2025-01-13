import {
  animate,
  easeIn,
  easeInOut,
  HTMLMotionProps,
  motion,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { forwardRef, useEffect, useRef, useState } from "react";
import React from "react";
import { ProjectInterface } from "@/app/utils/interfaces";



import ProjectCard from "../projectcontent/ProjectCard";
import { CoordXY, ItemData } from "../utils/sharedInterfaces";
import { BaseItemVariants, shapePathVariant, BackgroundVariants, framePathVariant, FrontFrameVariants, CornerPathVariants } from "./listItemVariants";
import SvgWrapper from "../../SvgMotionComponents/SvgWrapper";
import ClipPaths from "../SVGs/ClipPaths";
import SVGStrokes from "../SVGs/SVGStrokes";
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
    animate,
    onAnimationComplete,
  } = props;

  const [isHover, setIsHover] = useState<boolean>(false)


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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}


    >
      <ClipPaths vBox={`0 0 ${dimension.x} ${dimension.y}`} index={index} svgTransform={svgTransform} shapePath={itemData.shapePath} framePath={itemData.framePath} animate={animate} onAnimationComplete={onAnimationComplete} />

      <motion.div
        className="absolute"
        style={{
          // filter: "drop-shadow(0 1px 0.2rem white)",
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


          <SVGStrokes vBox={`0 0 ${dimension.x} ${dimension.x}`} svgTransform={svgTransform} shapePath={itemData.shapePath} framePath={itemData.framePath} cornerPath={itemData.cornerPath} animate={animate} onAnimationComplete={onAnimationComplete} isHover={isHover} />


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
                zIndex: 10,
                clipPath: `url(#frame-path-${index})`,

              }}
            >

           
              <motion.div
                className=" h-full w-full absolute bg-transparent "

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
                      , border: "url(#rainbowGradient)"

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
export default React.memo(ProjectItem);
