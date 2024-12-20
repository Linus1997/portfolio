
import { Button } from "@nextui-org/react";
import ProjectCarousel from "../projects/ProjectCarousel";
import GeneralItem from "./generalItem";
import { useState } from "react";
import { path0, path1, path5 } from "../projects/paths";


const target0 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",

  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
 
  top: 6+ "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
  rotateX: 0,
  rotateY: 0
}
const target1 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 15 + "%",
  left: 13 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
  rotateX: 20,
  rotateY: -40
}


const target5 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 13 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 12 + "%",
  rotateX: 20,
  rotateY: 40
}
;
`
M 1, 2.7
C 0.5,2.85 0,3 0,4
L 0, 10
C 0, 10 0, 10 0, 10
L 0, 90
C 0, 90 0, 90 0,90
L 0,98
C 0 , 99 0,100 2, 100
L 10, 100
C 10,100 10,100 10, 100
L 90, 100
C 90, 100 90, 100 90,100
L 98,100
C 99, 100 100,100 100, 98
L 100, 90
C 100, 90 100, 90 100, 90
L 100, 10
C 100, 10 100, 10 100, 10
L 100, 4
C 100,3 99.5, 2.85 99,2.7
L 91, 0.3
C 90.5,0.15 90,0 89,0
L 11, 0
C 10,0 9.5,0.15 9,0.3
Z
`;
// const path0 = `
//  M 0,3
// L 0, 10
// L 0, 90
// L 0,100
// L10, 100
// L 90, 100
// L 100,100
// L 100, 90
// L 100, 10
// L 100, 3
// L 97.5, 0
// L 2.5, 0
// Z
// `
let test0 = `
M 1, 5
C 0.5,5.5 0,6 0,7
L 0, 10
C 0, 10 0, 10 0, 10
L 0, 90
C 0, 90 0, 90 0,90
L 0,98
C 0 , 99 0,100 2, 100
L 10, 100
C 10,100 10,100 10, 100
L 90, 100
C 90, 100 90, 100 90,100
L 98,100
C 99, 100 100,100 100, 98
L 100, 90
C 100, 90 100, 90 100, 90
L 100, 10
C 100, 10 100, 10 100, 10
L 100, 7
C 100,6 99.5, 5.5 99,5
L 94, 0.5
C 93.5,0.15 93,0 92,0
L 8, 0
C 7,0 6.5,0.15 6,0.5
Z
`
// const path1 = `
// M 13, 30
// L 13, 30
// L 13, 91
// L 22, 100
// L 30.125, 97.625
// L 78.875, 83.375
// L 87, 81
// L 87, 74
// L 87, 18.182
// L 87, 8
// L 78, 0
// L 13, 18.5
// Z`
// path 1
;
let test1 = `
M 13, 30
    C 13,30 13,30 13,30
L 13, 35
    C 13, 35 13, 35 13, 35
L 13, 90.5
    C 13, 91 13.5,91.5 14,92
L 21, 99
    C 22, 100 23,99.71 23,99.71
L 30.125, 97.625
    C 30.125, 97.625 30.125, 97.625 30.125, 97.625
L 78.875, 83.375
    C 78.875, 83.375 78.875, 83.375 78.875, 83.375
L 86, 81.29
    C 86, 81.29 87, 81 87,80
L 87, 74
    C 87, 74 87, 74 87, 74
L 87, 18.182
    C 87, 18.182 87, 18.182 87, 18.182
L 87, 9.5
    C 87, 9 86.5, 8.5 86,8
L 79, 1
    C 78, 0 77,0.29 77,0.29
L 14, 17.71
    C 13, 18 13, 19 13,20
Z
`
// let test5=`M 13, 9.5
// L 13, 18.182
// L 13, 74
// L 13, 81
// L 21.125, 83.375
// L 69.875, 97.625
// L 78.000, 100
// L 87.000, 93
// L 87.000, 35
// L 87, 30
// L 87, 18.5
// L 23,0.29
// C 23,0.29 22,0 21,1
// Z`

let test5 = `
M 13, 7
L 13, 18.182
L 13, 74
L 13, 81
L 21.125, 83.375
L 69.875, 97.625
L 78.000, 100
L 87.000, 93
L 87.000, 35
L 87, 30
L 87, 18.5
L 22, 0
Z
`



const ScrollItemTwo = () => {
  const [morph, setMorph] = useState<string>("default")
  return (
    <div className="relative bg-white flex flex-row">
      {/* <ProjectCarousel /> */}
      <div>

        <div>

          <GeneralItem id={1} path={test5} rotX={0} rotY={0} front={target5} front2={target0} path2={test0} morphState={morph}  />
          <GeneralItem id={2} path={test0} rotX={0} rotY={0} front={target0} front2={target5}  path2={test5} morphState={morph} />
        </div>

      </div>

      <div>

        <GeneralItem id={3} path={test1} rotX={0} rotY={0} front={target1} front2={target0} path2={test0} morphState={morph} />
        <GeneralItem id={4} path={test0} rotX={0} rotY={0} front={target0} front2={target1} path2={test1} morphState={morph} />
      </div>

      <div>

        <GeneralItem id={5} path={test5} rotX={0} rotY={0} front={target5} front2={target1} path2={test1} morphState={morph} />
        <GeneralItem id={6} path={test1} rotX={0} rotY={0} front={target1} front2={target5} path2={test5} morphState={morph} />
      </div>
      <div>
        <div>
          <Button
            className="w-56 h-56"
            onPress={() => morph === "default" ? setMorph("morph") : setMorph("default")}
          > MORPH </Button>
        </div>
      </div>
    </div>
  );
};

export default ScrollItemTwo;
