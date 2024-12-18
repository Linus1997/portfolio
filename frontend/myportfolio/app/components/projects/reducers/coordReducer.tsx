import { rotateArray } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";
import { TargetAndTransition, AnimationDefinition } from "framer-motion";


import { ItemBase, ItemData, Dimensions } from "../utils/sharedInterfaces";
import { enterCoords } from "./setUpReducer";



export const VariantState = Object.freeze({
  INIT: "initial",
  ENTER: "enter",
  ROTATE: "rotate",
  ROTATELEFT: "rotateLeft",
  ROTATERIGHT: "rotateRight",
  STILL: "still",
  GLOW: "glowOn",
  GLOWOFF: "glowOff",
  isMorphLeft: "isMoveLeft",
  isMorphRight: "isMoveRight",
  isStill: "isStill",
});

/**
 * STATE REDUCER HANDLER
 */
export interface State {
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

export type CounterAction =
  | { type: "resetVariant"; definition: AnimationDefinition }
  | { type: "setVariant"; definition: string }
  | { type: "setCount" }
  | { type: "moveLeft" }
  | { type: "moveRight" }
  | { type: "spin"; variant: string }
  | { type: "rotateRight"; variant: string }
  | { type: "resize"; coords: ItemBase[]; dimensions: Dimensions };
export interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}

/**
   
   * @param state
   * @param action
   * @returns
   */
export const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      if (action.definition.toLocaleString() === VariantState.ENTER) {

        if (state.enterCount < 5)
          return { ...state, enterCount: state.enterCount + 1 };
        return {
          ...state,
          isEnterComplete: true,
          enterCount: 0,
          variant: VariantState.STILL,
        };
      } else if (action.definition.toLocaleString() === VariantState.ROTATELEFT) {
        if (state.rotateLeftCount < 5)
          return { ...state, rotateLeftCount: state.rotateLeftCount + 1 };
        return {
          ...state,
          variant: VariantState.STILL,
          rotateLeftCount: 0,
        };
      } else if (action.definition.toLocaleString() === VariantState.ROTATERIGHT) {
        if (state.rotateRightCount < 5)
          return { ...state, rotateRightCount: state.rotateRightCount + 1 };
        return {
          ...state,
          variant: VariantState.STILL,
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
        variant: VariantState.ROTATELEFT,
      };
    case "moveRight":
      return {
        ...state,
        itemData: rotateArray(state.itemData, 1),
        variant: VariantState.ROTATERIGHT,
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
          variant: VariantState.ENTER,
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


