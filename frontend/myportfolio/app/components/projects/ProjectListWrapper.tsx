import { getIndex, rotateArray } from "@/app/utils/helperfunction";
import ProjectItem from "./ProjectListItem";
import {
  AnimationDefinition,
  delay,
  LayoutGroup,
  motion,
  MotionAdvancedProps,
  MotionConfigContext,
  MotionConfigProps,
  MotionProps,
  MotionStyle,
  motionValue,
  transform,
  useAnimate,
  useMotionValue,
  VariantLabels,
  Variants,
} from "framer-motion";
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
  rotationData: RotationData;
  enterAnimation: EnterAnimation;
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

export interface RotationData extends CoordXY {
  zIndex: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  opacity: number;
}
interface EnterAnimation {
  seqX: number[];
  seqY: number[];
  seqRotY: number[];
  seqRotX: number[];
  seqZindex: number[];
}
interface Dimensions {
  wrapperDim: CoordXY;
  childDim: CoordXY;
}

const Variant = Object.freeze({
  INIT: "initial",
  ENTER: "enter",
  ROTATE: "rotate",
});

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
  let itemRightY = -45;
  let itemBackRightY = 45;
  let itemBackLeftY = -45;
  let itemLeftY = 45;
  const nonSelectedOpacity = 0.75;
  const updatedCoord: RotationData[] = [
    {
      x: frontX,
      y: frontY,
      rotateX: 0,
      rotateY: 0,
      zIndex: 40,
      scale: 1,
      opacity: 1,
    },
    {
      x: rightX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemRightY,
      zIndex: 30,
      scale: 0.99,
      opacity: nonSelectedOpacity,
    },
    {
      x: backRightX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackRightY,
      zIndex: 20,
      scale: 0.95,
      opacity: nonSelectedOpacity,
    },
    {
      x: frontX,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      zIndex: 0,
      scale: 0.9,
      opacity: nonSelectedOpacity,
    },
    {
      x: backLeftX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackLeftY,
      zIndex: 20,
      scale: 0.95,
      opacity: nonSelectedOpacity,
    },
    {
      x: leftX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemLeftY,
      zIndex: 30,
      scale: 0.99,
      opacity: nonSelectedOpacity,
    },
  ];
  return updatedCoord;
};

/**
 * TODO: remove initial defaultposition
 */

export const duration: number = 0.4;
const itemVariants: Variants = {
  initial: (i: ItemData) => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (i: ItemData) => ({
    x: i.enterAnimation.seqX,
    y: i.enterAnimation.seqY,
    scale: [0, 1],
    visibility: "visible",
    opacity: 0.5,
    zIndex: i.rotationData.zIndex,
    transition: {
      duration: 1,
    },
  }),
  rotate: (i: ItemData) => ({
    x: i.rotationData.x,
    y: i.rotationData.y,
    scale: i.rotationData.scale,
    visibility: "visible",
    background: "var",
    opacity: i.rotationData.opacity,
    zIndex: i.rotationData.zIndex,
    rotateX: i.rotationData.rotateX,
    rotateY: i.rotationData.rotateY,
    transition: { duration: 0.4 },
  }),
};

const container: Variants = {
  show: {
    opacity: 1,

    transition: {
      when: "beforeChildren",
      delayChildren: 2,
      staggerChildren: 0.2,
    },
  },
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

  useLayoutEffect(() => {
    const onDimChange = () => {
      if (wrapperRef.current && itemRef.current && itemRef.current.length > 0) {
        //dispatch({type: "setVariant", definition: "initial"});
        const wrapperDim = wrapperRef.current.getBoundingClientRect();
        const childDim = itemRef.current[0].getBoundingClientRect();
        const updatedCoord = recalculateDimensions(wrapperDim, childDim);

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

    window.addEventListener("resize", onDimChange);
    return () => {
      window.removeEventListener("resize", onDimChange);
    };
  }, []);
  const reset = (definition: AnimationDefinition) => {
    let def: string = definition.toString();
    if (def === Variant.ENTER)
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

      <div className="relative  w-[63em] h-96 py-4">
        <motion.ul
          ref={wrapperRef}
          className="absolute w-full h-full "
          variants={container}
          animate="show"
          initial="show"
      
        >
          {[0, 1, 2, 3, 4, 5].map((item, i) => (
            <ProjectItem
              index={item}
              ref={(el) => {
                if (el) itemRef.current[i] = el;
              }}
              var={state.variant}
              onAnimationComplete={(e) => reset(e)}
              coordXY={state.itemData[i]}
              isEnterComplete={state.isEnterComplete}
              className={"project w-[14em] h-[14rem] self-stretch rounded-xl "}
              //className={rotatedCoord? rotatedCoord[i].placement : coord? coord[i].placement : "invisible"}
              //newCoord={rotatedCoord? rotatedCoord[i] : null}
              key={i}
              initial="initial"
              animate={state.variant}
              variants={itemVariants}
            >
              <motion.div
                className={"w-[95%] h-[95%]  z-50 rounded-xl bg-white "}
              >
                <ProjectCard project={state.projects[i]} />
              </motion.div>
            </ProjectItem>
          ))}
        </motion.ul>
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
  count: number;

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
  | { type: "resize"; coords: RotationData[]; dimensions: Dimensions };
interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}

const createInitialState = ({ projects }: InitParam): State => {
  const latestProjects = projects.slice(-6).reverse();

  return {
    variant: Variant.INIT,
    count: 0,
    itemData: initialState(),
    projects: latestProjects,
    projectSize: latestProjects.length,
    hasEntered: false,
    isEnterComplete: false,
    focusedProject: 0,
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

const initEnterAnimation = (dimensions: Dimensions): EnterAnimation => {
  let wrapperDim = dimensions.wrapperDim;
  let childDim = dimensions.childDim;
  let x = wrapperDim.x - childDim.x;
  let y = wrapperDim.y - childDim.y;
  let enterAnimation: EnterAnimation = {
    seqX: [x / 2],
    seqY: [y / 2],
    seqRotY: [],
    seqRotX: [],
    seqZindex: [],
  };
  console.log(enterAnimation);
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
      if (action.definition.toLocaleString() === Variant.ENTER) {
        let count = state.count + 1;
        if (count < 6) return { ...state, count: count };
        else
          return {
            ...state,
            isEnterComplete: true,
            variant: "rotate",
            count: 0,
          };
      }
      return { ...state };
    case "setVariant":
      return { ...state, variant: action.definition };
    case "moveLeft":
      let moveLeft = rotateArray(state.itemData, -1);
      return {
        ...state,
        itemData: moveLeft,
      };
    case "moveRight":
      let moveRight = rotateArray(state.itemData, 1);
      return {
        ...state,
        itemData: moveRight,
      };
    case "resize":
      console.log("test");
      if (!state.hasEntered) {
        const enterAnimation = initEnterAnimation(action.dimensions);

        let updatedData: ItemData[] = action.coords.map((item, i, arr) => {
          return {
            rotationData: {
              ...item,
            },
            enterAnimation: enterAnimation,
          };
        });
        return {
          ...state,
          variant: Variant.ENTER,
          itemData: updatedData,
          hasEntered: true,
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
  let arr: ItemData[] = zIndexes.map((z, i, arr) => {
    return {
      rotationData: {
        x: 0,
        y: 0,
        zIndex: zIndexes[i],
        rotateX: 0,
        rotateY: 0,
        scale: 0,
        opacity: 0,
      },
      enterAnimation: {
        seqX: [0],
        seqY: [0],
        seqRotY: [],
        seqRotX: [],
        seqZindex: [],
      },
    };
  });
  return arr;
};
export default ProjectListWrapper;
