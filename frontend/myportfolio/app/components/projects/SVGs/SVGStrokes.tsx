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
}

const LintPath: FC<LintProps> = ({
    shapePath,
    svgTransform,
    pathLength = [0.1, 0.05, 0.2],
    pathOffset = [0, 0.55],
    strokeWidth = [0.4, 0.7, 0.4]
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
            filter="url(#blurWave)"

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
        <SvgWrapper className="absolute w-full h-full" viewBox={vBox}  >
            <motion.path

                fill="white"
                style={{ fillOpacity: 0.2 }}
                transform={svgTransform}
                d={cornerPath} />
            <motion.path
                variants={framePathVariant}
                animate={animate}
                stroke={isHover ? "url(#waveGradient)" : "#D3D3D3"}
                fill={"none"}
                strokeOpacity="1"
                transform={svgTransform}
                strokeWidth={"0.5px"}
                custom={framePath}
                onAnimationComplete={onAnimationComplete}

            />
            <motion.path
                variants={shapePathVariant}
                animate={animate}
                stroke={isHover ? "url(#waveGradient)" : "#D3D3D3"}
                fill={"none"}
                strokeOpacity="1"
                transform={svgTransform}
                strokeWidth={"0.4px"}
                custom={shapePath}
                onAnimationComplete={onAnimationComplete}

            />







            {/* ----------------------------------------------- */}
            <LintPath shapePath={shapePath} svgTransform={svgTransform}
                pathOffset={[0.55, 1]} />
          <LintPath shapePath={shapePath} svgTransform={svgTransform}
                pathOffset={[0, 0.55]}  />
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


