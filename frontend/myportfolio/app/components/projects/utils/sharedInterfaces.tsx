import { TargetAndTransition } from "framer-motion";

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
  export interface RotationPair {
    rotateX: number;
    rotateY: number;
  }
  export interface BackgroundProps {
    gradientAngle: number;
    rotationXY: RotationPair;
    
  }
  
  
  export interface RotationData {
    itemBase: ItemBase;
    frontFrame: BoxFrame;
    contentWrapper: BoxFrame;
  }
  
  
  export interface EnterAnimationData {
    itemBase: ItemBase;
    frontFrame: BoxFrame;
    contentWrapper: BoxFrame;
  }
  
  export interface ItemBase {
    x: number[] | number;
    y: number[] | number;
    scale: number[] | number;
    visibility: "visible" | "hidden";
    opacity: number[] | number;
  

  }

  export interface BoxFrame {
    top: string;
    left: string;
    bottom: string;
    right: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
  }
  
  
  
  
  export interface Dimensions {
    wrapperDim: CoordXY;
    childDim: CoordXY;
  }