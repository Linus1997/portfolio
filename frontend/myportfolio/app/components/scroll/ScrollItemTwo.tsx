
import { motion } from "framer-motion";
import ProjectCarousel from "../projects/ProjectCarousel";
import GeneralItem from "../projects/test files/generalItem";
import Item1 from "../projects/test files/item1";
import Item6 from "../projects/test files/item6";
import { useState } from "react";
import { path0, path5 } from "@/app";




const ehm = `
M 0.5,11.5 
      C 0.125,12   0,12.5   0,13
      L 0,98 
      C 0.125,99   0.5,99.5   2,100
      L 7,100 
      C 8,100   9,100   10,100
      L 86,100
      C 87,100   88,99   89,98 
      L 99.5,88
      C 100,87.5   100,87   100,86.5
      L 100,1 
      C 100,0.5   99.5,0   99,0 
      L 87.5,0
      C 87.5,0   87.5,0   87.5,0 
      L 17,0 
      C 16.2,0.125   15.8,0.5   15,1 
      z
`
/**
 * NOTE:
 *    stopped at 
 *    L 11,100
 *    C 12,100   13,100   14,100     
 */

const path1 = `
  M 1.5,0
          C 1,0.25  0,0.75  0,1
        L 0,93
        C 0,94   0,95  0,95 
          
          L 11,100
          C 12,100   13,100   14,100           
          
          L 98,100
          C 99,100   100,99   100,98      
          L 100,87.5 
          C 100,87.5   100,87.5   100,87.5
        L 100, 11.5
        C 99.875,12   100,12.5   100,13
          L 88.5,0.25
          C 88,0.125   87.5,0   87,0  
          L 13.5, 0
          C 13,0   12.5,0.125   12,0.25
          z
`




const ScrollItemTwo = () => {

  return (
    <div className="relative bg-white flex flex-col">
      <ProjectCarousel />
      <GeneralItem id={1} path={path5} rotX={20} rotY={45} />
      <GeneralItem id={3} path={path1} rotX={20} rotY={-45} />
      <GeneralItem id={2} path={path0} rotX={0} rotY={0} />


    </div>
  );
};

export default ScrollItemTwo;
