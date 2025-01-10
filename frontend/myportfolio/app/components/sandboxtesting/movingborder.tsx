import { easeIn, easeInOut, motion, useAnimate, useAnimationFrame } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import { corner5, frame5, path5 } from "../projects/paths";









const MovingBorder = () => {
    const ref = useRef<SVGLinearGradientElement>(null)

    useAnimationFrame((time, delta) => {
        const shift = Math.sin(time / 3000) * 35;
        if (ref.current) {
            ref.current.setAttribute("x1", `${shift}%`);
            ref.current.setAttribute("x2", `${100 + shift}%`);

        }

    })

    return (
        <div className=" w-full h-[500px] flex flex-row bg-slate-500" >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" "
                viewBox="0 0 100 100"
            >
                <defs>


                    <motion.linearGradient ref={ref} id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"

                    >
                        <stop offset="0%" stopColor="#FFC0CB" />  {/* Light Pink */}
                        <stop offset="10%" stopColor="#FFD9E3" />  {/* Softer Pink */}
                        <stop offset="20%" stopColor="#FFFFFF" />  {/* White */}
                        <stop offset="30%" stopColor="#F5F5F5" />  {/* Very Light Gray/White */}
                        <stop offset="40%" stopColor="#D3D3D3" />  {/* Light Gray */}
                        <stop offset="50%" stopColor="#C0C0C0" />  {/* Silver */}
                        <stop offset="60%" stopColor="#ADD8E6" />  {/* Light Blue */}
                        <stop offset="70%" stopColor="#B0E0E6" />  {/* Powder Blue */}
                        <stop offset="80%" stopColor="#87CEFA" />  {/* Light Sky Blue */}
                        <stop offset="90%" stopColor="#E0FFFF" />  {/* Light Cyan */}
                        <stop offset="100%" stopColor="#F0FFFF" />  {/* Azure */}

                    </motion.linearGradient>
                    <filter id="blurWave" x="-50%" y="-50%" vbwidth="200%" vbheight="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0">
                            <animate
                                attributeName="stdDeviation"
                                values="0.5;1;0.5"
                                dur="3s"
                                repeatCount="indefinite"
                            />
                        </feGaussianBlur>
                    </filter>

                </defs>


                {/* <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-60"
                    dur="3s"
                    
                    repeatCount="indefinite"
                /> */}


                <path
                    d={corner5}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="0.4"
                    strokeLinecap="round"

                />
                <path
                    d={frame5}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="0.4"
                    strokeLinecap="round"

                />
                <path
                    d={path5}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                />
                {/* ----------------------------------------------------------*/}
                <motion.path
                    d={path5}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth={0.4}
                    strokeLinecap="round"

                    // strokeDasharray="1 5"
                    filter="url(#blurWave)"

                    animate={{
                        pathLength: [0.1, 0.05, 0.2],
                        pathOffset: [0.55, 1],
                        //filter: ["url(#blurWave)", "drop-shadow(16px 16px 20px red) invert(75%)" ], 
                        strokeWidth: [0.4, 0.7, 0.4],
                        opacity: 1
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: easeIn,

                    }}
                />


                <motion.path
                    d={path5}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth={0.4}
                    strokeLinecap="round"

                    // strokeDasharray="1 5"
                    filter="url(#blurWave)"

                    animate={{
                        pathLength: [0.1, 0.05, 0.2],
                        pathOffset: [0, 0.55],
                        //filter: ["url(#blurWave)", "drop-shadow(16px 16px 20px red) invert(75%)" ], 
                        strokeWidth: [0.4, 0.7, 0.4],
                        opacity: 1
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: easeIn,

                    }}
                />



            </svg>










        </div>
    )
}










export default MovingBorder;