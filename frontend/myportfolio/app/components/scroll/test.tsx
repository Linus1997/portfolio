import { forwardRef, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { Dimensions, Rotation, RotationPair } from "../projects/utils/sharedInterfaces";
import { HTMLMotionProps, motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { ItemShadow } from "../projects/listitem/listItemVariants";
import { VariantState } from "../projects/reducers/coordReducer";
import { getIndex, getProjects, logItem, printObject } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";
import ProjectCard from "../projects/projectcontent/ProjectCard";
import { ScriptProps } from "next/script";
import { Button } from "@nextui-org/react";
import Image from "next/image";

function TestWrapper(): JSX.Element | null {
    const [state, dispatch] = useReducer(stateReducer, getProjects().slice(0, 6), initializeState)
    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement[]>([]);


    const globalAngle = useMotionValue(state.globalAngle);
    const [onPress, setOnPress] = useState(false);



    useEffect(() => {
        globalAngle.set(state.globalAngle)
    }, [state.globalAngle])


    useLayoutEffect(() => {
        if (!parentRef.current || !childRef.current || childRef.current.length === 0) {
            return;
        }

        const wrapperDim = parentRef.current.getBoundingClientRect();
        const childDim = childRef.current[0].getBoundingClientRect();


        dispatch({ type: "resize", wrapperDim: wrapperDim, childDim: childDim })
    }, []);

    return (
        <div ref={parentRef} className="relative  w-[63em] h-[30rem] overflow-hidden bg-gray-900">

            <motion.div
                className="absolute   w-[36rem] h-28 rounded-full bg-black/30 blur-2xl"
                style={{
                    rotate: useTransform(globalAngle, (angle) => Math.sin(angle)*6),
                    
                   
                    top: 3*state.ellipse.y0,
                    left: state.ellipse.a,
                    
                    zIndex: 0,
                }}
            />




            {state.items.map((item, i) => {
                const itemAngle = useTransform(globalAngle, (ga) => {
                    const fullAngle = item.baseAngle + (ga * 180) / Math.PI;
                    const rad = (fullAngle * Math.PI) / 180;

                    // logItem(i, 0, { item: item.project.images[0], ga: ga, fullAngle: fullAngle })
                    return rad;
                });

                const x = useTransform(itemAngle, (rad) => state.ellipse.x0 + state.ellipse.a * Math.cos(rad));
                const y = useTransform(itemAngle, (rad) => state.ellipse.y0 + state.ellipse.b * Math.sin(rad));
                const scale = useTransform(y, [state.ellipse.y0 - state.ellipse.b, state.ellipse.y0 + state.ellipse.b], [0.9, 1.1]);
                const opacity = useTransform(y, [state.ellipse.y0 - state.ellipse.b, state.ellipse.y0 + state.ellipse.b], [0.4, 1]);
                const zIndex = useTransform(y, [state.ellipse.y0 - state.ellipse.b, state.ellipse.y0 + state.ellipse.b], [0, 100]);
                const rotateY = useTransform(itemAngle, (rad) => {
                    const deg = (rad * 180) / Math.PI;
                    const relativeDeg = deg - 90;


                        logItem(i, 0, { deg: deg, relativeDeg: relativeDeg })

                    return relativeDeg
                });
                const rotateX = useTransform(y, [state.ellipse.y0 - state.ellipse.b, state.ellipse.y0 + state.ellipse.b], [10, -10]);


                function handleDrag(info: PanInfo) {
                    const deltaX = info.delta.x;

                    const mod = (globalAngle.get() - deltaX * 0.008) % (2 * Math.PI)


                    globalAngle.set(mod);


                }
               
                
                return (

                    <div key={item.id}>
                        <motion.div
                            className="absolute w-56 h-56 rounded-xl  opacity-20 pointer-events-none"
                            style={{
                                x,
                                y,
                                scale,
                                rotateX,
                                rotateY: useTransform(rotateY, r => r <= 180.1 && r >= 179.9?  r*0.999 : r<= -0.08424053890828988? r+ 0.01: r*0.999),
                                zIndex,
                                
                            }}
                        >
                            <motion.img
                                className=" absolute  m-0 w-full h-full bg-black  self-stretch pointer-events-none border rounded-lg"
                                width={"100%"}
                                height={"100%"}
                                src={item.project ? item.project.images[0] : undefined}
                                style={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                whileHover={{}}
                                alt="Hangry Frogs game project"
                            />

                        </motion.div>
                        <motion.div

                            ref={(el) => {
                                if (el) childRef.current[i] = el;
                            }}
                            className="absolute w-56 h-56"
                            style={{ x, y, rotateX, rotateY, scale, opacity, zIndex }}
                        >



                            <motion.div
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDrag={(_, info) => {
                                    handleDrag(info);

                                }}
                                className="absolute inset-0 cursor-grab"
                                style={{
                                    zIndex: 1,
                                    backgroundColor: "transparent",
                                }} />


                            <ProjectCard project={item.project} index={item.id} />


                        </motion.div>
                    </div>

                );
            })}



        </div>
    );
}





export interface InitState {
    ellipse: Ellipse
    projects: ProjectInterface[]
    items: { id: number, project: ProjectInterface, baseAngle: number }[]
    focusItem: number,
    globalAngle: number;
}

export const initState: InitState = {
    ellipse: {
        x0: 0,
        y0: 0,
        a: 0,
        b: 0
    },
    projects: [],
    items: [],
    focusItem: 0,
    globalAngle: 0,
}

/**
 * Action types for the item interaction reducer.
 */
type ItemInteractionAction =
    | { type: "resize"; wrapperDim: DOMRect; childDim: DOMRect; };

/**
 * Reducer handling individual item interaction animation states (hover/onClick).
 *
 * @param {InitState} state - The current local interaction state.
 * @param {ItemInteractionAction} action - The dispatched action.
 * @returns {InitState} The updated interaction state.
 */
export function stateReducer(
    state: InitState,
    action: ItemInteractionAction
): InitState {
    switch (action.type) {
        case "resize":


            const baseAngleRad = (360 / state.items.length) * state.focusItem + 60;
            const baseAngleInRadians = baseAngleRad * (Math.PI / 180);
            const globalAngle = Math.PI / 2 - baseAngleInRadians;


            return {
                ...state,
                ellipse: recalculateDimensions(action.wrapperDim, action.childDim),
                globalAngle: Math.PI / 2 - baseAngleInRadians
            }

        default:
            return state;
    }
}






const initializeState = (projects: ProjectInterface[]): InitState => {

    return {
        ...initState,
        items: projects.map((project, i) => ({
            id: i,
            project,
            baseAngle: (360 / projects.length) * i + 60,

        }))

    }
}

export interface Ellipse {
    x0: number; // center point--
    y0: number; // --------------
    a: number; // half width (Semi-major axis)
    b: number; // half height (semi-minor axis)


}



export const recalculateDimensions = (wrapperDim: DOMRect, childDim: DOMRect): Ellipse => {



    const centerX = wrapperDim.width / 2 - childDim.width / 2;
    const centerY = wrapperDim.height / 2 - childDim.height / 1.8

    const offsetX2 = childDim.width;
    const rightX = centerX + offsetX2;
    const leftX = centerX - offsetX2;

    const offsetY3 = 0;
    const a = ((rightX - leftX) / 2) * 1.1 // X radius
    const b = (centerY - offsetY3) * 0.2  // Y radius

    return {
        x0: centerX,
        y0: centerY,
        a: a,
        b: b
    }

};


export default TestWrapper