import { SINGLEROTATIONDURATION } from "@/app/utils/constants";
import { corner1, corner5, frame0, frame1, frame2, frame3, frame4, frame5, path0, path1, path2, path3, path4, path5 } from "../paths";
import { BackgroundProps, Dimensions, BoxFrame, ItemBase, ItemData } from "../utils/sharedInterfaces";
import { InitParam, State, VariantState } from "./coordReducer";



/**
 * Calculates and returns the positions (x, y, scale, etc.) for 6 items 
 * based on the given wrapper and child element dimensions.
 *
 * @param wrapperDim - The dimensions of the wrapper DOM element (width, height).
 * @param childDim   - The dimensions of the child DOM element (width, height).
 * @returns An array of 6 ItemBase objects containing position and visibility details.
 */
export const recalculateDimensions = (
  wrapperDim: DOMRect,
  childDim: DOMRect
): ItemBase[] => {
  
  const centerX = Math.round(wrapperDim.width / 2 - childDim.width / 2);
  const centerY = Math.round(wrapperDim.height / 2 - childDim.height / 3);

 
  const offsetX2 = Math.round(childDim.width);
  const offsetY2 = Math.round(centerY - childDim.height / 4.5);
  const rightX = Math.round(centerX + offsetX2);
  const leftX = Math.round(centerX - offsetX2);

 
  const offsetX3 = Math.round(childDim.width / 10);
  const backRightX = Math.round(rightX - offsetX3);
  const backLeftX = Math.round(leftX + offsetX3);
  const offsetY3 = 20;


  return [
    {
      x: centerX,
      y: centerY,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: rightX,
      y: offsetY2,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backRightX,
      y: offsetY3,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: centerX,
      y: 0,
      scale: 0.84, 
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backLeftX,
      y: offsetY3,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: leftX,
      y: offsetY2,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
  ];
};
/**
 * Creates the initial global state for the coordinate management system,
 * defining defaults for animations, item data, and transformations.
 *
 * @param projects - The array of projects to be stored in the state.
 * @returns A fully constructed State object with default values before any interaction or animation.
 */
export const createCoordInitialState = ({ projects }: InitParam): State => {
  const svgScale = 0 / 100;  
  const initialScaleTransform = `scale(${svgScale}, ${svgScale})`;

  const defaultItemData: ItemData[] = initialState();

  return {
    variant: VariantState.INIT,
    stillCount: 0,
    rotateLeftCount: 0,
    rotateRightCount: 0,
    enterCount: 0,
    itemData: defaultItemData,
    projects: projects,
    projectSize: projects.length,
    hasEntered: false,
    isEnterComplete: false,
    dimensions: {
      wrapperDim: { x: 0, y: 0 },
      childDim: { x: 0, y: 0 },
    },
    svgTransform: initialScaleTransform,
    onFocusItemData: defaultItemData[0],
    onFocussvgTransform: initialScaleTransform,
    rotXTimesCount: 0,
    rotDuration: SINGLEROTATIONDURATION,
    rotTimeout: true
  };
};
/**
 * Computes the "enter" animation coordinates for an item based on the difference
 * between the wrapper and child element sizes. Returns an object containing
 * arrays for `x` and `y` positions (used in a Framer Motion animation).
 *
 * @param dimensions - The overall dimensions, including wrapper and child DOMRect.
 * @returns An object with `x` and `y` arrays representing the enter animation offset.
 */
export const enterCoords = (
  dimensions: Dimensions
): { x: number[]; y: number[] } => {
  const { wrapperDim, childDim } = dimensions;
  const deltaX = wrapperDim.x - childDim.x;
  const deltaY = wrapperDim.y - childDim.y;

  return {
    x: [deltaX / 2],
    y: [deltaY / 2],
  };
};


/**
 * Builds an array of ItemData with default zIndex, shape paths, 
 * corner paths, background properties, and initial animation data.
 *
 * @returns An array of 6 ItemData objects, each with default/initial properties.
 */

export const initialState = (): ItemData[] => {
  const zIndexes = [30, 20, 10, 0, 10, 20];
  const shapePaths = [path0, path1, path2, path3, path4, path5];
  const framePaths = [frame0, frame1, frame2, frame3, frame4, frame5]
  const cornerPaths = ["M 0, 0 Z", corner1, corner5, "M 0,0 Z", corner1, corner5]

 

  let itemData: ItemData[] = zIndexes.map((z, i) => {
    const itmData: ItemData = {
      index: i,

      rotationData: {
        itemBase: {
          x: 0,
          y: 0,

          scale: 1,
          visibility: "visible",
          opacity: 1,
        },
        dist2Front: i
      },
      enterData: {
        itemBase: {
          x: [0],
          y: [0],

          scale: [0, 1],
          visibility: "visible",
          opacity: 0.8
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
      shapePath: shapePaths[i],
      zIndex: z,
      framePath: framePaths[i],
      cornerPath: cornerPaths[i]
    };
    return itmData;
  });
  return itemData;
};

/**
 * Provides default background properties (gradientAngle and 3D rotations)
 * for each of the six items in the carousel.
 */
const backgroundProps: BackgroundProps[] = [
  {
    gradientAngle: 0,
    rotationXY: { rotateX: 0, rotateY: 0 },
  },
  {
    gradientAngle: 45,
    rotationXY: { rotateX: 20, rotateY: -40 },
  },
  {
    gradientAngle: -45,
    rotationXY: { rotateX: 20, rotateY: 40 },
  },
  {
    gradientAngle: 180,
    rotationXY: { rotateX: 0, rotateY: 0 },
  },
  {
    gradientAngle: -45,
    rotationXY: { rotateX: 20, rotateY: -40 },
  },
  {
    gradientAngle: -45,
    rotationXY: { rotateX: 20, rotateY: 40 },
  },
];
