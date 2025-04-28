import { Variants, TargetAndTransition, delay, hover } from "framer-motion";
import { frame0, path0 } from "../paths";
import { Point, Dimensions, ItemData, RotationPair } from "../utils/sharedInterfaces";
import { SINGLEROTATIONDURATION } from "@/app/utils/constants";


const DEFAULT_POSITION = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const circleMovement = ()=> {
  
}

/**
 * Motion variants for the base list item. 
 * Controls the initial, enter, rotation, and 'still' states.
 */
export const BaseItemVariants: Variants = {
  initial: (): TargetAndTransition => ({
    ...DEFAULT_POSITION,
    visibility: "hidden",
    opacity: 0,
  }),
  enter: ({ data, rotPair }: { data: ItemData, rotPair: RotationPair }): TargetAndTransition => ({
    ...DEFAULT_POSITION,
    ...data.rotationData.rotation.rotation.enter,
    ...data.rotationData.rotation.style,
    ...rotPair,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateLeft: ({ data, rotPair }: { data: ItemData, rotPair: RotationPair }): TargetAndTransition => ({
    ...DEFAULT_POSITION,
    x: data.rotationData.rotation.rotation.moveLeft.map(p => p.x),
    y: data.rotationData.rotation.rotation.moveLeft.map(p => p.y),
     
    ...data.rotationData.rotation.style,
    ...rotPair,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateRight: ({ data, rotPair, dim }: { data: ItemData, rotPair: RotationPair, dim: Dimensions }): TargetAndTransition => ({
    ...DEFAULT_POSITION,
    x: data.rotationData.rotation.rotation.moveRight.map(p => p.x),
    y: data.rotationData.rotation.rotation.moveRight.map(p => p.y),
    ...data.rotationData.rotation.style,
    
    ...rotPair,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  still: ({ data, rotPair }: { data: ItemData, rotPair: RotationPair }): TargetAndTransition => ({
    ...DEFAULT_POSITION,
    ...data.rotationData.rotation.rotation.current,
    ...data.rotationData.rotation.style,
    ...rotPair,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  
};
const backgroundImages = [
  `linear-gradient(${45}deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0))`,

  `linear-gradient(${45}deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4) 100%, rgba(255, 255, 255, 0.1))`,
];



/**
 * Variation definitions for background transitions, updating the
 * background gradient based on the current animation state.
 */
export const BackgroundVariants: Variants = {
  enter: (item: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${item.backgroundProps.gradientAngle}deg, #666466, #727072, #7d7c7f, #89898c, #959699, #9d9fa3, #a5a9ae, #acb3b8, #b0bdc2, #b4c6cb, #b9d0d2, #bedad8)`,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  still: (item: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${item.backgroundProps.gradientAngle}deg, #111827, #2f426a, #4662a0)`,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateLeft: (item: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${item.backgroundProps.gradientAngle}deg, #111827, #2f426a, #4662a0)`,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateRight: (item: ItemData): TargetAndTransition => ({
    backgroundImage: `linear-gradient(${item.backgroundProps.gradientAngle}deg, #111827, #2f426a, #4662a0)`,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
};



/**
 * Variation definitions for a 3D “front frame” transform,
 * applying rotateX/rotateY values from the item’s backgroundProps.
 */
export const FrontFrameVariants: Variants = {
  enter: (item: ItemData): TargetAndTransition => ({
    // ...item.backgroundProps.rotationXY,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  still: (item: ItemData): TargetAndTransition => ({
    // ...item.backgroundProps.rotationXY,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateLeft: (item: ItemData): TargetAndTransition => ({
    // ...item.backgroundProps.rotationXY,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateRight: (item: ItemData): TargetAndTransition => ({
    // ...item.backgroundProps.rotationXY,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
};





// ----------------------------------------------------------------------------

/**
 * Variation definitions for the primary SVG shape path,
 * controlling visibility, the initial 'd' path, and transition timings.
 */
export const shapePathVariant: Variants = {
  initial: (): TargetAndTransition => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (): TargetAndTransition => ({
    d: path0,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  still: (path: string): TargetAndTransition => ({
    d: path,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
};




/**
 * Variation definitions for the item's frame path,
 * controlling visibility, and transitions across each animation state.
 */
export const framePathVariant: Variants = {
  initial: (): TargetAndTransition => ({
    visibility: "hidden",
    opacity: 0,
  }),
  enter: (): TargetAndTransition => ({
    d: frame0,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateLeft: (path: string): TargetAndTransition => ({
    d: path,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  rotateRight: (path: string): TargetAndTransition => ({
    d: path,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
  still: (path: string): TargetAndTransition => ({
    d: path,
    transition: { duration: SINGLEROTATIONDURATION },
  }),
};

/**
 * Variation definitions for corner lines or shapes, controlling stroke,
 * fill, and other visual properties in the 'still' state.
 */
export const CornerPathVariants: Variants = {

  still: (): TargetAndTransition => ({
    pathLength: 1,
    strokeDasharray: "5, 20, 22",
    stroke: "#ffffff",
    strokeWidth: 0.1,
    fill: "#000000",
    fillOpacity: 0.2,
    transition: {
      duration: 1,
      strokeDasharray: { duration: 1, ease: "easeInOut" },
      strokeDashoffset: { duration: 2, ease: "easeInOut" },
      fill: { delay: 1 },
      fillOpacity: { delay: 1, duration: 2, ease: "easeIn" },
    },
  }),
};