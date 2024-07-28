import { getIndex, rotateArray } from "@/app/utils/helperfunction";
import ProjectItem from "./ProjectListItem";
import { motion, Variants } from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ProjectInterface } from "@/app/utils/interfaces";

import testdata from "../utils/testdata.json";
import ProjectCard from "../components/projects/ProjectCard";



export interface ItemData {
  animationCoord: AnimationCoord;
  project: ProjectInterface | null;
}
interface WrapperProps {
  rotations: number;
  direction: number;
  projects: ProjectInterface[];
}
interface CoordXY {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
}

const recalculateDimensions = (wrapperDim: DOMRect, childDim: DOMRect) => {
  const frontX = Math.round(wrapperDim.width / 2 - childDim.width / 2);
  const frontY = Math.round(wrapperDim.height / 2 - childDim.height / 3);
  const level2X = Math.round(childDim.width / 1);
  const rightX = Math.round(frontX + level2X);
  const leftX = Math.round(frontX - level2X);
  const level2Y = Math.round(frontY - childDim.height / 4.5);
  const level3X = Math.round(childDim.width / 10);
  const backRightX = Math.round(rightX - level3X);
  const backLeftX = Math.round(leftX + level3X);
  const level3Y = 20;

  let rotX2 = 20;
  let rotXBack3 = 10;
  let itemRightY = -40;
  let itemBackRightY = 40;
  let itemBackLeftY = -40;
  let itemLeftY = 40;

  const updatedCoord: CoordXY[] = [
    {
      x: frontX,
      y: frontY,
      rotateX: 0,
      rotateY: 0,
      z: 40,
    },
    {
      x: rightX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemRightY,
      z: 30,
    },
    {
      x: backRightX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackRightY,
      z: 20,
    },
    {
      x: frontX,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      z: 0,
    },
    {
      x: backLeftX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackLeftY,
      z: 20,
    },
    {
      x: leftX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemLeftY,
      z: 30,
    },
  ];
  return updatedCoord;
};


interface VariantArg {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  zIndex: number;
}

export interface AnimationCoord {
  initial: VariantArg;
  left: VariantArg;
  right: VariantArg;
}

export const duration: number = 0.4;
const itemVariants : Variants = {
  initial: (i: AnimationCoord) => ({
    x: i.initial.x,
    y: i.initial.y,

    zIndex: i.initial.zIndex,
    rotateX: i.initial.rotateX,
    rotateY: i.initial.rotateY,
    transition: { duration: 0 },
  }),
  left: (i: AnimationCoord) => ({
    x: i.left.x,
    y: i.left.y,

    zIndex: i.left.zIndex,
    rotateX: i.left.rotateX,
    rotateY: i.left.rotateY,

    transition: { type: "spring", stiffness: 100,  duration: duration },
  }),
  right: (i: AnimationCoord) => ({
    x: i.right.x,
    y: i.right.y,

    zIndex: i.right.zIndex,
    rotateX: i.right.rotateX,
    rotateY: i.right.rotateY,
    transition: { duration: duration },
  }),
};

const ProjectListWrapper = ({
  rotations,
  projects,
  direction,
}: WrapperProps) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<Array<HTMLLIElement>>([]);

  const [state, dispatch] = useReducer(
    coordReducer,
    { initRotation: rotations, projects: projects },
    createInitialState
  );

  useEffect(() => {
    direction !== 0 && dispatch({ type: "rotate", rotations: direction });
  }, [direction]);
  useLayoutEffect(() => {
    const onDimChange = () => {
      if (wrapperRef.current && itemRef.current && itemRef.current.length > 0) {
        const wrapperDim = wrapperRef.current.getBoundingClientRect();
        const childDim = itemRef.current[0].getBoundingClientRect();
        const updatedCoord = recalculateDimensions(wrapperDim, childDim);

        dispatch({ type: "resize", coords: updatedCoord });
      }
    };
    onDimChange();

    window.addEventListener("resize", onDimChange);
    return () => {
      window.removeEventListener("resize", onDimChange);
    };
  }, []);

  if (!projects || projects.length == 0) return <></>;
  return (
    <motion.ul ref={wrapperRef} className="relative  h-96 py-2 ">
      {[0, 1, 2, 3, 4].map((item, i) => (
        <ProjectItem
          index={item}
          targetRef={itemRef.current[i]}
          ref={(el) => {
            if (el) itemRef.current[i] = el;
          }}
          className={
            "absolute w-56 h-56 self-stretch" +
            `${
              state.itemData[i].x && state.itemData[i].y
                ? "visible"
                : "invisible"
            }`
          }
          coord={state.itemData[i]}
          //className={rotatedCoord? rotatedCoord[i].placement : coord? coord[i].placement : "invisible"}
          //newCoord={rotatedCoord? rotatedCoord[i] : null}
          key={i}
        >
          <ProjectCard project={state.itemData[i].project} />
        </ProjectItem>
      ))}
    </motion.ul>
  );
};

/**
 * STATE REDUCER HANDLER
 */
interface State {
  rotation: number;
  itemData: ItemData[];
  projects: ProjectInterface[];
  projectSize: number;
  focusedProject: number;
}

type CounterAction =
  | { type: "rotate"; rotations: number }
  | { type: "left" }
  | { type: "right" }
  | { type: "resize"; coords: CoordXY[] };
interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}
const shouldDisplay = (index: number, arraySize: number): number | null => {
  if (index === 0) return 0;
  else if (index === 1) return 1;
  else if (index === 4) return -1;
  else return null;
};

const createInitialState = ({ initRotation, projects }: InitParam): State => {
  let projectSize = projects.length;
  const latestProjects = projects.slice(-6).reverse();
  
  let itemData = initialState.map((item, i) => {
    let display = shouldDisplay(i, projects.length);

    return {
      ...item,
      project: latestProjects[getIndex(0, i, projects.length)],
      shouldDisplay: true,
    };
  });

  return {
    rotation: initRotation,
    itemData: itemData,
    projects: projects,
    projectSize: projects.length,
    focusedProject: 0,
  };
};
export const zIndexes = [30, 20, 10, 10, 20];
const d = [0, 1, null, null, -1];
const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "rotate":
      console.log("rotate", action.rotations);
  
      
      let rotatedData: ItemData[] = state.itemData;
    
      rotatedData = rotateArray(rotatedData, action.rotations);
      console.log("EFTER",rotatedData)
      return {
        ...state,
        itemData: rotatedData,
        rotation: state.rotation + action.rotations,
        
      };
    case "resize":
      let updatedItems: ItemData[] = new Array(...state.itemData);

      updatedItems = updatedItems.map((item, index) => {
        // console.log(item)
        // console.log(action.coords[index])
        let project;
        let display = shouldDisplay(index, state.projectSize);

        project =
          display !== null
            ? state.projects[
                getIndex(state.focusedProject, display, state.projectSize)
              ]
            : null;

        return {
          ...item,
          zIndex: zIndexes[index],
          x: action.coords[index].x,
          y: action.coords[index].y,
          project: project,
        };
      });
      if (state.rotation !== 0)
        return {
          ...state,
          itemData: rotateArray(updatedItems, state.rotation),
        };
      else return { ...state, itemData: updatedItems };
    default:
      throw new Error("Unknown action");
  }
};

const initialState: ItemData[] = [
  {
    zIndex: 30,
    x: null,
    y: null,
    project: null,
    shouldDisplay: false,
  },
  {
    zIndex: 20,
    x: null,
    y: null,
    project: null,
    shouldDisplay: false,
  },
  {
    zIndex: 10,
    x: null,
    y: null,
    project: null,
    shouldDisplay: false,
  },
  {
    zIndex: 10,
    x: null,
    y: null,
    project: null,
    shouldDisplay: false,
  },
  {
    zIndex: 20,
    x: null,
    y: null,
    project: null,
    shouldDisplay: false,
  },
];
export default ProjectListWrapper;
