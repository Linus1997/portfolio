import { getIndex, rotateArray } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";


import { ItemData, Dimensions, RotationPair, Ellipse as Ellipse, Rotation } from "../utils/sharedInterfaces";




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
  onFocusItemData: ItemData;
  onFocussvgTransform: string;
  rotDuration: number;
  rotTimeout: boolean;
  angle: RotationPair[]
  ellipse: Ellipse;
}

export type CounterAction =
  | { type: "resetVariant"; definition: string }
  | { type: "setVariant"; definition: string }
  | { type: "setCount" }
  | { type: "rotateLeft" }
  | { type: "moveRight" }
  | { type: "rotateRight" }
  | { type: "moveXTimes"; dist2Front: number }
  | { type: "resize";  dimensions: Dimensions };

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

const MAX_ANIMATIONS = 5;
export const carouselReducer = (state: State, action: CounterAction): State => {

  switch (action.type) {
    case "resetVariant":

      return handleResetVariant(state, action.definition);
    case "setVariant":
      return { ...state, variant: action.definition };
    case "rotateLeft":
      return {
        ...state,
        variant: VariantState.ROTATELEFT,
        rotTimeout: true,
        angle: editAngle(state.angle, -1)
      };
    case "rotateRight":

      return {
        ...state,
        variant: VariantState.ROTATERIGHT,
        rotTimeout: true,
        angle: editAngle(state.angle, 1)
      };
    case "moveXTimes":
      return handleXRotations(state, action.dist2Front)
    case "resize":
      if (!state.hasEntered) {
        const itemRotation = recalculateDimensions({
         dimensions: action.dimensions,
          count: 6,
          detailCount: 18
        });
        const shadowRotation = recalculateDimensions({
          dimensions: action.dimensions,
           count: 6,
           detailCount: 18,
           centerYOffset: 250,
           scaleX: 0.5,
           scaleY: 0.4
         });

         
        const updatedData: ItemData[] = itemRotation.map((item, i) => {


          return {
            ...state.itemData[i],
            dimension: action.dimensions,
            rotationData: {
              ...state.itemData[i].rotationData,
              rotation: {
                ...item,

              },
              rotStyle: {
                ...state.itemData[i].rotationData.rotStyle,

                enter: {
                  ...state.itemData[i].rotationData.rotStyle.enter,
                  opacity: [0, 0.1, 0.2, 1]
                }
              }
            },
            shadow: shadowRotation[i]

          }
        });



        return {
          ...state,
          variant: VariantState.ENTER,
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
      return { ...state, stillCount: 0, rotTimeout: false };

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
        itemData: rotateArray(state.itemData, -1),
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
        itemData: rotateArray(state.itemData, 1),
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





/**
 * Calculates and returns the positions (x, y, scale, etc.) for 6 items 
 * based on the given wrapper and child element dimensions.
 *
 * @param wrapperDim - The dimensions of the wrapper DOM element (width, height).
 * @param childDim   - The dimensions of the child DOM element (width, height).
 * @returns An array of 6 ItemBase objects containing position and visibility details.
 */
interface EllipseConfig {
  dimensions: Dimensions
  count: number;      // Number of items
  detailCount: number; // For the smooth rotation path
  centerYOffset?: number; // Extra vertical offset
  scaleX?: number;
  scaleY?: number;
}
export const recalculateDimensions = (
config: EllipseConfig
): Rotation[] => {
  
  const {
    dimensions,
    count,
    detailCount,
    centerYOffset = 0,
    scaleX = 1,
    scaleY = 1,
  } = config;
  
  const centerX = dimensions.wrapperDim.width / 2 - dimensions.childDim.width / 2;
  const centerY = dimensions.wrapperDim.height / 2 - dimensions.childDim.height / 1.8 + centerYOffset;

  const offsetX2 = dimensions.childDim.width;
  const rightX = centerX + offsetX2;
  const leftX = centerX - offsetX2;

  const offsetY3 = 0;
  const a = ((rightX - leftX) / 2) * scaleX; // X radius
  const b = (centerY - offsetY3) * 0.3 * scaleY; // Y radius

  const basePoints = calcEllipsePoints(centerX, centerY, a, b, count);
  const detailPoints = calcEllipsePoints(centerX, centerY, a, b, detailCount);

  return basePoints.map((point, i) => {
    const startIndex = i * Math.floor(detailCount / count);
    return {
      current: point,
      moveRight: [
        point,
        ...detailPoints.slice(startIndex, startIndex + 3),
        basePoints[getIndex(i, 1, basePoints.length)],
      ],
      moveLeft: [
        point,
        ...detailPoints.slice(detailPoints.length - 1, detailPoints.length - 4),
        basePoints[getIndex(i, -1, basePoints.length)],
      ],
      enter: basePoints[0],
    };
  });
};


/** 
  
const itemShadowPoints = calcEllipsePoints(centerX, centerY+200, a/2, b, 6)
const itemShadowPoints2 = calcEllipsePoints(centerX, centerY, a/2, b, 18)

const shadwoRotation: Rotation[] = itemShadowPoints.map((point, i) => {
  const startIndex = i * 3
  
  const rightTrack = [point, ...itemShadowPoints2.slice(startIndex, startIndex + 3), itemShadowPoints[getIndex(i, 1, carouselItemPoints.length)]]
  const leftTrack = [point, ...itemShadowPoints2.slice(17, 17 - 3), itemShadowPoints[getIndex(i, -1, carouselItemPoints.length)]]
  
  
  return {
    current: point,
    moveRight: rightTrack,
    moveLeft: leftTrack,
    enter: carouselItemPoints[0]
  }
  
})
*/
const calcEllipsePoints = (centerX: number, centerY: number, a: number, b: number, n: number) => {

  return Array.from({ length: n }, (_, i) => {
    const angle = -(2 * Math.PI / n) * i + (Math.PI / 2);


    const x = centerX + a * Math.cos(angle);
    const y = centerY + b * Math.sin(angle);
    return { x, y };
  });
}


const editAngle = (angles: RotationPair[], direction: number): RotationPair[] => {
  const normalize = (rotPair: RotationPair): RotationPair => {
    const newRotY = rotPair.rotateY + 60 * direction
    const modAngle = newRotY % 360
    if (modAngle === 180 || modAngle === 0)
      return {
        rotateX: 0,
        rotateY: newRotY
      }
    return {
      rotateX: -10,
      rotateY: newRotY
    }
  }

  return angles.map((rotPair, i) => {


    return {
      ...normalize(rotPair)
    }
  })
}
