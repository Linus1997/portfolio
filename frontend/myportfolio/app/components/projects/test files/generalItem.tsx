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
            d={"M 3,3 H 0 V 50 87.5 L 8,100 H 50 87.5 92 l 8,-12.5 V 50 3 H 97 L 87.5,0 h -75 z"}
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
      {dim && <DynamicPath dim={dim} />}
      <motion.div className=" ">
        <motion.div
          ref={test}
          className="relative w-96 h-96 rounded-md overflow-hidden "
          variants={maskerVariant}
          animate={variant}
          onMouseEnter={() => setVariant("mouseEnter")}
          onMouseLeave={() => setVariant("default")}
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
              className="absolute bg-blue-700"
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
      <motion.div
        ref={test2}
        className="absolute  hidden bg-amber-200 ml-10 mt-10"
        style={{
          clipPath: "url(#detta)",

          top: 0 + "%",
          left: -3 + "%",
          bottom: 7 + "%",
          right: 3 + "%",

          //  rotateY: 2.25+"%",
          //  rotateX: 2.25 + "%",
        }}
        whileHover={{
          rotateX: 20,
          rotateY: 55,
          scale: 0.98
        }}
      />
    </div>
  );
};


const maskerVariant: Variants = {
  default: {
    top: 0 + "%",
    left: -3 + "%",
    bottom: 7 + "%",
    right: 3 + "%",

  },

  mouseEnter: {
    rotateX: 20,
    rotateY: 55,
    scale: 1
  },
};

const shapeBoxVariant: Variants = {
  default: {
    top: 0 + "%",
    left: -3 + "%",
    bottom: 7 + "%",
    right: 3 + "%",
  },

  mouseEnter: {

    top: -8 + "%",
    left: -8 + "%",
    bottom: 5 + "%",
    right: 0 + "%",
  },
};
const frontVariant: Variants = {
  default: {
    top: 3 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 0 + "%",
  },

  mouseEnter: {
    top: 12 + "%",
    left: 0 + "%",
    bottom: 0 + "%",
    right: 9 + "%",
  },
};

export default GeneralItem;
