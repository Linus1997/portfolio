import { getIndex, rotateArray } from "@/app/utils/helperfunction";
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
  rotXTimesCount: number;
  projects: ProjectInterface[];
  projectSize: number;
  svgTransform: string;
  dimensions: Dimensions;
  onFocusItemData: ItemData;
  onFocussvgTransform: string;
  rotDuration: number;
  rotTimeout: boolean;
}

export type CounterAction =
  | { type: "resetVariant"; definition: string }
  | { type: "setVariant"; definition: string }
  | { type: "setCount" }
  | { type: "rotateLeft" }
  | { type: "moveRight" }
  | { type: "rotateRight" }
  | { type: "moveXTimes"; dist2Front: number }
  | { type: "resize"; coords: ItemBase[]; dimensions: Dimensions };

export interface InitParam {

  projects: ProjectInterface[];
}

/**
 * Main reducer for carousel state management.
 * Determines the next state based on action types such as 
 * rotating items (left/right), resetting animation variants, or resizing.
 *
 * @param state - The current State of the animation/coordinate system.
 * @param action - The dispatched action containing the type and any relevant payload.
 * @returns A new State object reflecting the updates based on the action.
 */

const MAX_ANIMATIONS = 29;
export const carouselReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      return handleResetVariant(state, action.definition);
    case "setVariant":
      return { ...state, variant: action.definition };
    case "rotateLeft":
      return {
        ...state,
        itemData: rotateArray(state.itemData, -1),
        variant: VariantState.ROTATELEFT,
        rotTimeout: true
      };
    case "rotateRight":

      return {
        ...state,
        itemData: rotateArray(state.itemData, 1),
        variant: VariantState.ROTATERIGHT,
        rotTimeout: true
      };
    case "moveXTimes":
      return handleXRotations(state, action.dist2Front)
    case "resize":
      if (!state.hasEntered) {
        const enterAnimation = enterCoords(action.dimensions);
        const svgScale = action.dimensions.childDim.x / 100;
        const onFocusScale = action.dimensions.wrapperDim.x;
        const updatedData = action.coords.map((item, i) => ({
          ...state.itemData[i],
          dimension: action.dimensions,
          rotationData: {
            ...state.itemData[i].rotationData,
            itemBase: { ...item },
          },
          enterData: {
            ...state.itemData[i].enterData,
            itemBase: {
              ...state.itemData[i].enterData.itemBase,
              ...enterAnimation,
            },
          },
        }));

        const onFocusItemData: ItemData = updatedData[0]

        return {
          ...state,
          variant: VariantState.ENTER,
          itemData: updatedData,
          hasEntered: true,
          dimensions: action.dimensions,
          svgTransform: `scale(${svgScale}, ${svgScale})`
        };
      } else {
        return { ...state };
      }
    default:
      throw new Error("Unknown action");
  }
};


/**
 * Handles resetting the count and optionally switching the variant 
 * for different animation states (STILL, ROTATELEFT, ROTATERIGHT, ENTER).
 * With other words a way of syncing the carousel items to avoid strange behaviour. 
 * @param state - The current State object.
 * @param variantName - A string representing the variant to be reset.
 * @returns A new State object with updated counts and/or variant.
 */


function handleResetVariant(state: State, variantName: string): State {

  switch (variantName) {
    case VariantState.STILL:
      if (state.stillCount < MAX_ANIMATIONS) {
        return { ...state, stillCount: state.stillCount + 1 };
      }
      return { ...state, stillCount: 0, rotTimeout:false };

    case VariantState.ROTATELEFT:
      if (state.rotateLeftCount < MAX_ANIMATIONS) {
        return { ...state, rotateLeftCount: state.rotateLeftCount + 1 };
      }
      if (state.rotXTimesCount !== 0)
        return {
          ...state,
          itemData: rotateArray(state.itemData, -1),
          rotXTimesCount: state.rotXTimesCount - 1,
          rotateLeftCount: 0,
          
        }
      return {
        ...state,
        variant: VariantState.STILL,
        rotateLeftCount: 0,
        
      };

    case VariantState.ROTATERIGHT:
      if (state.rotateRightCount < MAX_ANIMATIONS) {
        return { ...state, rotateRightCount: state.rotateRightCount + 1 };
      }
      if (state.rotXTimesCount !== 0)
        return {
          ...state,
          itemData: rotateArray(state.itemData, 1),
          rotXTimesCount: state.rotXTimesCount + 1,
          rotateRightCount: 0
        }
      return {
        ...state,
        variant: VariantState.STILL,
        rotateRightCount: 0,
      };

    case VariantState.ENTER:
      if (state.enterCount < MAX_ANIMATIONS) {
        return { ...state, enterCount: state.enterCount + 1 };
      }
      return {
        ...state,
        isEnterComplete: true,
        enterCount: 0,
        variant: VariantState.STILL,
      };

    default:
      return state;
  }
}



const handleXRotations = (state: State, dist2Front: number): State => {
  if (state.rotXTimesCount !== 0 || dist2Front === 0 || state.rotTimeout) return { ...state }
  const duration = state.rotDuration / 2
  if (dist2Front <= 3) {
    return {
      ...state,
      itemData: rotateArray(state.itemData, -1),
      rotXTimesCount: dist2Front - 1,
      variant: VariantState.ROTATELEFT,
      rotDuration: duration,
      rotTimeout: true
    }
  } else if (dist2Front > 3) {

    return {
      ...state,
      itemData: rotateArray(state.itemData, 1),
      rotXTimesCount: dist2Front - 5,
      variant: VariantState.ROTATERIGHT,
      rotDuration: duration,
      rotTimeout: true

    }
  }
  return { ...state }

}
