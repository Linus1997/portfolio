import { LogoAnimationDuration } from "@/app"
import { SVGMotionProps, motion } from "framer-motion"
import { Dispatch, FC, SetStateAction } from "react"


interface Props  {
    isComplete: boolean
    fillColor: string
    svgMotionProps: SVGMotionProps<SVGPathElement>;
}
const LogoPath: FC<Props> = ({isComplete, fillColor,svgMotionProps}) => {
    return(
        
        <motion.path
        initial={{ pathLength: 0, strokeDasharray: "0, 1", strokeOpacity: 1 }}
        animate={{ pathLength: 1, strokeDasharray: "5, 20, 22 ", strokeOpacity: 1, fill: isComplete ? `${fillColor}` : "none", fillOpacity: isComplete ? 1 : 0 }}
        transition={{
           duration: 3,
           strokeDasharray: { duration: 1, ease: "easeInOut" },
           strokeDashoffset: { duration: 2, ease: "easeInOut" },
           ease: "easeInOut",
           fillOpacity: { duration: 2, ease: "easeIn", initial: 0 },
         }}
         strokeWidth={0.5}
         {...svgMotionProps}
         filter="url(#glow)"
       />
       
    )
}

export default LogoPath;