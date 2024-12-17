import { rotateArray } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";
import { TargetAndTransition, AnimationDefinition } from "framer-motion";

import { Variant } from "../ProjectListWrapper";
import { path0, path1, path5 } from "@/app";

export interface ItemData {
  index: number;
  rotationData: RotationData;
  enterData: EnterAnimationData;
  backgroundProps: BackgroundProps;
  dimension: Dimensions;
  path: string;
  zIndex: number;
  
}
export interface CoordXY {
  x: number;
  y: number;
}

interface BackgroundProps {
  gradientAngle: number;
  front: TargetAndTransition;
}


export interface RotationData {
  itemBase: ItemBase;
  itemWrapper: ItemWrapper;
  projectWrapper: ProjectWrapper;

}

interface EnterAnimationData {
  itemBase: ItemBase;
  itemWrapper: ItemWrapper;
  projectWrapper: ProjectWrapper;
}

export interface ItemBase extends TargetAndTransition {
  x: number[] | number;
  y: number[] | number;
  scale: number[] | number;
  visibility: "visible" | "hidden";
  opacity: number[] | number;
 
  rotateX: number;
  rotateY: number;
}
interface ItemWrapper {
  scale: number | number;
}
interface ProjectWrapper extends TargetAndTransition {}

export interface Dimensions {
  wrapperDim: CoordXY;
  childDim: CoordXY;
}



export const recalculateDimensions = (wrapperDim: DOMRect, childDim: DOMRect) => {
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

  const updatedCoord: ItemBase[] = [
    {
      x: frontX,
      y: frontY,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: rightX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemRightY,
      scale: 0.99,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backRightX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackRightY,
     
      scale: 0.95,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: frontX,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 0.9,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backLeftX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackLeftY,
      scale: 0.95,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: leftX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemLeftY,
      scale: 0.99,
      visibility: "visible",
      opacity: 1,
    },
  ];
  return updatedCoord;
};
/**
 * STATE REDUCER HANDLER
 */
interface State {
  variant: string;
  hasEntered: boolean;
  isEnterComplete: boolean;
  itemData: ItemData[];
  rotateLeftCount: number;
  rotateRightCount: number;
  enterCount: number;
  projects: ProjectInterface[];
  projectSize: number;

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

export const createCoordInitialState = ({ projects }: InitParam): State => {
  const latestProjects = projects.slice(-6).reverse();

  const state: State = {
    variant: Variant.INIT,
    rotateLeftCount: 0,
    rotateRightCount: 0,
    enterCount: 0,
    itemData: initialState(),
    projects: latestProjects,
    projectSize: latestProjects.length,
    hasEntered: false,
    isEnterComplete: false,

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
  return state;
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
export const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      if (action.definition.toLocaleString() === Variant.ENTER) {
       
        if (state.enterCount  < 5)
            return { ...state, enterCount: state.enterCount + 1 };
        return {
          ...state,
          isEnterComplete: true,
          enterCount: 0,
          variant: Variant.STILL,
        };
      } else if (action.definition.toLocaleString() === Variant.ROTATELEFT) {
        if (state.rotateLeftCount < 5)
          return { ...state, rotateLeftCount: state.rotateLeftCount + 1 };
        return {
          ...state,
          variant: Variant.STILL,
          rotateLeftCount: 0,
        };
      } else if (action.definition.toLocaleString() === Variant.ROTATERIGHT) {
        if (state.rotateRightCount  < 5)
          return { ...state, rotateRightCount: state.rotateRightCount + 1 };
        return {
          ...state,
          variant: Variant.STILL,
          rotateRightCount: 0,
        };
      }

      return { ...state };
    case "setVariant":
      return { ...state, variant: action.definition };
    case "moveLeft":
      return {
        ...state,
        itemData: rotateArray(state.itemData, -1),
        variant: Variant.ROTATELEFT,
      };
    case "moveRight":
      return {
        ...state,
        itemData: rotateArray(state.itemData, 1),
        variant: Variant.ROTATERIGHT,
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
  const paths=[path0,path1,path5,path0, path1, path5]
  const projectWrapper: ProjectWrapper[] = [
    { top: "3%", left: "0%", right: "0%", 
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%", },
    { top: "8%", left: "12.8%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
     },
    { top: "10%", left: "0%", right: "10%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
     },
    { top: "10%", left: "0%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
     },
    { top: "12%", left: "-12.8%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
     },
    {top: "12%", left: "-12.8%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
     },
  ];
  // borderTopLeftRadius: 2 + "%",
  // borderTopRightRadius: 2 + "%",
  // borderBottomLeftRadius: 1 + "%",
  // borderBottomRightRadius: 1 + "%",
  // top: 12 + "%",
  // left: 12.8 + "%",
  // bottom: 0 + "%",
  // right: 0 + "%",

  const backgroundProps: BackgroundProps[] = [
    {
      //   1
      gradientAngle: 0,
      front: {
        top: "9%",
        left: "0%",
        right: "8%",
        bottom: "0%",
        borderRadius: "1%",
      },
    },
    {
      //   2
      gradientAngle: 45,
      front: {
        top: "9%",
        left: "0%",
        right: "8%",
        bottom: "0%",
        borderRadius: "1%",
      },
    },
    {
      // 3
      gradientAngle: -45,
      front: {
        top: "9%",
        left: "0%",
        right: "8%",
        bottom: "0%",
        borderRadius: "1%",
      },
    },
    {
      // 4
      gradientAngle: 175,
      front: {
        top: "9%",
        left: "0%",
        right: "8%",
        bottom: "0%",
        borderRadius: "1%",
      },
    },
    {
      // 5
      gradientAngle: 45,
      front: {
        top: "9%",
        left: "0%",
        right: "8%",
        bottom: "0%",
        borderRadius: "1%",
      },
    },
    {
      //6
      gradientAngle: -45,
      front: {    
        top: "9%",
        left: "0%",
        right: "8%",
        bottom: "0%",
        borderRadius: "1%",
      },
    },
  ];

  let itemData: ItemData[] = zIndexes.map((z, i) => {
   return {
      index: i,

      rotationData: {
        itemBase: {
          x: 0,
          y: 0,
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
      },
      enterData: {
        itemBase: {
          x: [0],
          y: [0],

          scale: [0, 1],
          visibility: "visible",
          opacity: i === 0 ? [0, 0.8] : 0,
          
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
      path: paths[i],
      zIndex: z
    };

  });
  return itemData;
};
