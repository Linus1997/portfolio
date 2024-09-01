"use client";
import { rotateArray } from "@/app/utils/helperfunction";
import ProjectItem from "./ProjectListItem";
import {
  AnimationDefinition,
  HTMLMotionProps,
  motion,
  MotionConfigProps,
  MotionProps,
  MotionStyle,
  MotionTransform,
  ScrapeMotionValuesFromProps,
  TargetAndTransition,
  VariantLabels,
  Variants,
} from "framer-motion";
import { CSSProperties, useLayoutEffect, useReducer, useRef } from "react";
import { ProjectInterface } from "@/app/utils/interfaces";
import { useFlubber } from "./test files/item6";
import { MotionValue } from "framer-motion/dom";
import { ElementPair, innerPaths, outerPaths, pairElements } from "./paths";
import { interpolate, Interpolator } from "flubber";

interface WrapperProps {
  rotations: number;
  direction: number;
  projects: ProjectInterface[];
}

export interface ItemData {
  index: number;
  rotationData: RotationData;
  enterData: EnterAnimationData;
  backgroundProps: BackgroundProps;
  dimension: Dimensions;
}
export interface CoordXY {
  x: number;
  y: number;
}

interface BackgroundProps {
  gradientAngle: number;
  front: TargetAndTransition;
}
interface CustomMotionStyle extends MotionStyle {}

export interface RotationData {
  itemBase: ItemBase;
  itemWrapper: ItemWrapper;
  projectWrapper: ProjectWrapper;
  backGlow: GlowShadow;
  middleGlow: GlowShadow;
}

interface EnterAnimationData {
  itemBase: ItemBase;
  itemWrapper: ItemWrapper;
  projectWrapper: ProjectWrapper;
}

interface ItemBase extends TargetAndTransition {
  x: number[] | number;
  y: number[] | number;
  scale: number[] | number;
  visibility: "visible" | "hidden";
  opacity: number[] | number;
  zIndex: number;
  rotateX: number;
  rotateY: number;
}
interface ItemWrapper {
  scale: number | number;
}
interface ProjectWrapper extends TargetAndTransition {}
interface GlowShadow {
  inset: string;
}
interface Dimensions {
  wrapperDim: CoordXY;
  childDim: CoordXY;
  
}

const Variant = Object.freeze({
  INIT: "initial",
  ENTER: "enter",
  ROTATE: "rotate",
  ROTATELEFT: "rotateLeft",
  ROTATERIGHT: "rotateRight",
  STILL: "still",
  GLOW: "glowOn",
  GLOWOFF: "glowOff",
});

export const pathEnder =
  "M 0,6.2500002 V 25 50 97.5 a 2.5,2.5 45 0 0 2.5,2.5 h 95 A 2.5,2.5 135 0 0 100,97.5 V 50 25 6.2500002 A 3.0177686,3.0177686 67.500011 0 0 99.116117,4.1161164 L 95.883887,0.88388381 A 3.0177653,3.0177653 22.500011 0 0 93.750004,0 H 6.2500002 A 3.0177669,3.0177669 157.5 0 0 4.1161167,0.88388348 L 0.88388348,4.1161167 A 3.017767,3.017767 112.5 0 0 0,6.2500002 Z";

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

  let rotX2 = 0;
  let rotXBack3 = 0;
  let itemRightY = 0;
  let itemBackRightY = 0;
  let itemBackLeftY = 0;
  let itemLeftY = 0;

  const updatedCoord: ItemBase[] = [
    {
      x: frontX,
      y: frontY,
      rotateX: 0,
      rotateY: 0,
      zIndex: 40,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: rightX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemRightY,
      zIndex: 30,
      scale: 0.99,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backRightX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackRightY,
      zIndex: 20,
      scale: 0.95,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: frontX,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      zIndex: 0,
      scale: 0.9,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backLeftX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackLeftY,
      zIndex: 20,
      scale: 0.95,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: leftX,
      y: level2Y,
      rotateX: 0,
      rotateY: 0,
      zIndex: 30,
      scale: 0.9,
      visibility: "visible",
      opacity: 1,
    },
  ];
  return updatedCoord;
};

const ProjectListWrapper = ({ rotations, projects }: WrapperProps) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<Array<HTMLLIElement>>([]);

  const [state, dispatch] = useReducer(
    coordReducer,
    { initRotation: rotations, projects: projects },
    createInitialState
  );

  useLayoutEffect(() => {
    const onDimChange = () => {
      if (wrapperRef.current && itemRef.current && itemRef.current.length > 0) {
        //dispatch({type: "setVariant", definition: "initial"});
        const wrapperDim = wrapperRef.current.getBoundingClientRect();
        const childDim = itemRef.current[0].getBoundingClientRect();
        const updatedCoord = recalculateDimensions(wrapperDim, childDim);
        // setPropertyStyle(childDim);
        dispatch({
          type: "resize",
          coords: updatedCoord,
          dimensions: {
            wrapperDim: { x: wrapperDim.width, y: wrapperDim.height },
            childDim: { x: childDim.width, y: childDim.height },
          },
        });
      }
    };
    onDimChange();
  }, []);
  const reset = (definition: AnimationDefinition) => {
    dispatch({ type: "resetVariant", definition: definition });
  };

  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center bg-gray-900 ">
      <button
        className={`w-28 `}
        onClick={() => dispatch({ type: "moveRight" })}
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
      <div>
        <div className="relative  w-[63em] h-96 py-4">
          <motion.ul ref={wrapperRef} className="absolute w-full h-full ">
            {[0, 1, 2, 3, 4, 5].map((item, i) => (
              <ProjectItem
                key={i}
                ref={(el) => {
                  if (el) itemRef.current[i] = el;
                } }
                index={i}
               
                glowState={state.glowState}
                onAnimationComplete={(e) => reset(e)}
                itemData={state.itemData[i]}
                isEnterComplete={state.isEnterComplete}
                className={"absolute w-[14em] h-[14rem] self-stretch  "}
                initial="initial"
                animate={state.variant}
                dimension={state.dimensions.childDim}
                project={state.projects[i]} currentPath={state.currentPaths[i]} nextPath={state.nextPaths[i]}              />
            ))}
          </motion.ul>
        </div>
      </div>
      <button className={`w-28`} onClick={() => dispatch({ type: "moveLeft" })}>
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

  hasEntered: boolean;
  isEnterComplete: boolean;
  itemData: ItemData[];
  currentPaths: ElementPair<string, string>[];
  nextPaths: ElementPair<string, string>[];
  
  count: number;
  glowState: string;
  projects: ProjectInterface[];
  projectSize: number;
  focusedProject: number;
  dimensions: Dimensions;
}

type CounterAction =
  | { type: "resetVariant"; definition: AnimationDefinition }
  | { type: "setVariant"; definition: string }
  | { type: "setCount" }
  | { type: "moveLeft" }
  | { type: "moveRight" }
  | { type: "spin"; variant: string }
  | { type: "rotateRight"; variant: string }
  | { type: "resize"; coords: ItemBase[]; dimensions: Dimensions };
interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}

const createInitialState = ({ projects }: InitParam): State => {
  const latestProjects = projects.slice(-6).reverse();
  
  const paths = pairElements<string, string>(outerPaths, innerPaths);
 
  return {
    variant: Variant.INIT,
    count: 0,
    itemData: initialState(),
    currentPaths: paths,
    nextPaths: paths,
   
    projects: latestProjects,
    projectSize: latestProjects.length,
    hasEntered: false,
    isEnterComplete: false,
    focusedProject: 0,
    glowState: Variant.GLOWOFF,
    dimensions: {
      wrapperDim: {
        x: 0,
        y: 0,
      },
      childDim: {
        x: 0,
        y: 0,
      },
    },
  };
};

const enterCoords = (dimensions: Dimensions): { x: number[]; y: number[] } => {
  let wrapperDim = dimensions.wrapperDim;
  let childDim = dimensions.childDim;
  let x = wrapperDim.x - childDim.x;
  let y = wrapperDim.y - childDim.y;
  let enterAnimation = {
    x: [x / 2],
    y: [y / 2],
  };

  return enterAnimation;
};
/**
 
 * @param state
 * @param action
 * @returns
 */
const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      let count = state.count + 1;
      if (count < 6) return { ...state, count: count };
      if (action.definition.toLocaleString() === Variant.ENTER) {
        let itemData: ItemData[] = state.itemData.map((item, i) => {
          const itemData: ItemData = {
            ...item,
          };
          return itemData;
        });
        return {
          ...state,
          itemData: itemData,
          isEnterComplete: true,
          variant: Variant.STILL,
          count: 0,
        };
      }
      if (action.definition.toLocaleString() === Variant.ROTATELEFT) {
        let itemData: ItemData[] = state.itemData.map((item, i) => {
          const itemData: ItemData = {
            ...item,
            
          };
          return itemData;
        });
        return {
          ...state,
          variant: Variant.STILL,
          currentPaths: rotateArray(state.currentPaths, -1),
          glowState: Variant.GLOWOFF,
        };
      }
      if (action.definition.toLocaleString() === Variant.ROTATERIGHT) {
        let itemData: ItemData[] = state.itemData.map((item, i) => {
          const itemData: ItemData = {
            ...item,
          };
          return itemData;
        });
        return {
          ...state,
          variant: Variant.STILL,
          currentPaths: rotateArray(state.currentPaths, 1),
          glowState: Variant.GLOWOFF,
        };
      }
      return { ...state };
    case "setVariant":
      return { ...state, variant: action.definition };
    case "moveLeft":
      let nextPaths = rotateArray(state.nextPaths, -1);
      let moveLeft = rotateArray(state.itemData, -1);

      return {
        ...state,
        itemData: moveLeft,
        nextPaths: nextPaths,
        glowState: Variant.GLOW,
        
      };
    case "moveRight":
      let nextPathsRight = rotateArray(state.nextPaths, 1);
      let moveRight = rotateArray(state.itemData, 1);
  
      return {
        ...state,
        itemData: moveRight,
        nextPaths: nextPathsRight,
       
        glowState: Variant.GLOW,
      };
    case "resize":
      if (!state.hasEntered) {
        const enterAnimation = enterCoords(action.dimensions);

        let updatedData: ItemData[] = action.coords.map((item, i) => {
          const itemData: ItemData = {
            ...state.itemData[i],
            dimension: action.dimensions,
            rotationData: {
              ...state.itemData[i].rotationData,
              itemBase: {
                ...item,
              },
              itemWrapper: {
                scale: 1,
              },
            },
            enterData: {
              ...state.itemData[i].enterData,
              itemBase: {
                ...state.itemData[i].enterData.itemBase,
                ...enterAnimation,
              },
            },
          };
          return itemData;
        });
        return {
          ...state,
          variant: Variant.ENTER,
          itemData: updatedData,
          hasEntered: true,
          dimensions: action.dimensions,
        };
      } else {
        return { ...state };
      }
    default:
      throw new Error("Unknown action");
  }
};

const initialState = (): ItemData[] => {
  const zIndexes = [30, 20, 10, 0, 10, 20];
  const projectWrapper: ProjectWrapper[] = [
    { top: "10%", paddingLeft: "0%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "10%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "0%", paddingRight: "10%" },
    { top: "10%", paddingLeft: "0%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "10%", paddingRight: "0%" },
    {},
  ];

  const glowInset = [
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "0.75rem",
    "0.5rem",
    "0.25rem",
  ];
  const backgroundProps: BackgroundProps[] = [
    {
      //   1
      gradientAngle: 0,
      front: {
        top: 5,
        paddingLeft: "0%",
        paddingRight: "0%",
        borderRadius: "0%",
      },
    },
    {
      //   2
      gradientAngle: 45,
      front: {
        top: 8,
        paddingLeft: "8%",
        paddingRight: "0%",
        borderRadius: "1%",
      },
    },
    {
      // 3
      gradientAngle: -45,
      front: {
        top: "9%",
        paddingRight: "8%",
        paddingLeft: "0%",
        borderRadius: "0%",
      },
    },
    {
      // 4
      gradientAngle: 175,
      front: {
        top: "8%",
        paddingLeft: "0%",
        paddingRight: "0%",
        borderRadius: "0%",
      },
    },
    {
      // 5
      gradientAngle: 45,
      front: {
        top: "9%",
        paddingRight: "0%",
        paddingLeft: "8%",
        borderRadius: "1%",
      },
    },
    {
      //6
      gradientAngle: -45,
      front: {},
    },
  ];

  let arr: ItemData[] = zIndexes.map((z, i) => {
    const iData: ItemData = {
      index: i,

      rotationData: {
        itemBase: {
          x: 0,
          y: 0,
          zIndex: zIndexes[i],
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          visibility: "visible",
          opacity: 1,
        },
        itemWrapper: {
          scale: 1,
        },
        projectWrapper: {
          ...projectWrapper[i],
        },
        backGlow: {
          inset: glowInset[i],
        },
        middleGlow: { inset: glowInset[i] },
      },
      enterData: {
        itemBase: {
          x: [0],
          y: [0],

          scale: [0, 1],
          visibility: "visible",
          opacity: i === 0 ? [0, 0.8] : 0,
          zIndex: 0,
          rotateX: 0,
          rotateY: 0,
        },
        itemWrapper: {
          scale: 1,
        },
        projectWrapper: {
          ...projectWrapper[i],
        },
      },
      backgroundProps: backgroundProps[i],
      dimension: {
        wrapperDim: {
          x: 0,
          y: 0,
        },
        childDim: {
          x: 0,
          y: 0,
        },
      },
    };
    return iData;
  });
  return arr;
};

export default ProjectListWrapper;
