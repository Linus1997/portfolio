
import { motion, SVGMotionProps } from "framer-motion"
import { FC } from "react"
import { shapePathVariant, framePathVariant } from "../listitem/listItemVariants"
import SvgWrapper from "../../SvgMotionComponents/SvgWrapper";
import { ScriptProps } from "next/script";

interface Props{
    vBox: string;
    index:number;
    svgTransform: string;
    shapePath: string;
    framePath: string;
}

const ClipPaths: FC<Props & SVGMotionProps<SVGSVGElement> & ScriptProps>  = (
    props
) => {
    const {
        className,
        vBox,
        index,
        svgTransform,
        shapePath,
        framePath,
        animate,
        onAnimationComplete,

    } = props
return(
    <SvgWrapper className={className} viewBox={vBox} >
    <defs>

    <motion.clipPath
      id={`shape-path-${index}`}
      transform={svgTransform}
    >
      <motion.path
        variants={shapePathVariant}
        animate={animate}
        custom={shapePath}
        onAnimationComplete={onAnimationComplete}

      />
    </motion.clipPath>
    <motion.clipPath
      id={`frame-path-${index}`}
      transform={svgTransform} 
    >
      <motion.path
        variants={framePathVariant}
        animate={animate}
        custom={framePath}
        onAnimationComplete={onAnimationComplete}

      />
    </motion.clipPath>
  </defs>
  </SvgWrapper>

)
} 


export default ClipPaths;