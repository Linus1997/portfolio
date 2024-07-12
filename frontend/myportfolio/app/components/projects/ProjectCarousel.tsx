import { LayoutGroup, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import testdata from "../../utils/testdata.json";
import { ProjectInterface } from "@/app/utils/interfaces";
import ProjectItem from "./ProjectItem";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";

const baseItem = tv({
  base: ["z-0 absolute visible w-56 h-56 "],
  variants: {
    
    zIndex: {
      10: "z-10",
      20: "z-20",
      30: "z-30",
    },
  },
});

export const rotateRight = (arr: any[], k: number) => {
  const n = arr.length;
  k = k % n; // Ensure k is within the bounds of the array length
  return arr.slice(n - k).concat(arr.slice(0, n - k));
};

export const rotateLeft = (arr: any[], k: number) => {
  const n = arr.length;
  k = k % n; // Ensure k is within the bounds of the array length
  return arr.slice(k).concat(arr.slice(0, k));
};

export interface Coord {
  placement: string;
  x: number | null;
  y: number | null;
}
const style = [
  baseItem({ zIndex: 30 }),
  baseItem({ zIndex: 20 }),
  baseItem({ zIndex: 10 }),
  baseItem({ zIndex: 10 }),
  baseItem({zIndex: 20})
];
const ProjectCarousel = () => {
  const [projects] = useState<ProjectInterface[]>([...testdata]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
 
  const [front, setFront] = useState<number> (0);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<Array<HTMLLIElement>>([]);
  const [coord, setCoord] = useState<Coord[]>(
    [
      { placement: baseItem({ zIndex: 30 }), x: null, y: null },
      { placement: baseItem({ zIndex: 20 }), x: null, y: null },
      { placement: baseItem({ zIndex: 10 }), x: null, y: null },
      { placement: baseItem({ zIndex: 10 }), x: null, y: null },
      { placement: baseItem({ zIndex: 20 }), x: null, y: null },
    ]
  );
 
  const [direction, setDirection] = useState<number>(0);
 
useEffect(() => {
console.log(coord)
},[coord])
  const directionStack: number[] = [];
  const recalculateDimensions = () => {
    if (wrapperRef.current && itemRef.current && itemRef.current.length > 0) {
      const wrapperDim = wrapperRef.current.getBoundingClientRect();
      const childDim = itemRef.current[0].getBoundingClientRect();

      const frontX = wrapperDim.width / 2 - childDim.width / 2;
      const frontY = wrapperDim.height / 2 - childDim.height / 3;
      const level2X = childDim.width / 1.2;
      const rightX = frontX + level2X;
      const leftX = frontX - level2X;
      const level2Y = frontY - childDim.height / 3;

      const level3X = childDim.width / 3.1;
      const backRightX = rightX - level3X;
      const backLeftX = leftX + level3X;
     
      const coordValues: Coord[] = [
        { placement: baseItem({ zIndex: 30 }), x: frontX, y: frontY },
        { placement: baseItem({ zIndex: 20 }), x: rightX, y: level2Y },
        { placement: baseItem({ zIndex: 10 }), x: backRightX, y: 0 },
        { placement: baseItem({ zIndex: 10 }), x: backLeftX, y: 0 },
        { placement: baseItem({ zIndex: 20 }), x: leftX, y: level2Y },
      ];
      
      setCoord(coordValues);
      
    }
  };

  const rotate = (direction: number) => {
   // if (!startAnimation) {
       
       setDirection(direction);
       setFront(getIndex(front, direction, 5))
       setTimeout(() => {
         
         setDirection(0);
       }, 100);
 
     /*  () => {setDirection((prev) => { 
        if (prev)
         return getIndex(prev, -1, 5);
       else
         return getIndex(0, -1, 5)
       })} */
    //}
  };

  
  useLayoutEffect(() => {
    recalculateDimensions();
    window.addEventListener("resize", recalculateDimensions);
    return () => {
      window.removeEventListener("resize", recalculateDimensions);
    };
  }, [] );


  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center">
      <button
        className={`w-[5%] `}
        onClick={ () => rotate(-1)}
      >
        <svg
          className="w-full h-full stroke-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
     
        <motion.ul
          ref={wrapperRef}
        
          className="relative w-4/6 h-96  py-2 gap-4"
        >
          {[0,1, 2, 3, 4].map((item, i) => (
            <ProjectItem
              targetRef={itemRef.current[i]}
              ref={(el) => {
                if (el) itemRef.current[i] = el;
              } }
              className={"absolute w-56 h-56"}

              front={front}
              
              direction={direction}
              //className={rotatedCoord? rotatedCoord[i].placement : coord? coord[i].placement : "invisible"}
              //newCoord={rotatedCoord? rotatedCoord[i] : null}
              
              items={coord}
              key={i}
              initIndex={i} 
              >
              <ProjectCard
                {...projects[getIndex(currentIndex, i, projects.length)]}
              />
            </ProjectItem>
          ))}
        </motion.ul>
      

      <button
        className={`w-[5%] `}
        onClick={() => rotate(1)}
      >
        <svg
          className=" w-full h-[100%] stroke-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProjectCarousel;
