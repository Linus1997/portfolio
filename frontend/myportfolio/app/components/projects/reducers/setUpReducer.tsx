import { SINGLEROTATIONDURATION } from "@/app/utils/constants";
import { corner1, corner5, frame0, frame1, frame2, frame3, frame4, frame5, path0, path1, path2, path3, path4, path5 } from "../paths";
import { BackgroundProps, Dimensions, BoxFrame, ItemData, RotationPair, Point, Ellipse, Rotation, RotationData, ItemStyle, RotationStyle } from "../utils/sharedInterfaces";
import { InitParam, State, VariantState } from "./coordReducer";
import { ConstantColorFactor } from "three";
import { getIndex } from "@/app/utils/helperfunction";
import { get } from "http";



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

    },


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




  const rotationStyles: RotationStyle[] = initCurrRotStyles.map((style, i) => {

    const prevIndex = getIndex(i, -1, 6)
    const nextIndex = getIndex(i, 1, 6)
    const nextItemStyle = initCurrRotStyles[nextIndex]
    const prevItemStyle = initCurrRotStyles[prevIndex]
    const nextStyle: ItemStyle = {
      ...nextItemStyle,
      scale: [...style.scale, ...nextItemStyle.scale],
      opacity: [...style.opacity, ... nextItemStyle.opacity]
    }

    const prevStyle: ItemStyle = {
      ...prevItemStyle,
      scale: [...style.scale, ...prevItemStyle.scale],
      opacity: [...style.opacity, ... prevItemStyle.opacity]
    }

    console.log(prevStyle, nextStyle)
    return {
      current: style,
      moveRight: nextStyle,
      moveLeft: prevStyle,
      enter: style
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
          ...rotationStyles[i]
        }
      },

      backgroundProps: backgroundProps[i],


      zIndex: z,
      shadow: {
        current: {
          x: 0,
          y: 0
        },
        moveRight: [],
        moveLeft: [],
        enter: {
          x: 0,
          y: 0
        }
      } 
    };
    return itmData;
  });
  return itemData;
};

// ended here 
const initCurrRotStyles: ItemStyle[] = [
  {
    scale: [1],
    visibility: "visible",
    opacity: [1],
  },
  {
    scale: [0.95],
    visibility: "visible",
    opacity: [0.5],
  },
  {
    scale: [0.9],
    visibility: "visible",
    opacity: [0.5],
  },
  {
    scale: [0.85],
    visibility: "visible",
    opacity: [0.5],
  },
  {
    scale: [0.9],
    visibility: "visible",
    opacity: [0.5],
  },
  {
    scale: [0.95],
    visibility: "visible",
    opacity: [0.5],
  },
];


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
