import { interpolate, Interpolator } from "flubber";
import { outerPaths } from "../paths";
import { getIndex, rotateArray } from "@/app/utils/helperfunction";
import { Variant } from "../ProjectListWrapper";

/**
 * STATE REDUCER HANDLER
 */
interface State {
  isStill: boolean;
  toStillComplete: boolean;
  isMorphLeft: boolean;
  isMorphRight: boolean;
  interpolatedPaths: InterpolatedPath[];
  isStillCount: number;
  morphLeftCount: number;
  morphRightCount: number;
}
export interface InterpolatedPath {
  current: string;
  next: Interpolator;
  prev: Interpolator;
}
type CounterAction =
  | { type: "resetMorph"; definition: string }
  | { type: "morphLeft" }
  | { type: "morphRight" };
interface InitParam {}

export const createMorphInitialState = (): State => {
  const interpolatedPaths: InterpolatedPath[] = outerPaths.map(
    (shape, index) => {
      const nextIndex = getIndex(index, 1, outerPaths.length);
      const prevIndex = getIndex(index, -1, outerPaths.length);
      console.log(`${index}:` ,prevIndex, nextIndex)
      return {
        current: shape,
        next: interpolate(shape, outerPaths[nextIndex], {
          maxSegmentLength: 10,
        }),
        prev: interpolate(shape, outerPaths[prevIndex], {
          maxSegmentLength: 10,
        }),
      };
    }
  );
  const state: State = {
    interpolatedPaths: interpolatedPaths,
    isStill: true,
    isMorphLeft: false,
    isMorphRight: false,
    toStillComplete: false,
    isStillCount: 0,
    morphLeftCount: 0,
    morphRightCount: 0,
  };
  return state;
};

/**
 
 * @param state
 * @param action
 * @returns
 */
export const morphReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetMorph":
      if (action.definition === Variant.isMorphLeft) {
       
        if (state.morphLeftCount < 5)
          return { ...state, morphLeftCount: state.morphLeftCount + 1 };
        return {
          ...state,
          interpolatedPaths: rotateArray(state.interpolatedPaths, -1),
          morphLeftCount: 0,
          isStill: true,
          isMorphLeft: false,
          toStillComplete: false,
        };
      } else if (action.definition === Variant.isMorphRight) {
        
        if (state.morphRightCount < 5)
          return { ...state, morphRightCount: state.morphRightCount + 1 };
        return {
          ...state,
          interpolatedPaths: rotateArray(state.interpolatedPaths, 1),
          morphRightCount: 0,
          isStill: true,
          isMorphRight: false,
          toStillComplete: false,
        };
      } else if (action.definition === Variant.isStill) {
      
        if (state.isStillCount < 5)
          return { ...state, isStillCount: state.isStillCount + 1 };
        return {
          ...state,
          isStillCount: 0,
          toStillComplete: true,
        };
      }
      return { ...state };
    case "morphLeft":
      return {
        ...state,
        isStill: false,
        isMorphLeft: true,
      };
    case "morphRight":
      return {
        ...state,
        isStill: false,
        isMorphRight: true,
      };

    default:
      throw new Error("Unknown action");
  }
};
