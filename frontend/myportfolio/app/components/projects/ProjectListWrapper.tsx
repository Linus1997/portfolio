import { getIndex, rotateArray } from "@/app/utils/helperfunction";
import ProjectItem from "./ProjectListItem";
import { AnimationDefinition, LayoutGroup, motion } from "framer-motion";
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
  
  
  let rotY2 = 40;
  let rotX2 = 20;
  let rotXBack3 = 10;
  let rotYBack3 = -40;

  const updatedCoord: CoordXY[] = [
    {
      x: frontX, y: frontY, rotateX: 0, rotateY: 0,
      z: 40
    },
    {
      x: rightX, y: level2Y, rotateX: rotX2, rotateY: -rotY2,
      z: 30
    },
    {
      x: backRightX, y: 0, rotateX: rotXBack3, rotateY: -rotYBack3,
      z: 20
    },
    {
      x: frontX, y: 0, rotateX: 0, rotateY: 0,
      z: 0
    },
    {
      x: backLeftX, y: 0, rotateX: rotXBack3, rotateY: rotYBack3,
      z: 20
    },
    {
      x: leftX, y: level2Y, rotateX: rotX2, rotateY: rotY2,
      z: 30
    },
  ];
  return updatedCoord;
};

const event = new Event("build");
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

const duration: number = 0.4;
const itemVariants = {
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

    transition: { duration: duration },
  }),
  right: (i: AnimationCoord) => ({
    x: i.right.x,
    y: i.right.y,
   
    zIndex: i.right.zIndex,
    rotateX: i.right.rotateX,
    rotateY: i.right.rotateX,
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
    const timeOut = setTimeout(() => {}, 100);
    return () => clearTimeout(timeOut);
  }, [state]);

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
  const reset = (definition: AnimationDefinition) => {
    dispatch({ type: "resetVariant", definition: definition });
  };
  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center bg-teal-400 ">
      <button
        className={`w-28 `}
        onClick={() => dispatch({ type: "spin", variant: "right" })}
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
      
      <div className="relative flex content-center justify-center w-[63em] h-96 py-4">
        <motion.ul ref={wrapperRef} 
        
        className="absolute  w-full h-full  ">
          {[0, 1, 2, 3, 4, 5].map((item, i) => (
            <ProjectItem
              index={item}
              ref={(el) => {
                if (el) itemRef.current[i] = el;
              }}
              var={state.variant}
              onAnimationComplete={(definition) => reset(definition)}
              animationCoord={state.itemData[i].animationCoord}
              callback={reset}
              className={"absolute w-[14em] h-[14rem] self-stretch  "}
              project={state.itemData[i].project}
              
              //className={rotatedCoord? rotatedCoord[i].placement : coord? coord[i].placement : "invisible"}
              //newCoord={rotatedCoord? rotatedCoord[i] : null}
              key={i}
              animate={state.variant}
              variants={itemVariants}
            ></ProjectItem>
          ))}
        </motion.ul>
      </div>
      <button
        className={`w-28`}
        onClick={() => dispatch({ type: "spin", variant: "left" })}
      >
        <svg
          className=" w-full h-full stroke-slate-400"
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

/**
 * STATE REDUCER HANDLER
 */
interface State {
  variant: string;

  itemData: ItemData[];
  count: number;
  completed: boolean;
  projects: ProjectInterface[];
  projectSize: number;
  focusedProject: number;
}

type CounterAction =
  | { type: "resetVariant"; definition: AnimationDefinition }
  | { type: "setCount" }
  | { type: "spin"; variant: string }
  | { type: "rotateRight"; variant: string }
  | { type: "resize"; coords: CoordXY[] };
interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}
const shouldDisplay = (index: number, arraySize: number): number | null => {
  if (index === 0) return 0;
  else if (index === 1) return 1;
  else if (index === 5) return -1;
  else return null;
};

const createInitialState = ({ projects }: InitParam): State => {
  let projectSize = projects.length;

  let itemData: ItemData[] = initialState().map((item, i, arr) => {
    let display = shouldDisplay(i, 5);
    let project =
      display !== null ? projects[getIndex(0, display, projectSize)] : null;
    return {
      animationCoord: item,
      project: project,
    };
  });
  return {
    variant: "initial",
    count: 0,
    completed: false,
    itemData: itemData,

    projects: projects,
    projectSize: projects.length,
    focusedProject: 0,
  };
};

export const zIndexes = [30, 20, 10, 0, 10, 20];

/**
 * FIXA SÅ endast animation, ingen rotation.
 * @param state
 * @param action
 * @returns
 */
const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      const variantDef = action.definition.toLocaleString(); 
      if ( variantDef !== "left" && variantDef !== "right") return { ...state };
      let count = state.count + 1;
      if (count < 5) return { ...state, count: count };
      let newValue = getIndex(state.focusedProject, 1, state.projectSize);
      let a = state.itemData.map((item, i, arr) => {
        let display = shouldDisplay(i, 5);

        return {
          ...item,
          project:
            display !== null
              ? state.projects[getIndex(newValue, display, state.projectSize)]
              : null,
        };
      });
      return {
        ...state,
        focusedProject: newValue,
        itemData: a,
        variant: "initial",
        count: 0,
        completed: true,
      };

    case "setCount":
      let newCount = state.count + 1;
      console.log(newCount);
      return {
        ...state,
        count: newCount,
        completed: newCount === state.itemData.length ? true : false,
      };
    case "spin":
      return { ...state, variant: action.variant };
    case "rotateRight":
      let rightRotData: ItemData[] = rotateArray(state.itemData, 1);
      return { ...state, itemData: rightRotData };
    case "resize":
      console.log("test")
      let updatedData: ItemData[] = action.coords.map((item, i, arr) => {
        let leftI: number = getIndex(i, -1, arr.length);
        let left: CoordXY = arr[leftI];
        let rightI: number = getIndex(i, 1, arr.length);
        let right: CoordXY = arr[rightI];
        let display = shouldDisplay(i, state.projectSize);

        let project =
          display !== null
            ? state.projects[
                getIndex(state.focusedProject, display, state.projectSize)
              ]
            : null;
        return {
          animationCoord: {
            initial: {
              x: item.x,
              y: item.y,
              rotateX: item.rotateX,
              rotateY: item.rotateY,
              zIndex: zIndexes[i],
            },
            left: {
              x: left.x,
              y: left.y,
              rotateX: left.rotateX,
              rotateY: left.rotateY,
              zIndex: zIndexes[leftI],
            },
            right: {
              x: right.x,
              y: right.y,
              rotateX: right.rotateX,
              rotateY: right.rotateY,
              zIndex: zIndexes[rightI],
            },
          },
          project: project,
        };
      });
      return { ...state, itemData: updatedData };
    default:
      throw new Error("Unknown action");
  }
};

const initialState = (): AnimationCoord[] => {
  let arr: AnimationCoord[] = zIndexes.map((z, i, arr) => {
    let left: number = arr[getIndex(i, -1, arr.length)];
    let right: number = arr[getIndex(i, 1, arr.length)];
    return {
      initial: {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        zIndex: z,
      },
      left: {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        zIndex: left,
      },
      right: {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        zIndex: right,
      },
    };
  });
  return arr;
};
export default ProjectListWrapper;
