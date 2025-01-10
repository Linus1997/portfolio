import { Variants, TargetAndTransition, delay } from "framer-motion";
import { frame0, path0 } from "../paths";
import { ItemData } from "../utils/sharedInterfaces";
import { DURATIONLISTITEMANIMATION } from "@/app/utils/constants";


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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  still: (i: ItemData): TargetAndTransition => ({
    ...i.rotationData.itemBase,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    
    transition: { duration: DURATIONLISTITEMANIMATION },
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
      duration: DURATIONLISTITEMANIMATION
    }
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: DURATIONLISTITEMANIMATION
    }
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: DURATIONLISTITEMANIMATION
    }
  }),
  still: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: DURATIONLISTITEMANIMATION
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
      duration: DURATIONLISTITEMANIMATION
    }
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: DURATIONLISTITEMANIMATION
    }
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
      duration: DURATIONLISTITEMANIMATION
    }
  }),
  still: (path: string): TargetAndTransition => ({
    d: path
    ,

    transition: {
     duration: DURATIONLISTITEMANIMATION
    }
  }),


};
export const CornerPathVariants: Variants = {

  still: (): TargetAndTransition => ({
    pathLength: 1,
    strokeDasharray: "5, 20, 22 ",
    stroke: "#ffffff",
    strokeWidth: 0.1,
    fill:"#000000",
    fillOpacity:0.2,
    transition: {
     duration: 1, 
     strokeDasharray: { duration: 1, ease: "easeInOut" },
     strokeDashoffset: { duration: 2, ease: "easeInOut" },
     fill:{ delay: 1},
     fillOpacity:{delay:1, duration: 2, ease: "easeIn", from: 0 }
    }
  }),


};

export const BackgroundVariants: Variants = {
  
  
  enter: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,
  
    
    transition: { duration: DURATIONLISTITEMANIMATION },

   
  }),
  still: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,

    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8 )`,
  
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${i.backgroundProps.gradientAngle}deg,  #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,
    

    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  
};



export const FrontFrameVariants: Variants = {
  enter: (i: ItemData): TargetAndTransition => ({
    //paddingTop: "10%",

    ...i.backgroundProps.rotationXY,
 
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  still: (i: ItemData): TargetAndTransition => ({

    ...i.backgroundProps.rotationXY,
   
  
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  rotateLeft: (i: ItemData): TargetAndTransition => ({
    ...i.backgroundProps.rotationXY,
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
  rotateRight: (i: ItemData): TargetAndTransition => ({
    ...i.backgroundProps.rotationXY,
    transition: { duration: DURATIONLISTITEMANIMATION },
  }),
};





