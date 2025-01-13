import { SVGMotionProps, easeIn, motion } from "framer-motion";
import { ScriptProps } from "next/script";
import { FC } from "react";
import SvgWrapper from "../../SvgMotionComponents/SvgWrapper";
import { shapePathVariant, framePathVariant } from "../listitem/listItemVariants";



interface Props {
    vBox: string;
    svgTransform: string;
    shapePath: string;
    framePath: string;
    cornerPath: string;
    isHover: boolean;
}


interface LintProps {
    shapePath: string;
    svgTransform: string;
    pathLength?: number[];
    pathOffset?: number[];
    strokeWidth?: number[];
    filter?: string;
}

const LintPath: FC<LintProps> = ({
    shapePath,
    svgTransform,
    pathLength = [0.1, 0.05, 0.2],
    pathOffset = [0, 0.55],
    strokeWidth = [0.4, 0.7, 0.4],
    filter="url(#pulseBlur)"
}) => {

    return (
        <motion.path
            d={shapePath}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth={0.4}
            strokeLinecap="round"
            transform={svgTransform}
            // strokeDasharray="1 5"
            filter={filter}

            animate={{
                pathLength: pathLength,
                pathOffset: pathOffset,
                //filter: ["url(#blurWave)", "drop-shadow(16px 16px 20px red) invert(75%)" ], 
                strokeWidth: strokeWidth,
                opacity: 1
            }}
            transition={{
                repeat: Infinity,
                duration: 5,
                ease: easeIn,

            }}
        />)
}

const SVGStrokes: FC<Props & SVGMotionProps<SVGSVGElement> & ScriptProps> = (
    props
) => {
    const {

        vBox,
        isHover,
        svgTransform,
        shapePath,
        framePath,
        cornerPath,
        animate,
        onAnimationComplete,

    } = props
    return (
        <SvgWrapper className="absolute w-full h-full z-20" viewBox={vBox}  >
            <motion.path

                fill="white"
                style={{ fillOpacity: 0.1 }}
                transform={svgTransform}
                d={cornerPath} />
            <motion.path
                variants={framePathVariant}
                animate={animate}
                stroke={"url(#waveGradient)"}
                fill={"none"}
                strokeOpacity="1"
                transform={svgTransform}
                strokeWidth={"1px"}
                custom={framePath}
                onAnimationComplete={onAnimationComplete}
                
            />
            <motion.path
                variants={shapePathVariant}
                animate={animate}
                stroke={"url(#waveGradient)"}
                fill={"none"}
                strokeOpacity="1"
                transform={svgTransform}
                strokeWidth={"0.5px"}
                custom={shapePath}
                onAnimationComplete={onAnimationComplete}

            />







            {/* ----------------------------------------------- */}
            {/* <LintPath shapePath={shapePath} svgTransform={svgTransform}
                pathOffset={[0.55, 1]} />
            <LintPath shapePath={shapePath} svgTransform={svgTransform}
                pathOffset={[0, 0.55]} /> */}

            <LintPath shapePath={framePath} svgTransform={svgTransform}
                pathLength = {[0.1, 0.01]}
                pathOffset={[0.53, 0.75]} 
 filter="url(#pulseTest)"
                strokeWidth = {[0.5]} // Fortsätt här
                />
            <LintPath shapePath={framePath} svgTransform={svgTransform}
                pathLength = {[0.01]}
                pathOffset={[1, 0.75]} 
                strokeWidth = {[1]}
                 filter="url(#pulseTest)"
                />

<LintPath shapePath={cornerPath} svgTransform={svgTransform}
                pathOffset={[0, 1]}
                pathLength = {[0.01]}
                filter="url(#pulseTest)"
                strokeWidth = {[1]}
                
                />
            {/* <motion.path
                d={shapePath}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth={0.4}
                strokeLinecap="round"
                transform={svgTransform}
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
                d={shapePath}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth={0.4}
                strokeLinecap="round"
                transform={svgTransform}
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
            /> */}
        </SvgWrapper>

    )
}


export default SVGStrokes;


