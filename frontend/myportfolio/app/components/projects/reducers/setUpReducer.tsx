import { path0, path1, path2, path3, path4, path5 } from "../paths";
import { BackgroundProps, Dimensions, Frame, ItemBase, ItemData } from "../utils/sharedInterfaces";
import { InitParam, State, VariantState } from "./coordReducer";


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
export const createCoordInitialState = ({ projects }: InitParam): State => {
  const latestProjects = projects.slice(-6).reverse();

  const state: State = {
    variant: VariantState.INIT,
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
export const enterCoords = (dimensions: Dimensions): { x: number[]; y: number[]; } => {
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
export const initialState = (): ItemData[] => {
  const zIndexes = [30, 20, 10, 0, 10, 20];
  const paths = [path0, path1, path2, path3, path4, path5];
  const frame: Frame[] = [
    {
      top: "6%", left: "0%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
    },

    {
      top: "10%", left: "12.8%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
    },
    {
      top: "10%", left: "0%", right: "10%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
    },
    {
      top: "3%", left: "0%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
    },
    {
      top: "12%", left: "-12.8%", right: "0%",
      borderTopLeftRadius: 2 + "%",
      borderTopRightRadius: 2 + "%",
      borderBottomLeftRadius: 1 + "%",
      borderBottomRightRadius: 1 + "%",
    },
    {
      top: "12%", left: "-12.8%", right: "12.8%",
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
    const itmData: ItemData = {
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
        cardWrapper: {
          ...frame[i],
        },
        frame: {
          ...frame[i]
        }
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
          ...frame[i],
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
    return itmData;
  });
  return itemData;
};

