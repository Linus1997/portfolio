import { getProjects } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";
import {
  motion,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import ProjectCard from "../projects/projectcontent/ProjectCard";



const colors = [
  "#00cc88",
  "#0099ff",
  "#8855ff",
  "#ff0055",
  "#ee4444",
  "#ffcc00",
];
interface dimensions {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}




interface props {
  path: string;
  path2: string;
  rotX: number;
  rotY: number;
  id: number;
  front: TargetAndTransition;
  front2: TargetAndTransition;
  frame1: string
  frame2: string
  morphState: string
  corner1?: string
  corner2?: string
}



const GeneralItem = ({ path, rotX, rotY, id: key, front, front2, path2, morphState, frame1, frame2, corner1, corner2 }: props) => {
  const test = useRef<HTMLDivElement>(null);

  const [dim, setDim] = useState<dimensions>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });

  const [projects] = useState<ProjectInterface[]>(getProjects());

  useLayoutEffect(() => {
    const a = test.current?.getBoundingClientRect();

    if (a) {
      setDim({
        x: a?.width,
        y: a?.height,
        top: a.top,
        left: a.left,
        bottom: a.bottom,
        right: a.right,
      });

    }

  }, []);



  //undre
  const under = `M 13.31,18.18 

Q 13,18.5 13,19 

L 22,26 

Q 22,25.5 22.31,25.18 

Z `;
  // övre
  let over: string = `
M 14.2,17.74
Q 13.6,17.85 13.3,18.18 
L 22.31,25.18
Q 22.6,24.86 23.2,24.74
Z `;

  return (
    <div  className="bg-slate-400 h-[500px] w-[500px] relative py-7 px-7 ">
      {dim &&
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          viewBox={`0 0 ${dim.x} ${dim.y}`}
          vbwidth={0}
          vbheight={0}
        >
          <defs>

            <motion.clipPath
              id={`path-${key}`}
              transform={`scale(${(dim.x) / 100}, ${(dim.x) / 100})`}
            >
              <motion.path
                variants={pathVariant}
                animate={morphState}
                custom={{ path: path, path2: path2 }}

              />
            </motion.clipPath>

            <motion.clipPath
              id={`frame-${key}`}
              transform={`scale(${(dim.x) / 100}, ${(dim.x) / 100})`}
            >
              <motion.path
                variants={frameVariant}
                animate={morphState}
                custom={{ frame1, frame2 }}

              />
            </motion.clipPath>

          
          </defs>
        </svg>


      }
      <motion.div className=" ">
        <motion.div
          ref={test}
          className="relative w-96 h-96  "



        >

          <motion.div

            className="absolute  bg-gray-100 h-full w-full"
            variants={shapeBoxVariant}
            animate={morphState}

            style={{
              clipPath: `url(#path-${key})`,



              //  rotateY: 2.25+"%",
              //  rotateX: 2.25 + "%",
            }}

          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-full h-full"
              viewBox={`0 0 ${dim.x} ${dim.y}`}


            >



              <motion.path
                variants={pathVariant}
                animate={morphState}
                stroke={"#000000"}
                fill={"none"}
                strokeOpacity="1"
                transform={`scale(${(dim.x) / 100}, ${(dim.x) / 100})`}
                strokeWidth={"1px"}
                custom={{ path: path, path2: path2 }}

              />





              <motion.path
                variants={frameVariant}
                animate={morphState}
                stroke={"#000000"}
                fill={"none"}
                strokeOpacity="1"
                transform={`scale(${(dim.x) / 100}, ${(dim.x) / 100})`}
                strokeWidth={"1px"}
                custom={{ frame1: frame1, frame2: frame2 }}

              />
              <motion.path


                fill={"#000000"}
                fillOpacity={"0.2"}

                transform={`scale(${(dim.x) / 100}, ${(dim.x) / 100})`}
                animate={{
                  d: morphState === "default"? corner1 : corner2                  
                }}
                transition={{duration: duration,
                  easings: "easeinout"
                }}

              />
      {/* <motion.path
        initial={{ pathLength: 0, strokeDasharray: "0, 1", strokeOpacity: 1,
          fill: "none"
         }}
        animate={{
          pathLength: 1,
          strokeDasharray: "5, 20, 22 ",
          strokeOpacity: isStrokeFadeOut ? 0 : 1,
          fill: isComplete && fillColor !== undefined ? `${fillColor}` : "none",

          fillOpacity: isComplete && fillColor ? 1 : 0,
        }}
        transition={{
          duration: 3,
          strokeDasharray: { duration: 1, ease: "easeInOut" },
          strokeDashoffset: { duration: 2, ease: "easeInOut" },
          ease: "easeInOut",
          fillOpacity:
            isComplete && fillColor
              ? { duration: 2, ease: "easeIn", initial: 0 }
              : {},
          strokeOpacity: isStrokeFadeOut
            ? { delay: 0, duration: 1, ease: "easeInOut" }
            : {},
        }}
        viewport={{once: true}}
        strokeWidth={0.2}
        
      /> */}






            </svg>

            <motion.div
              className="absolute bg-blue-700"
              variants={shapeBoxVariant}

              // variants={frontVariant}
              animate={morphState}
              // custom={{ front, front2 }}
              style={{
                clipPath: `url(#frame-${key})`,



                //  rotateY: 2.25+"%",
                //  rotateX: 2.25 + "%",
              }}
            >


              <motion.div
                className=" h-full w-full absolute"
                variants={frontVariant}
                custom={{ front, front2 }}
                animate={morphState}
              >
                <ProjectCard project={projects[0]} />
              </motion.div>
            </motion.div>


          </motion.div>

        </motion.div>
      </motion.div>
      {/* <button
        className="absolute w-5 h-5 bg-red-800 bottom-0"
        onClick={() => {}}
      >
        test
      </button> */}

    </div>
  );
};



const duration = 0.2;
const cornerduration= 0.25;
const pathVariant: Variants = {
  default: ({ path, path2 }): TargetAndTransition => ({
    d: path,
    transition: {
      duration: duration
    }
  }),
  morph: ({ path, path2 }): TargetAndTransition => ({
    d: path2
    ,

    transition: {
      duration: duration
    }
  }),
};

const frameVariant: Variants = {
  default: ({ frame1, frame2 }): TargetAndTransition => ({
    d: frame1,
    transition: {
      duration: duration
    }
  }),
  morph: ({ frame1, frame2 }): TargetAndTransition => ({
    d: frame2
    ,

    transition: {
      duration: duration
    }
  }),
};

const BaseItemVariants: Variants = {
  default: ({ rotX, rotY }: { rotX: string, rotY: string }): TargetAndTransition => ({


    transition: {
      duration: duration
    }
  }),

  morph: ({ rotX, rotY }: { rotX: string, rotY: string }): TargetAndTransition => ({


    transition: {
      duration: duration
    }
  }),
};

const cornerVariant: Variants = {
  default: ({ front, front2 }: { front: TargetAndTransition, front2: TargetAndTransition }): TargetAndTransition => ({
    ...front,

    transition: {
      duration: cornerduration
    }
  }),

  morph: ({ front, front2 }: { front: TargetAndTransition, front2: TargetAndTransition }): TargetAndTransition => ({
    ...front2,

    transition: {
      duration: cornerduration
      
    }
  }),
};
const shapeBoxVariant: Variants = {
  default: {
    top: 0 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
  },

  morph: {
    borderTopLeftRadius: 0 + "%",
    top: 0 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
  },
};
const frontVariant: Variants = {
  default: ({ front, front2 }: { front: TargetAndTransition, front2: TargetAndTransition }): TargetAndTransition => ({
    ...front,

    transition: {
      duration: duration
    }
  }),

  morph: ({ front, front2 }: { front: TargetAndTransition, front2: TargetAndTransition }): TargetAndTransition => ({
    ...front2,

    transition: {
      duration: duration
    }
  }),
};

export default GeneralItem;
