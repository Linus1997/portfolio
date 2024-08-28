import { rotateArray } from "@/app/utils/helperfunction";
import ProjectItem from "./ProjectListItem";
import { AnimationDefinition, motion, Variants } from "framer-motion";
import { useLayoutEffect, useReducer, useRef } from "react";
import { ProjectInterface } from "@/app/utils/interfaces";

interface WrapperProps {
  rotations: number;
  direction: number;
  projects: ProjectInterface[];
}

export interface ItemData {
  rotationData: RotationData;
  enterData: EnterAnimationData;
  backgroundProps: BackgroundProps;
}
export interface CoordXY {
  x: number;
  y: number;
}

interface BackgroundProps {
  gradientAngle: number;
  front: BackgroundData;
}

interface BackgroundData {
  top: number;
  paddingLeft: number;
  paddingRight: number;
  borderRadius: number;
}

export interface RotationData {
  itemBase: ItemBase;
  itemWrapper: ItemWrapper;
  projectWrapper: ProjectWrapper;
  backGlow: GlowShadow;
  middleGlow: GlowShadow;
}

interface EnterAnimationData {
  itemBase: ItemBase;
  itemWrapper: ItemWrapper;
  projectWrapper: ProjectWrapper;
}

interface ItemBase {
  x: number[] | number;
  y: number[] | number;
  scale: number[] | number;
  visibility: "visible" | "hidden";
  opacity: number[] | number;
  zIndex: number;
  rotateX: number;
  rotateY: number;
}
interface ItemWrapper {
  scale: number | number;
  clipPath: string;
}
interface ProjectWrapper {
  top: string;
  paddingLeft: string;
  paddingRight: string;
}
interface GlowShadow {
  inset: string;
}
interface Dimensions {
  wrapperDim: CoordXY;
  childDim: CoordXY;
}

const Variant = Object.freeze({
  INIT: "initial",
  ENTER: "enter",
  ROTATE: "rotate",
  GLOW: "glowOn",
  GLOWOFF: "glowOff",
});

const polygons = [
  "polygon(49.613% -0.135%,49.613% -0.135%,45.383% -0.14%,40.96% -0.143%,36.451% -0.144%,31.966% -0.143%,27.613% -0.141%,23.501% -0.138%,19.74% -0.135%,16.437% -0.133%,13.702% -0.131%,11.644% -0.13%,11.644% -0.13%,11.361% -0.116%,11.061% -0.074%,10.751% -0.008%,10.437% 0.082%,10.123% 0.192%,9.817% 0.32%,9.524% 0.465%,9.249% 0.623%,9% 0.793%,8.781% 0.973%,2.161% 6.992%,2.161% 6.992%,1.766% 7.384%,1.407% 7.804%,1.086% 8.25%,0.804% 8.72%,0.562% 9.21%,0.361% 9.719%,0.203% 10.243%,0.089% 10.781%,0.019% 11.329%,-0.004% 11.886%,-0.004% 96.905%,-0.004% 96.905%,0.005% 97.136%,0.032% 97.365%,0.077% 97.589%,0.139% 97.809%,0.218% 98.023%,0.314% 98.231%,0.426% 98.43%,0.553% 98.621%,0.696% 98.802%,0.854% 98.973%,0.854% 98.973%,1.024% 99.131%,1.206% 99.273%,1.397% 99.401%,1.596% 99.512%,1.804% 99.608%,2.018% 99.687%,2.239% 99.749%,2.464% 99.794%,2.694% 99.821%,2.926% 99.831%,97.07% 99.831%,97.07% 99.831%,97.302% 99.821%,97.531% 99.794%,97.756% 99.749%,97.976% 99.687%,98.19% 99.608%,98.398% 99.512%,98.598% 99.401%,98.789% 99.273%,98.97% 99.131%,99.141% 98.973%,99.141% 98.973%,99.298% 98.802%,99.441% 98.621%,99.569% 98.43%,99.68% 98.231%,99.776% 98.023%,99.855% 97.809%,99.917% 97.59%,99.962% 97.365%,99.989% 97.137%,99.999% 96.905%,99.999% 11.885%,99.999% 11.885%,99.975% 11.329%,99.906% 10.781%,99.791% 10.243%,99.633% 9.719%,99.433% 9.21%,99.191% 8.719%,98.909% 8.249%,98.588% 7.803%,98.229% 7.382%,97.834% 6.99%,91.214% 0.972%,91.214% 0.972%,90.995% 0.793%,90.745% 0.622%,90.471% 0.463%,90.178% 0.318%,89.871% 0.189%,89.558% 0.079%,89.243% -0.011%,88.933% -0.078%,88.634% -0.12%,88.351% -0.135%,88.351% -0.135%,84.275% -0.133%,80.454% -0.13%,76.814% -0.128%,73.285% -0.125%,69.794% -0.123%,66.268% -0.122%,62.636% -0.122%,58.826% -0.124%,54.765% -0.128%,50.382% -0.135%,50.382% -0.135%,50.315% -0.135%,50.241% -0.135%,50.162% -0.135%,50.081% -0.135%,49.997% -0.135%,49.914% -0.135%,49.832% -0.135%,49.754% -0.135%,49.68% -0.135%,49.613% -0.135%)",
  "polygon( 54.291% -0.121%,9.561% -0.121%,9.561% -0.121%,8.01% 0.005%,6.539% 0.367%,5.167% 0.947%,3.915% 1.724%,2.801% 2.679%,1.845% 3.793%,1.067% 5.045%,0.487% 6.417%,0.125% 7.887%,0% 9.438%,0% 49.965%,0% 82.218%,0% 82.218%,0.016% 82.758%,0.063% 83.294%,0.142% 83.824%,0.251% 84.348%,0.391% 84.864%,0.561% 85.37%,0.76% 85.867%,0.988% 86.351%,1.246% 86.822%,1.531% 87.278%,8.476% 97.7%,8.476% 97.7%,8.782% 98.114%,9.125% 98.491%,9.5% 98.83%,9.904% 99.129%,10.335% 99.387%,10.788% 99.602%,11.262% 99.772%,11.752% 99.895%,12.255% 99.97%,12.769% 99.994%,43.752% 99.94%,100.072% 100%,100.072% 17.659%,100.072% 17.659%,100.057% 17.12%,100.009% 16.585%,99.931% 16.055%,99.822% 15.531%,99.682% 15.016%,99.513% 14.509%,99.313% 14.013%,99.085% 13.529%,98.828% 13.058%,98.542% 12.602%,91.596% 2.177%,91.596% 2.177%,91.29% 1.765%,90.948% 1.388%,90.573% 1.049%,90.169% 0.75%,89.739% 0.492%,89.285% 0.277%,88.812% 0.106%,88.321% -0.018%,87.818% -0.093%,87.305% -0.119% )",
  "polygon( 54.291% -0.121%,95.264% -0.119%,96.045% -0.056%,96.785% 0.126%,97.475% 0.418%,98.105% 0.808%,98.665% 1.289%,99.146% 1.849%,99.537% 2.479%,99.828% 3.168%,100.011% 3.908%,100.073% 4.687%,100.073% 4.687%,100.073% 95.194%,100.058% 95.574%,100.014% 95.949%,99.94% 96.318%,99.838% 96.679%,99.708% 97.031%,99.551% 97.372%,99.367% 97.699%,99.158% 98.013%,98.924% 98.311%,98.665% 98.591%,98.665% 98.591%,98.385% 98.849%,98.088% 99.083%,97.774% 99.292%,97.446% 99.474%,97.105% 99.631%,96.753% 99.76%,96.391% 99.862%,96.021% 99.935%,95.645% 99.98%,95.264% 99.995%,95.264% 99.995%,43.752% 99.94%,0% 100%,0% 49.967%,0% 12.879%,0.026% 12.316%,0.102% 11.763%,0.227% 11.222%,0.4% 10.697%,0.618% 10.19%,0.881% 9.706%,1.187% 9.245%,1.534% 8.813%,1.921% 8.411%,2.347% 8.044%,2.347% 8.044%,10.424% 1.685%,10.89% 1.343%,11.375% 1.033%,11.879% 0.758%,12.399% 0.518%,12.933% 0.313%,13.48% 0.144%,14.037% 0.011%,14.603% -0.084%,15.177% -0.141%,15.755% -0.159%,15.755% -0.159% )",
  "polygon(49.613% -0.135%,49.613% -0.135%,45.383% -0.14%,40.96% -0.143%,36.451% -0.144%,31.966% -0.143%,27.613% -0.141%,23.501% -0.138%,19.74% -0.135%,16.437% -0.133%,13.702% -0.131%,11.644% -0.13%,11.644% -0.13%,11.361% -0.116%,11.061% -0.074%,10.751% -0.008%,10.437% 0.082%,10.123% 0.192%,9.817% 0.32%,9.524% 0.465%,9.249% 0.623%,9% 0.793%,8.781% 0.973%,2.161% 6.992%,2.161% 6.992%,1.766% 7.384%,1.407% 7.804%,1.086% 8.25%,0.804% 8.72%,0.562% 9.21%,0.361% 9.719%,0.203% 10.243%,0.089% 10.781%,0.019% 11.329%,-0.004% 11.886%,-0.004% 96.905%,-0.004% 96.905%,0.005% 97.136%,0.032% 97.365%,0.077% 97.589%,0.139% 97.809%,0.218% 98.023%,0.314% 98.231%,0.426% 98.43%,0.553% 98.621%,0.696% 98.802%,0.854% 98.973%,0.854% 98.973%,1.024% 99.131%,1.206% 99.273%,1.397% 99.401%,1.596% 99.512%,1.804% 99.608%,2.018% 99.687%,2.239% 99.749%,2.464% 99.794%,2.694% 99.821%,2.926% 99.831%,97.07% 99.831%,97.07% 99.831%,97.302% 99.821%,97.531% 99.794%,97.756% 99.749%,97.976% 99.687%,98.19% 99.608%,98.398% 99.512%,98.598% 99.401%,98.789% 99.273%,98.97% 99.131%,99.141% 98.973%,99.141% 98.973%,99.298% 98.802%,99.441% 98.621%,99.569% 98.43%,99.68% 98.231%,99.776% 98.023%,99.855% 97.809%,99.917% 97.59%,99.962% 97.365%,99.989% 97.137%,99.999% 96.905%,99.999% 11.885%,99.999% 11.885%,99.975% 11.329%,99.906% 10.781%,99.791% 10.243%,99.633% 9.719%,99.433% 9.21%,99.191% 8.719%,98.909% 8.249%,98.588% 7.803%,98.229% 7.382%,97.834% 6.99%,91.214% 0.972%,91.214% 0.972%,90.995% 0.793%,90.745% 0.622%,90.471% 0.463%,90.178% 0.318%,89.871% 0.189%,89.558% 0.079%,89.243% -0.011%,88.933% -0.078%,88.634% -0.12%,88.351% -0.135%,88.351% -0.135%,84.275% -0.133%,80.454% -0.13%,76.814% -0.128%,73.285% -0.125%,69.794% -0.123%,66.268% -0.122%,62.636% -0.122%,58.826% -0.124%,54.765% -0.128%,50.382% -0.135%,50.382% -0.135%,50.315% -0.135%,50.241% -0.135%,50.162% -0.135%,50.081% -0.135%,49.997% -0.135%,49.914% -0.135%,49.832% -0.135%,49.754% -0.135%,49.68% -0.135%,49.613% -0.135%)",
  "polygon( 54.291% -0.121%,4.808% -0.121%,4.808% -0.121%,4.028% -0.057%,3.288% 0.125%,2.598% 0.417%,1.968% 0.808%,1.408% 1.288%,0.927% 1.848%,0.536% 2.478%,0.245% 3.167%,0.063% 3.907%,0% 4.686%,0% 49.967%,0% 95.192%,0% 95.192%,0.015% 95.572%,0.06% 95.948%,0.134% 96.317%,0.236% 96.679%,0.366% 97.031%,0.523% 97.371%,0.706% 97.699%,0.915% 98.013%,1.149% 98.311%,1.408% 98.591%,1.408% 98.591%,1.688% 98.848%,1.986% 99.081%,2.299% 99.29%,2.627% 99.472%,2.968% 99.629%,3.321% 99.759%,3.682% 99.861%,4.052% 99.934%,4.428% 99.979%,4.809% 99.994%,43.752% 99.94%,100.072% 100%,100.072% 12.878%,100.072% 12.878%,100.047% 12.316%,99.971% 11.763%,99.846% 11.223%,99.673% 10.698%,99.455% 10.193%,99.191% 9.708%,98.885% 9.249%,98.538% 8.817%,98.15% 8.415%,97.724% 8.048%,89.654% 1.722%,89.654% 1.722%,89.187% 1.38%,88.7% 1.072%,88.196% 0.798%,87.675% 0.558%,87.141% 0.354%,86.594% 0.185%,86.036% 0.053%,85.469% -0.042%,84.896% -0.099%,84.317% -0.119% )",
  "polygon(54.291% -0.121%,12.769% -0.121%,12.769% -0.121%,12.255% -0.095%,11.752% -0.019%,11.262% 0.106%,10.788% 0.276%,10.334% 0.491%,9.904% 0.75%,9.499% 1.049%,9.124% 1.388%,8.781% 1.765%,8.474% 2.178%,1.531% 12.599%,1.531% 12.599%,1.246% 13.057%,0.988% 13.528%,0.76% 14.012%,0.561% 14.509%,0.391% 15.015%,0.251% 15.531%,0.142% 16.054%,0.063% 16.584%,0.016% 17.119%,0% 17.657%,0% 49.967%,0% 97.557%,0% 97.557%,0.032% 97.953%,0.125% 98.329%,0.273% 98.68%,0.471% 99%,0.716% 99.284%,1% 99.529%,1.32% 99.727%,1.671% 99.875%,2.047% 99.968%,2.443% 100%,43.752% 99.94%,87.304% 99.996%,87.304% 99.996%,87.817% 99.971%,88.321% 99.896%,88.811% 99.773%,89.285% 99.603%,89.738% 99.388%,90.169% 99.13%,90.573% 98.83%,90.947% 98.491%,91.289% 98.115%,91.595% 97.702%,98.539% 87.28%,98.539% 87.28%,98.826% 86.823%,99.084% 86.351%,99.312% 85.867%,99.512% 85.371%,99.682% 84.864%,99.822% 84.348%,99.931% 83.824%,100.01% 83.294%,100.058% 82.758%,100.073% 82.218%,100.073% 9.44%,100.073% 9.44%,99.948% 7.889%,99.586% 6.418%,99.006% 5.046%,98.229% 3.793%,97.273% 2.68%,96.159% 1.725%,94.906% 0.948%,93.534% 0.368%,92.063% 0.006%,90.512% -0.119% )",
];

const recalculateDimensions = (wrapperDim: DOMRect, childDim: DOMRect) => {
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
      zIndex: 40,
      scale: 1,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: rightX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemRightY,
      zIndex: 30,
      scale: 0.99,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backRightX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackRightY,
      zIndex: 20,
      scale: 0.95,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: frontX,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      zIndex: 0,
      scale: 0.9,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: backLeftX,
      y: level3Y,
      rotateX: rotXBack3,
      rotateY: itemBackLeftY,
      zIndex: 20,
      scale: 0.95,
      visibility: "visible",
      opacity: 1,
    },
    {
      x: leftX,
      y: level2Y,
      rotateX: rotX2,
      rotateY: itemLeftY,
      zIndex: 30,
      scale: 0.99,
      visibility: "visible",
      opacity: 1,
    },
  ];
  return updatedCoord;
};



const ProjectListWrapper = ({ rotations, projects }: WrapperProps) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<Array<HTMLLIElement>>([]);

  const [state, dispatch] = useReducer(
    coordReducer,
    { initRotation: rotations, projects: projects },
    createInitialState
  );

  useLayoutEffect(() => {
    const onDimChange = () => {
      if (wrapperRef.current && itemRef.current && itemRef.current.length > 0) {
        //dispatch({type: "setVariant", definition: "initial"});
        const wrapperDim = wrapperRef.current.getBoundingClientRect();
        const childDim = itemRef.current[0].getBoundingClientRect();
        const updatedCoord = recalculateDimensions(wrapperDim, childDim);
        // setPropertyStyle(childDim);
        dispatch({
          type: "resize",
          coords: updatedCoord,
          dimensions: {
            wrapperDim: { x: wrapperDim.width, y: wrapperDim.height },
            childDim: { x: childDim.width, y: childDim.height },
          },
        });
      }
    };
    onDimChange();

 
  }, []);
  const reset = (definition: AnimationDefinition) => {
    dispatch({ type: "resetVariant", definition: definition });
  };
  if (!projects || projects.length == 0) return <></>;
  return (
    <div className=" flex flex-row h-96 content-center justify-center bg-gray-900 ">
      <button
        className={`w-28 `}
        onClick={() => dispatch({ type: "moveRight" })}
      >
        <svg
          className="w-full h-full stroke-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div>
        <div className="relative  w-[63em] h-96 py-4">
          <motion.ul ref={wrapperRef} className="absolute w-full h-full ">
            {[0, 1, 2, 3, 4, 5].map((item, i) => (
              <ProjectItem
                key={i}
                ref={(el) => {
                  if (el) itemRef.current[i] = el;
                }}
                glowState={state.glowState}
                onAnimationComplete={(e) => reset(e)}
                itemData={state.itemData[i]}
                isEnterComplete={state.isEnterComplete}
                className={"absolute w-[14em] h-[14rem] self-stretch  "}
                initial="initial"
                animate={state.variant}
                project={state.projects[i]}
              />
            ))}
          </motion.ul>
        </div>
      </div>
      <button className={`w-28`} onClick={() => dispatch({ type: "moveLeft" })}>
        <svg
          className=" w-full h-full stroke-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

/**
 * STATE REDUCER HANDLER
 */
interface State {
  variant: string;

  hasEntered: boolean;
  isEnterComplete: boolean;
  itemData: ItemData[];
  count: number;
  glowState: string;
  projects: ProjectInterface[];
  projectSize: number;
  focusedProject: number;
  dimensions: Dimensions;
}

type CounterAction =
  | { type: "resetVariant"; definition: AnimationDefinition }
  | { type: "setVariant"; definition: string }
  | { type: "setCount" }
  | { type: "moveLeft" }
  | { type: "moveRight" }
  | { type: "spin"; variant: string }
  | { type: "rotateRight"; variant: string }
  | { type: "resize"; coords: ItemBase[]; dimensions: Dimensions };
interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}

const createInitialState = ({ projects }: InitParam): State => {
  const latestProjects = projects.slice(-6).reverse();

  return {
    variant: Variant.INIT,
    count: 0,
    itemData: initialState(),
    projects: latestProjects,
    projectSize: latestProjects.length,
    hasEntered: false,
    isEnterComplete: false,
    focusedProject: 0,
    glowState: Variant.GLOWOFF,
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
};

const enterCoords = (dimensions: Dimensions): { x: number[]; y: number[] } => {
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
/**
 
 * @param state
 * @param action
 * @returns
 */
const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":
      let count = state.count + 1;
      if (count < 6) return { ...state, count: count };
      if (action.definition.toLocaleString() === Variant.ENTER) {
        return {
          ...state,
          isEnterComplete: true,
          variant: "rotate",
          count: 0,
        };
      }
      if (action.definition.toLocaleString() === Variant.ROTATE)
        return { ...state, glowState: Variant.GLOWOFF };
      return { ...state };
    case "setVariant":
      return { ...state, variant: action.definition };
    case "moveLeft":
      let moveLeft = rotateArray(state.itemData, -1);
      return {
        ...state,
        itemData: moveLeft,
        glowState: Variant.GLOW,
      };
    case "moveRight":
      let moveRight = rotateArray(state.itemData, 1);

      return {
        ...state,
        itemData: moveRight,
        glowState: Variant.GLOW,
      };
    case "resize":
      if (!state.hasEntered) {
        const enterAnimation = enterCoords(action.dimensions);

        let updatedData: ItemData[] = action.coords.map((item, i, arr) => {
          const itemData: ItemData = {
            rotationData: {
              ...state.itemData[i].rotationData,
              itemBase: {
                ...item,
              },
              itemWrapper: {
                scale: 1,
                clipPath: polygons[i],
              },
            },
            enterData: {
              ...state.itemData[i].enterData,
              itemBase: {
                ...state.itemData[i].enterData.itemBase,
                ...enterAnimation,
              },
            },
            backgroundProps: state.itemData[i].backgroundProps,
          };
          return itemData;
        });
        return {
          ...state,
          variant: Variant.ENTER,
          itemData: updatedData,
          hasEntered: true,
          dimensions: action.dimensions,
        };
      } else {
        return { ...state };
      }
    default:
      throw new Error("Unknown action");
  }
};

const initialState = (): ItemData[] => {
  const zIndexes = [30, 20, 10, 0, 10, 20];
  const projectWrapper: ProjectWrapper[] = [
    { top: "10%", paddingLeft: "0%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "10%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "0%", paddingRight: "10%" },
    { top: "10%", paddingLeft: "0%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "10%", paddingRight: "0%" },
    { top: "10%", paddingLeft: "0%", paddingRight: "10%" },
  ];
  const glowInset = [
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "0.75rem",
    "0.5rem",
    "0.25rem",
  ];
  const backgroundProps: BackgroundProps[] = [
    {
      //   1
      gradientAngle: 0,
      front: {
        top: 8,
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
      },
    },
    {
      //   2
      gradientAngle: 45,
      front: {
        top: 8,
        paddingLeft: 8,
        paddingRight: 0,
        borderRadius: 1,
      },
    },
    {
      // 3
      gradientAngle: -45,
      front: {
        top: 9,
        paddingRight: 8,
        paddingLeft: 0,
        borderRadius: 0,
      },
    },
    {
      // 4
      gradientAngle: 175,
      front: {
        top: 8,
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
      },
    },
    {
      // 5
      gradientAngle: 45,
      front: {
        top: 9,
        paddingRight: 0,
        paddingLeft: 8,
        borderRadius: 1,
      },
    },
    {
      //6
      gradientAngle: -45,
      front: {
        top: 8,
        paddingLeft: 0,
        paddingRight: 8,
        borderRadius: 1,
      },
    },
  ];

  let arr: ItemData[] = zIndexes.map((z, i) => {
    const iData: ItemData = {
      rotationData: {
        itemBase: {
          x: 0,
          y: 0,
          zIndex: zIndexes[i],
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          visibility: "visible",
          opacity: 1,
        },
        itemWrapper: {
          scale: 1,
          clipPath: polygons[i],
        },
        projectWrapper: {
          ...projectWrapper[i],
        },
        backGlow: {
          inset: glowInset[i]
        },
        middleGlow: {inset: glowInset[i]}
      },
      enterData: {
        itemBase: {
          x: [0],
          y: [0],

          scale: [0, 1],
          visibility: "visible",
          opacity: i === 0 ? [0, 0.8] : 0,
          zIndex: 0,
          rotateX: 0,
          rotateY: 0,
          
        },
        itemWrapper: {
          clipPath: polygons[0],
          scale: 1,
        },
        projectWrapper: {
          ...projectWrapper[i],
        },
      },
      backgroundProps: backgroundProps[i],
    };
    return iData;
  });
  return arr;
};

export default ProjectListWrapper;
