import { extendVariants, VariantProps } from "@nextui-org/react";
import { TargetAndTransition } from "framer-motion";

export interface ItemData {
  index: number;
  rotationData: RotationData;
  backgroundProps: BackgroundProps;
  zIndex: number;

  shadow: Rotation

}
export interface Point {
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
  rotation: Rotation;
  dist2Front: number;
  rotStyle: RotationStyle;
}


export interface ItemStyle extends TargetAndTransition {

  scale: number[];
  visibility: "visible" | "hidden";
  opacity: number[];

}


export interface RotationStyle {

  current: ItemStyle;
  moveRight: ItemStyle;
  moveLeft: ItemStyle;
  enter: ItemStyle;
}



export interface Ellipse {
  x0: number; // center point
  y0: number;
  a: number; // half width (Semi-major axis)
  b: number; // half height (semi-minor axis)


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

export interface Rotation {
  current: Point;
  moveRight: Point[];
  moveLeft: Point[];
  enter: Point;
}



export interface Dimensions {
  wrapperDim: DOMRect;
  childDim: DOMRect;
}