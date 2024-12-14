import {
  motion,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

import { path0 } from "@/app";

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




interface props{
 path : string;
 rotX: number;
 rotY: number;
 id: number;
}



const GeneralItem = ({path, rotX, rotY, id: key}: props) => {
  const test = useRef<HTMLDivElement>(null);
 
  const [dim, setDim] = useState<dimensions>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });

  const [variant, setVariant] = useState("mouseEnter");


  useLayoutEffect(() => {
    const a = test.current?.getBoundingClientRect();
   
    if (a ) {
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
                animate={variant}
                custom={path}
                
              />
            </motion.clipPath>

          </defs>
        </svg>}
      <motion.div className=" ">
        <motion.div
          ref={test}
          className="relative w-96 h-96  "
          variants={maskerVariant}
          animate={variant}
          custom={{rotX,rotY}}
          onMouseEnter={() => setVariant("default")}
          onMouseLeave={() => setVariant("mouseEnter")}
        >

          <motion.div
            
            className="absolute  bg-amber-200"
            variants={shapeBoxVariant}
            animate={variant}
           
            style={{
              clipPath: `url(#path-${key})`,



              //  rotateY: 2.25+"%",
              //  rotateX: 2.25 + "%",
            }}

          >
            <motion.div
              className="absolute hidden bg-blue-700"
              variants={frontVariant}
              animate={variant}

            >
              {/* <motion.div
              className="absolute"
              style={{
                top: 25 + "%",
                left: 25 + "%",
                bottom: 25 + "%",
                right: 25 + "%",
              }}
              whileHover={{
                rotateX: 25,
                rotateY: 20
              }}
            >
              <ProjectCard project={testdata[1]} />
            </motion.div> */}
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



/**
 * 
 */
const ehm = `
M 0.5,11.5 
      C 0.125,12   0,12.5   0,13
      L 0,98 
      C 0.125,99   0.5,99.5   2,100
      L 7,100 
      C 8,100   9,100   10,100
      L 86,100
      C 87,100   88,99   89,98 
      L 99.5,88
      C 100,87.5   100,87   100,86.5
      L 100,1 
      C 100,0.5   99.5,0   99,0 
      L 87.5,0
      C 87.5,0   87.5,0   87.5,0 
      L 17,0 
      C 16.2,0.125   15.8,0.5   15,1 
      z
`
const duration = 1;
const pathVariant: Variants = {
  default: (): TargetAndTransition =>  ({
    d: path0,
    transition:{
      duration: duration
    }
  }),
  mouseEnter: (path: string): TargetAndTransition => ({
    d: path
    ,
   
    transition:{
      duration: duration
    }
  }),
};



const maskerVariant: Variants = {
  default: (): TargetAndTransition => ({
    top: 0 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
    rotateX: 0,
    rotateY: 0,
    scale: 1, 
    transition:{
      duration: duration
    }
  }),

  mouseEnter: ({rotX, rotY}:{rotX:string, rotY:string}) : TargetAndTransition => ({
    rotateX: rotX,
    rotateY: rotY,
    scale: 1, 
    transition:{
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

  mouseEnter: {
    borderTopLeftRadius: 0 + "%",
    top: 0 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
  },
};
const frontVariant: Variants = {
  default: {
    
    borderTopLeftRadius: 1 + "%",
    borderTopRightRadius: 1 + "%",
    borderBottomRightRadius: 1 + "%",

    top: 3 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
    
    transition:{
      duration: duration
    }

  },

  mouseEnter: {
    borderBottomRightRadius: 1 + "%",
    borderTopRightRadius: 1 + "%",
    borderTopLeftRadius: 1 + "%",
    top: 12 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 12.8 + "%",
    transition:{
      duration: duration
    }
  },
};

export default GeneralItem;
