import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import testdata from "../../../utils/testdata.json";
import ProjectCard from "../ProjectCard";
import { interpolate, toPathString } from "flubber"; // ES6
import { splitPathString } from "flubber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { outerPaths } from "../paths";
import { Dimensions } from "../reducers/coordReducer";

const colors = [
  "#00cc88",
  "#0099ff",
  "#8855ff",
  "#ff0055",
  "#ee4444",
  "#ffcc00",
];
interface dimtest {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface shiiet {
  dim: dimtest
}

const DynamicPath = ({ dim }: shiiet) => {
  const [pathData, setPathData] = useState('');

  useEffect(() => {
    // Fetch the external SVG
    fetch('public/ny.svg')
      .then((response) => response.text())
      .then((svgText) => {
        // Parse the SVG text
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
        // Extract the path data
        const pathElement = svgDocument.querySelector('#path2');
        let d;
        if (pathElement) {
          d = pathElement.getAttribute('d')
          if (d)
            setPathData(d); // Update state with path data
        }
      })
      .catch((err) => console.error('Error loading SVG:', err));
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      viewBox={`0 0 ${dim.x}} ${dim.y}}`}
      width={0}
      height={0}
    >
      <defs>

        <motion.clipPath
          id={`detta`}
          transform={`scale(${(dim.x + 20) / 100}, ${(dim.x + 20) / 100})`}
        >
          <motion.path
            // Start with the initial shape "M 3,3 0,12.5 V 50 87.5 L 8,100 H 50 87.5 92 l 8,-12.5 V 50 3 H 97 L 87.5,0 h -75 z"
            d={"M 0,3 V 87.5 L 8,100 h 84 l 8,-12.5 V 3 L 87.5,0 h -75 z"}
          />
        </motion.clipPath>

      </defs>
    </svg>
  );
};



function scalePath(polygon: string, width: number, height: number) {
  const points = polygon.split(",").map((point) => {
    const [xPercent, yPercent] = point.trim().split(/\s+/).map(parseFloat);
    //console.log(xPercent, yPercent)
    const x = xPercent / 100;
    const y = yPercent / 100;
    return [x, y];
  });
  return points;
}

const GeneralItem = () => {
  const test = useRef<HTMLDivElement>(null);
  const test2 = useRef<HTMLDivElement>(null);
  const path =
    "path('M 10,10 1.767767,18.232233 A 6.0355339,6.0355339 112.5 0 0 0,22.5 V 60 97.5 a 6.0355339,6.0355339 67.5 0 0 1.767767,4.26777 L 10,110 l 8.232233,8.23223 A 6.0355339,6.0355339 22.5 0 0 22.5,120 H 60 97.5 a 6.0355339,6.0355339 157.5 0 0 4.26777,-1.76777 L 110,110 l 8.23223,-8.23223 A 6.0355339,6.0355339 112.5 0 0 120,97.5 V 60 22.5 a 6.0355339,6.0355339 67.5 0 0 -1.76777,-4.267767 L 110,10 101.76777,1.767767 A 6.0355339,6.0355339 22.5 0 0 97.5,0 h -75 a 6.0355339,6.0355339 157.5 0 0 -4.267767,1.767767 z')";
  const [dim, setDim] = useState<dimtest>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });
  const [dim2, setDim2] = useState<dimtest>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });

  const [variant, setVariant] = useState("default");


  useLayoutEffect(() => {
    const a = test.current?.getBoundingClientRect();
    const b = test.current?.getBoundingClientRect();
    if (a && b) {
      setDim({
        x: a?.width,
        y: a?.height,
        top: a.top,
        left: a.left,
        bottom: a.bottom,
        right: a.right,
      });
      setDim2({
        x: b?.width,
        y: b?.height,
        top: b.top,
        left: b.left,
        right: b.right,
        bottom: b.bottom,
      });
    }

  }, []);





  const factor = 1.0225;
  console.log((dim.x * factor) / 100);
  return (
    <div id="HAAAHAAA" className="bg-slate-400 h-[500px] w-[500px] relative py-7 px-7 ">
      {dim &&
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          viewBox={`0 0 ${dim.x}} ${dim.y}}`}
          width={0}
          height={0}
        >
          <defs>

            <motion.clipPath
              id={`detta`}
              transform={`scale(${(dim.x) / 100}, ${(dim.x) / 100})`}
            >
              <motion.path
                variants={pathVariant}
                animate={variant}
                // Start with the initial shape "M 3,3 0,12.5 V 50 87.5 L 8,100 H 50 87.5 92 l 8,-12.5 V 50 3 H 97 L 87.5,0 h -75 z"
                d={"M 0,3 V 87.5 L 8,100 L 92,100 L 100,87.5 L 100,3 L 87.5,0 L 12.5,0 z"}
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
          onMouseEnter={() => setVariant("default")}
          onMouseLeave={() => setVariant("mouseEnter")}
        >

          <motion.div
            ref={test2}
            className="absolute  bg-amber-200"
            variants={shapeBoxVariant}
            animate={variant}
            style={{
              clipPath: "url(#detta)",



              //  rotateY: 2.25+"%",
              //  rotateX: 2.25 + "%",
            }}

          >
            <motion.div
              className="absolute  bg-blue-700"
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
const d= `M 0,3 
L 0,99              
L 8,100 
L 100,100 
L 100,87.5 
L 100,3 
L 87.5,0 
L 12.5,0 
z`
const paths = [    `M 0.5,11.5 
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
  z`]

/**
 * 
 */
const pathVariant: Variants = {
  default: {
    d: `M 1.5,2.5
        C 0,3  0,4  0,6
        L 0,98
        C 0,99   1,100  2,100 
        L 7,100
        C 7,100   8,100   9,100 
        L 98,100
        C 99,100   100,99   100,98      
        L 100,87.5 
        C 100,87.5   100,87.5   100,87.5
        L 100,6
        C 100,4   100,3   98.5,2.5
        L 88.5,0.25
        C 88,0.125   87.5,0   87,0  
        L 13.5, 0
        C 13,0   12.5,0.125   12,0.25
        z`,
    transition:{
      duration: 1
    }
  },

  mouseEnter: {
    d: 
    `M 0.5,11.5 
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
      z`
    ,
   
    transition:{
      duration: 1
    }
  },
};
const maskerVariant: Variants = {
  default: {
    top: 0 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
    rotateX: 0,
    rotateY: 0,
    scale: 1, 
    transition:{
      duration: 1
    }
  },

  mouseEnter: {
    rotateX: 20,
    rotateY: 45,
    scale: 1, 
    transition:{
      duration: 1
    }
  },
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
      duration: 1
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
      duration: 1
    }
  },
};

export default GeneralItem;
