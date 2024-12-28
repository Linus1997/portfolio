
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
 
  top: 0+ "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
  rotateX: 0,
  rotateY: 0,
 
}
const target1 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 0 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
  rotateX: 20,
  rotateY: -40,

}


const target5 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 0 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
  rotateX: 20,
  rotateY: 40
}
;

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

let test1 = `
M 13, 30
C 13,30 13,30 13,30
L 13, 35
C 13, 35 13, 35 13, 35
L 13, 92
C 13, 93 13.5,93.5 14,94
L 21, 99
C 22, 100 23,99.7 23,99.7
L 30.1, 97.6
C 30.1, 97.6 30.1, 97.6 30.1, 97.6
L 78.9, 84
C 78.9, 84 78.9, 84 78.9, 84
L 86, 82.2
C 86,82.2 87,82 87,80.8
L 87, 74
C 87, 74 87, 74 87, 74
L 87, 18.2
C 87, 18.2  87,18.2  87,18.2
L 87, 7
C 87,6.8  86.7,6.5   86,6
L 79, 1
C 78,0 77,0.3 77,0.3
L 14, 17.7
C 13, 18 13, 19 13,20
Z
`
let frame1 = 
`
M 23,24.8
C 22.5,24.9 22, 25 22,26
L 22, 100
L 87, 82.2
L 87, 7
C 87,7 87,7 87,7
Z
`
let frame0 = `
M 0.5, 5.5
C 0,6 0,6.5 0,7
L 0,100
L 100,100
L 100,7
C 100,6.5 100,6 99.5, 5.5
z
`

let frame5 = `M 13,7
C 13,7 13,7 13,7
L 13, 82.2
L 78, 100
L 78, 26
C 78,25 77.5,24.9 77,24.8
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
M 14, 6
C 13.3,6.5 13,6.8 13,7
L 13, 18.2
C 13, 18.2 13, 18.2 13, 18.2
L 13, 74
C 13, 74 13, 74 13, 74
L 13, 80.8
C 13,80.8 13,82 14,82.2
L 21.1, 84
C 21.1, 84 21.1, 84 21.1, 84
L 69.9, 97.6
C 69.9, 97.6 69.9, 97.6 69.9, 97.6
L 77, 99.7
C 77,99.7 78,100 79,99
L 86,94
C 86.5,93.5 87,93 87,92
L 87, 35
C 87, 35 87, 35 87, 35
L 87, 30
C 87, 30 87, 30 87, 30
L 87, 20
C 87,19 87,18 86,17.7
L 23, 0.3
C 23,0.3 22,0 21,1
Z
`
//`
// M 13, 7
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
// L 22, 0
// Z
// `



const ScrollItemTwo = () => {
  const [morph, setMorph] = useState<string>("default")
  return (
    <div className="relative bg-white flex flex-row">
      {/* <ProjectCarousel /> */}
      <div>

        <div>

          <GeneralItem id={1} path={test5} rotX={0} rotY={0} front={target5} front2={target0} path2={test0} morphState={morph} frame1={frame5} frame2={frame0}  />
          <GeneralItem id={2} path={test0} rotX={0} rotY={0} front={target0} front2={target5} path2={test5} morphState={morph} frame1={""} frame2={""} />
        </div>

      </div>

      <div>

        <GeneralItem id={3} path={test1} rotX={0} rotY={0} front={target1} front2={target0} path2={test0} morphState={morph} frame1={frame1} frame2={frame0} />
        <GeneralItem id={4} path={test0} rotX={0} rotY={0} front={target0} front2={target1} path2={test1} morphState={morph} frame1={""} frame2={""} />
      </div>

      <div>

        <GeneralItem id={5} path={test5} rotX={0} rotY={0} front={target5} front2={target1} path2={test1} morphState={morph} frame1={frame5} frame2={frame1} />
        <GeneralItem id={6} path={test1} rotX={0} rotY={0} front={target1} front2={target5} path2={test5} morphState={morph} frame1={""} frame2={""} />
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
