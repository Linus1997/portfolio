import { rotateArray } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";
import { TargetAndTransition, AnimationDefinition } from "framer-motion";


import { ItemBase, ItemData, Dimensions } from "../utils/sharedInterfaces";
import { enterCoords } from "./setUpReducer";



export const VariantState = Object.freeze({
  INIT: "initial",
  ENTER: "enter",
  ROTATELEFT: "rotateLeft",
  ROTATERIGHT: "rotateRight",
  STILL: "still",
  ISSTILL: "isStill",
});
export const checkData: string[] = [VariantState.ENTER, VariantState.ROTATELEFT, VariantState.ROTATERIGHT, VariantState.STILL]
/**
 * STATE REDUCER HANDLER
 */
export interface State {
  variant: string;
  hasEntered: boolean;
  isEnterComplete: boolean;
  itemData: ItemData[];
  stillCount: number;
  rotateLeftCount: number;
  rotateRightCount: number;
  enterCount: number;
  projects: ProjectInterface[];
  projectSize: number;
  svgTransform: string;
  dimensions: Dimensions;
}

export type CounterAction =
  | { type: "resetVariant"; definition: string }
  | { type: "setVariant"; definition: string }
  | { type: "setCount" }
  | { type: "moveLeft" }
  | { type: "moveRight" }
  | { type: "spin"; variant: string }
  | { type: "rotateRight"; variant: string }
  | { type: "resize"; coords: ItemBase[]; dimensions: Dimensions };
export interface InitParam {
  
  projects: ProjectInterface[];
}

/**
   
   * @param state
   * @param action
   * @returns
   */

const nrAnimations = 29;
export const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      if (action.definition === VariantState.STILL) {

        if (state.stillCount < nrAnimations)
          return { ...state, stillCount: state.stillCount + 1 };
        return {
          ...state,
          enterCount: 0,
          
        };
      } else if (action.definition === VariantState.ROTATELEFT) {
        if (state.rotateLeftCount < nrAnimations)
          return { ...state, rotateLeftCount: state.rotateLeftCount + 1 };
        return {
          ...state,
          variant: VariantState.STILL,
          rotateLeftCount: 0,
        };
      } else if (action.definition === VariantState.ROTATERIGHT) {
        if (state.rotateRightCount < nrAnimations)
          return { ...state, rotateRightCount: state.rotateRightCount + 1 };
        return {
          ...state,
          variant: VariantState.STILL,
          rotateRightCount: 0,
        };
      } else if (action.definition === VariantState.ENTER) {
        
        if (state.enterCount < nrAnimations)
          return { ...state, enterCount: state.enterCount + 1 };
        return {
          ...state,
          isEnterComplete: true,
          enterCount: 0,
          variant: VariantState.STILL,
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
        let svgScale = (action.dimensions.childDim.x / 100);
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
          svgTransform:`scale(${svgScale}, ${svgScale})` 
        };
      } else {
        return { ...state };
      }
    default:
      throw new Error("Unknown action");
  }
};


