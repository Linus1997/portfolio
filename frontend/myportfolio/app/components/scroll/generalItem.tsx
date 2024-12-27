import {
  motion,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";



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
}



const GeneralItem = ({ path, rotX, rotY, id: key, front, front2, path2, morphState , frame1, frame2}: props) => {
  const test = useRef<HTMLDivElement>(null);

  const [dim, setDim] = useState<dimensions>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });




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






  return (
    <div id="HAAAHAAA" className="bg-slate-400 h-[500px] w-[500px] relative py-7 px-7 ">
      {dim &&
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          viewBox={`0 0 ${dim.x} ${dim.y}`}
          width={0}
          height={0}
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
        </svg>}
      <motion.div className=" ">
        <motion.div
          ref={test}
          className="relative w-96 h-96  "
       
         

        >

          <motion.div

            className="absolute  bg-amber-200 h-full w-full"
            variants={shapeBoxVariant}
            animate={morphState}

            style={{
              clipPath: `url(#path-${key})`,



              //  rotateY: 2.25+"%",
              //  rotateX: 2.25 + "%",
            }}

          >
            <motion.div
              className="absolute  bg-blue-700"
              variants={shapeBoxVariant}
              
              // variants={frontVariant}
               animate={morphState}
              // custom={{ front, front2 }}
              style={{
                clipPath: `url(#frame-${key})`,
  
  
  
                //  rotateY: 2.25+"%",
                //  rotateX: 2.25 + "%",
              }}
            />



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
