import { getIndex, rotateArray } from "@/app/utils/helperfunction";
import ProjectItem from "./ProjectListItem";
import { motion } from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ProjectInterface } from "@/app/utils/interfaces";
import ProjectCard from "./ProjectCard";
import testdata from "../../utils/testdata.json";

export interface ItemData {
  zIndex: number;
  shouldDisplay: boolean;
  x: number | null;
  y: number | null;
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
}

const recalculateDimensions = (wrapperDim: DOMRect, childDim: DOMRect) => {
  const frontX = wrapperDim.width / 2 - childDim.width / 2;
  const frontY = wrapperDim.height / 2 - childDim.height / 3;
  const level2X = childDim.width / 1.2;
  const rightX = frontX + level2X;
  const leftX = frontX - level2X;
  const level2Y = frontY - childDim.height / 3;
  const level3X = childDim.width / 3.1;
  const backRightX = rightX - level3X;
  const backLeftX = leftX + level3X;
  const updatedCoord = [
    { x: frontX, y: frontY },
    { x: rightX, y: level2Y },
    { x: backRightX, y: 0 },
    { x: backLeftX, y: 0 },
    { x: leftX, y: level2Y },
  ];
  return updatedCoord;
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
  let itemData = initialState.map((item, i) => {
    let display = shouldDisplay(i, projects.length);

    return {
      ...item,
      project:
        display !== null
          ? projects[getIndex(0, display, projects.length)]
          : null,
      shouldDisplay: display !== null,
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
      let currSelected = getIndex(
        state.focusedProject,
        action.rotations,
        state.projectSize
      );
      
      let rotatedData: ItemData[] = state.itemData;
      rotatedData = rotatedData.map((item, i) => {
       if(action.rotations === 1){
        if(i == 1){
          return {...item, 
            shouldDisplay: false,
            project: null
          }
        } else if(i === 3){
          return {
            ...item, 
            shouldDisplay: true,
            project: state.projects[getIndex(currSelected, -action.rotations, state.projectSize)]  
          }
        }
      }
        return {...item}
      })
      console.log("innan",rotatedData)
      rotatedData = rotateArray(rotatedData, state.itemData.length);
      console.log("EFTER",rotatedData)
      return {
        ...state,
        itemData: rotatedData,
        rotation: state.rotation + action.rotations,
        focusedProject: currSelected
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
