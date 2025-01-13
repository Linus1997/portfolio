import { useAnimationFrame } from "framer-motion";
import {  useRef } from "react"

interface Props {
    
}
const StrokeBorderFilter = ({  }: Props) => {
    const ref = useRef<SVGLinearGradientElement>(null)

    useAnimationFrame((time, delta) => {
        const shift = Math.sin(time / 3000) * 35;
        if (ref.current) {
            ref.current.setAttribute("x1", `${shift}%`);
            ref.current.setAttribute("x2", `${100 + shift}%`);
  
        }
  
    })
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-0 h-0 "
            viewBox="0 0 100 100"
            
        >
            <defs>


                <linearGradient ref={ref} id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"

                >
                    <stop offset="0%" stopColor="#FFC0CB" />  {/* Light Pink */}
                    <stop offset="10%" stopColor="#FFD9E3" />  {/* Softer Pink */}
                    <stop offset="20%" stopColor="#F5F5F5" />  {/* Very Light Gray/White */}
                    <stop offset="30%" stopColor="#FFFFFF" />  {/* White */}
                    <stop offset="40%" stopColor="#D3D3D3" />  {/* Light Gray */}
                    <stop offset="50%" stopColor="#C0C0C0" />  {/* Silver */}
                    <stop offset="60%" stopColor="#ADD8E6" />  {/* Light Blue */}
                    <stop offset="70%" stopColor="#B0E0E6" />  {/* Powder Blue */}
                    <stop offset="80%" stopColor="#87CEFA" />  {/* Light Sky Blue */}
                    <stop offset="90%" stopColor="#E0FFFF" />  {/* Light Cyan */}
                    <stop offset="100%" stopColor="#F0FFFF" />  {/* Azure */}


                </linearGradient>
                

            </defs>
        </svg>
    )
}

export default StrokeBorderFilter;