import { SINGLEROTATIONDURATION } from "@/app/utils/constants";
import { corner1, corner5, frame0, frame1, frame2, frame3, frame4, frame5, path0, path1, path2, path3, path4, path5 } from "../paths";
import { BackgroundProps, Dimensions, BoxFrame, ItemData, RotationPair, Point, Ellipse, Rotation, RotationData, ItemStyle } from "../utils/sharedInterfaces";
import { InitParam, State, VariantState } from "./coordReducer";
import { ConstantColorFactor } from "three";
import { getIndex } from "@/app/utils/helperfunction";


const calcEllipsePoints = (centerX: number, centerY: number, a: number, b: number, n: number) => {

  return Array.from({ length: n }, (_, i) => {
    const angle = -(2 * Math.PI / n) * i + (Math.PI / 2);


    const x = centerX + a * Math.cos(angle);
    const y = centerY + b * Math.sin(angle);
    return { x, y };
  });
}



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
): Rotation[] => {

  const centerX = wrapperDim.width / 2 - childDim.width / 2;
  const centerY = wrapperDim.height / 2 - childDim.height / 1.8;
  const offsetX2 = childDim.width;
  const rightX = centerX + offsetX2;
  const leftX = centerX - offsetX2;

  const offsetY3 = 0;

  const a = (rightX - leftX) / 2; // halva bredden
  const b = (centerY - offsetY3) * 0.3; // mindre för plattare ellips

  const ellipsis: Ellipse = {
    x0: centerX,
    y0: centerY,
    a: Math.round(a),
    b: Math.round(b),

  };


  const points = calcEllipsePoints(centerX, centerY, a, b, 6)
  const points2 = calcEllipsePoints(centerX, centerY, a, b, 18)



  const rotationList: Rotation[] = points.map((point, i) => {
    const startIndex = i * 3

    const rightTrack = [point, ...points2.slice(startIndex, startIndex + 3), points[getIndex(i, 1, points.length)]]
    const leftTrack = [point, ...points2.slice(17, 17 - 3), points[getIndex(i, -1, points.length)]]

    console.log(leftTrack)
    return {
      current: point,
      moveRight: rightTrack,
      moveLeft: leftTrack,
      enter: points[0]
    }

  })


  /**
   * @NOTE add Another ellipse to make movement shadow beneath 
   */

  return rotationList
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
  const angle: RotationPair[] = [
    {
      rotateX: 0,
      rotateY: 0
    },
    {
      rotateX: -10,
      rotateY: 60
    },
    {
      rotateX: -10,
      rotateY: 120
    },
    {
      rotateX: 0,
      rotateY: 180
    },
    {
      rotateX: -10,
      rotateY: 240
    },
    {
      rotateX: -10,
      rotateY: 300
    }
  ]
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
    rotTimeout: true,
    angle: angle,
    ellipse: {
      x0: 0,
      y0: 0,
      a: 0,
      b: 0,

    }


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




  const rotationList: Rotation[] = points.map((point, i) => {
    const startIndex = i * 3

    const rightTrack = [point, ...points2.slice(startIndex, startIndex + 3), points[getIndex(i, 1, points.length)]]
    const leftTrack = [point, ...points2.slice(17, 17 - 3), points[getIndex(i, -1, points.length)]]

    console.log(leftTrack)
    return {
      current: point,
      moveRight: rightTrack,
      moveLeft: leftTrack,
      enter: points[0]
    }

  })



  let itemData: ItemData[] = zIndexes.map((z, i) => {
    const itmData: ItemData = {
      index: i,

      rotationData: {
        rotation: {
          moveRight: [],
          moveLeft: [],
          current: {
            x: 0,
            y: 0
          },
          enter: {
            x: 0,
            y: 0
          },
        },
        dist2Front: i,
        rotStyle: {
          current: {
            scale: 0,
            visibility: "visible",
            opacity: 0
          },
          moveRight: {
            scale: 0,
            visibility: "visible",
            opacity: 0
          },
          moveLeft: {
            scale: 0,
            visibility: "visible",
            opacity: 0
          },
          enter: {
            scale: 0,
            visibility: "visible",
            opacity: 0
          }
        }
      },

      backgroundProps: backgroundProps[i],


      zIndex: z,

    };
    return itmData;
  });
  return itemData;
};

// ended here 
const rotationsStyles: ItemStyle[] = [
  {
    scale: 1,
    visibility: "visible",
    opacity: 1
  },
  {
    scale: 0.95,
    visibility: "visible",
    opacity: 
  },
  {
    scale: 0.9,
    visibility: "visible",
    opacity: 1
  },
  {
    scale: 0.85,
    visibility: "visible",
    opacity: 1
  },
  {
    scale: 0.9,
    visibility: "visible",
    opacity: 0
  },
  {
    scale: 0.95,
    visibility: "visible",
    opacity: 0
  },
]

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
