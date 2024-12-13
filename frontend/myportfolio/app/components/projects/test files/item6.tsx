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

const Item6 = () => {
  const test = useRef<HTMLDivElement>(null);
  const test2 = useRef<HTMLDivElement>(null);
  const path =
    "polygon( 0% 6.25%,0% 99%,0% 99%,0.013% 99.162%,0.051% 99.316%,0.111% 99.46%,0.192% 99.591%,0.292% 99.707%,0.409% 99.807%,0.54% 99.888%,0.683% 99.949%,0.837% 99.987%,1% 100%,94.75% 100%,94.75% 100%,94.986% 99.989%,95.217% 99.958%,95.444% 99.906%,95.664% 99.834%,95.877% 99.743%,96.08% 99.634%,96.274% 99.507%,96.456% 99.362%,96.625% 99.201%,96.781% 99.024%,99.219% 95.976%,99.219% 95.976%,99.364% 95.782%,99.495% 95.58%,99.611% 95.369%,99.713% 95.152%,99.799% 94.929%,99.871% 94.701%,99.927% 94.468%,99.967% 94.231%,99.992% 93.992%,100% 93.75%,100% 1.25%,100% 1.25%,99.984% 1.047%,99.936% 0.855%,99.86% 0.676%,99.759% 0.512%,99.634% 0.366%,99.488% 0.241%,99.324% 0.14%,99.145% 0.064%,98.953% 0.016%,98.75% 0%,5.25% 0%,5.25% 0%,5.015% 0.011%,4.783% 0.042%,4.556% 0.094%,4.336% 0.166%,4.124% 0.257%,3.92% 0.366%,3.726% 0.493%,3.544% 0.638%,3.375% 0.799%,3.219% 0.976%,0.781% 4.024%,0.781% 4.024%,0.636% 4.218%,0.505% 4.42%,0.389% 4.631%,0.287% 4.848%,0.201% 5.071%,0.129% 5.299%,0.073% 5.532%,0.033% 5.769%,0.008% 6.008%,0% 6.25% )";
  const [dim, setDim] = useState<{
    x: number;
    y: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });
  const [dim2, setDim2] = useState<{
    x: number;
    y: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0 });

  const [variant, setVariant] = useState("rotate");

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
    <div className="bg-slate-400 h-[500px] w-[500px] relative py-7 px-7">
      <motion.div
        ref={test}
        className="relative w-96 h-96 rounded-md overflow-hidden"
        whileHover={{
          rotateX: 20,
          rotateY: 45,
          scale: 0.98
        }}
      >
        <motion.div
          ref={test2}
          className="absolute  bg-amber-200"
          style={{
            clipPath: path,

            top: -5 + "%",
            left: -4 + "%",
            bottom: -5 + "%",
            right: -4 + "%",
            
            //  rotateY: 2.25+"%",
            //  rotateX: 2.25 + "%",
          }}
          whileHover={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <motion.div
            className="absolute bg-slate-50"
            style={{
              top: 0 + "%",
              left: 0 + "%",
              bottom: 0 + "%",
              right: 0 + "%",
            }}
            whileHover={{
              top: 5 + "%",
              left: 0 + "%",
              bottom: 0 + "%",
              right: 5 + "%",
              
            }}
          >
            <motion.div
              className="absolute"
              style={{
                top: 25 + "%",
                left: 25 + "%",
                bottom: 25 + "%",
                right: 25 + "%",
              }}
              whileHover={{
                
              }}
            >
              <ProjectCard project={testdata[1]} />
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

const testVariant: Variants = {
  rotate: {
    rotateX: 20,
    rotateY: 45,
  },
};

export default Item6;
