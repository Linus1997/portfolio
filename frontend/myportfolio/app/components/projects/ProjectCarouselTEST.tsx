import { LayoutGroup, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import testdata from "../../utils/testdata.json";
import { ProjectInterface } from "@/app/utils/interfaces";
import ProjectItem from "./ProjectItemTEST";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";

const baseItem = tv({
  base: ["z-0  visible w-56 h-56"],
  variants: {
    zIndex: {
      10: "z-10 ",
      20: "z-20",
      30: "z-30 ",
    },
    item: {
      front: "",
      right: "",
      right2: "",
      left2: "",
      left: "",
    },
  },
});

export interface Coord {
  placement: string;
  x: number;
  y: number;
}
const style = [
  baseItem({ zIndex: 30 }),
  baseItem({ zIndex: 20 }),
  baseItem({ zIndex: 10 }),
  baseItem({ zIndex: 10 }),
  baseItem({ zIndex: 20 }),
];
const TEST = () => {
  const [projects] = useState<ProjectInterface[]>([...testdata]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<Array<HTMLLIElement>>([]);
  const [coord, setCoord] = useState<Coord[]>(new Array(5).fill(null));
  const [rotatedCoord, setRotated] = useState<Coord[] | null>(null);
  const [direction, setDirection] = useState<number | null>(0);
  const [animationsCompleted, setAnimationsCompleted] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );

  const directionStack: number[] = [];
  /*
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
    } */

  const a = [0, 1, 2, 3, 4];
  /*   useLayoutEffect(() => {
    recalculateDimensions();
    window.addEventListener("resize", recalculateDimensions);
    return () => {
      window.removeEventListener("resize", recalculateDimensions);
    };
  }, [] ); */
  /*   useEffect(() => {
    rotatedCoord?.forEach((i, index) => console.log(index, i));
  });
 */
  /*   --front-col: 3 / 4;
  --front-row: 3 / 4;

 */
//TODO: testa z-index också...
  const test = [
    { col: "--front-col", row: "--front-row" },
    { col: "--right-col", row: "--right-row" },
    { col: "--right2-col", row: "--right2-row" },
    { col: "--left2-col", row: "--left2-row" },
    { col: "--left-col", row: "--left-row" },
  ];

  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center">
      <button
        className={`w-[5%] `}
        onClick={() => {
          setDirection((prev) => {
            if (prev) return getIndex(prev, -1, 5);
            else return getIndex(0, -1, 5);
          });
        }}
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
      <LayoutGroup id="project">
        <motion.ul
          ref={wrapperRef}
          layout
          layoutRoot
          className="grid grid-cols-6 grid-rows-4   w-4/6 h-96  py-2 gap-4"
        >
          {coord?.map((item, i) => (
            <ProjectItem
              targetRef={itemRef.current[i]}
              ref={(el) => {
                if (el) itemRef.current[i] = el;
              }}
              className={style[i]}
              newCoord={null}
              grid={test[i]}
              grid2={direction? test[getIndex(i, direction, 5)] : null}
              //className={rotatedCoord? rotatedCoord[i].placement : coord? coord[i].placement : "invisible"}
              //newCoord={rotatedCoord? rotatedCoord[i] : null}
              coord={null}
              key={i}
              index={1}
            >
              <ProjectCard
                {...projects[getIndex(currentIndex, i, projects.length)]}
              />
            </ProjectItem>
          ))}
        </motion.ul>
      </LayoutGroup>

      <button
        className={`w-[5%] `}
        onClick={(e) => {
          setDirection((prev) => {
            if (prev) return prev++;
            else return 1;
          });
        }}
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

export default TEST;
