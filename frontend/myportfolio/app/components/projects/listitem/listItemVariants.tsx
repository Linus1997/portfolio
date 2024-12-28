import { Variants, TargetAndTransition } from "framer-motion";
import { frame0, path0 } from "../paths";
import { ItemData } from "../utils/sharedInterfaces";

const duration: number = 0.4;
export const BaseItemVariants: Variants = {
  initial: (): TargetAndTransition => ({
    visibility: "hidden",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,

  }),
  enter: (i: ItemData): TargetAndTransition => ({
    ...i.enterData.itemBase,
    transition: { duration: duration },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,

    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,

    transition: { duration: duration },
  }),
  still: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,

    transition: { duration: duration },
  }),
};
const backgroundImages = [
  `linear-gradient(${45}deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0))`,

  `linear-gradient(${45}deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4) 100%, rgba(255, 255, 255, 0.1))`,
];

export const shapePathVariant: Variants = {
  initial: (path: string): TargetAndTransition => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (path: string): TargetAndTransition => ({
    d: path0
    ,
    transition: {
      duration: duration
    }
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),
  still: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),


};

export const framePathVariant: Variants = {
  initial: (path: string): TargetAndTransition => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (path: string): TargetAndTransition => ({
    d: frame0
    ,
    transition: {
      duration: duration
    }
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),
  still: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: duration
    }
  }),


};
export const BackgroundVariants: Variants = {
  
  
  enter: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,
    //...i.backgroundProps.rotationXY,
    transition: { duration: duration },
  }),
  still: (i: ItemData): TargetAndTransition => ({
    //backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #515252, #1B3541 )`,
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,
   // ...i.backgroundProps.rotationXY,
    transition: { duration: duration },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8 )`,
    //...i.backgroundProps.rotationXY,
    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,
    //...i.backgroundProps.rotationXY,
    transition: { duration: duration },
  }),
  
};



export const FrontFrameVariants: Variants = {
  enter: (i: ItemData): TargetAndTransition => ({
    //paddingTop: "10%",

    ...i.backgroundProps.rotationXY,
 
    transition: { duration: duration },
  }),
  still: (i: ItemData): TargetAndTransition => ({

    ...i.backgroundProps.rotationXY,
   
  
    transition: { duration: duration },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.backgroundProps.rotationXY,
    transition: { duration: duration },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.backgroundProps.rotationXY,
    transition: { duration: duration },
  }),
};





