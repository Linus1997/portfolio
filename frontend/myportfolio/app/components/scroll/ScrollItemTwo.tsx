
import { Button } from "@nextui-org/react";
import ProjectCarousel from "../projects/ProjectCarousel";
import GeneralItem from "./generalItem";
import { useState } from "react";



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
M 0.5, 4.4
Q 0,5 0,6
L 0, 10
Q 0, 10 0, 10
L 0, 90
Q 0, 90 0,90
L 0,98
Q 0,100 2, 100
L 10, 100
Q 10,100 10, 100
L 90, 100
Q 90, 100 90,100
L 98,100
Q 100, 100 100, 98
L 100, 90
Q 100, 90 100, 90
L 100, 10
Q 100, 10 100, 10
L 100,6
Q 100,5 99.5,4.4
L 96.5, 0.5
Q 96.1,0 95,0
L 5, 0
Q 3.9,0 3.5,0.5
Z
`

let test1 = `
M 13, 30
Q 13,30 13,30
L 13, 35
Q 13, 35 13, 35
L 13, 92
Q 13,93 13.5,93.64
L 21, 99
Q 22,99.9 23,99.7
L 30.1, 97.6
Q 30.1, 97.6 30.1, 97.6
L 78.9, 84
Q 78.9, 84 78.9, 84
L 86, 82.2
Q 86.92,82 87,80.8
L 87, 74
Q 87, 74 87, 74
L 87, 18.2
Q 87,18.2 87,18.2
L 87, 7.2
Q 87,6.8 86.55,6.4
L 79, 1
Q 78,0.1 77,0.3
L 14.2,17.74
Q 13,18 13,19
Z
`
let test5 = `
M 13.45, 6.4
Q 13,6.8 13,7.2
L 13, 18.2
Q 13, 18.2 13, 18.2
L 13, 74
Q 13, 74 13, 74
L 13, 80.8
Q 13.08,82 14,82.2
L 21.1, 84
Q 21.1, 84 21.1, 84
L 69.9, 97.6
Q 69.9, 97.6 69.9, 97.6
L 77, 99.7
Q 78,99.9 79,99
L 86.5,93.65
Q 87,93 87,92
L 87, 35
Q 87, 35 87, 35
L 87, 30
Q 87, 30 87, 30
L 87, 19
Q 87,18 85.8,17.74
L 23, 0.3
Q 22,0.1 21,1
Z
`
let frame0 = `
M 1.5, 5
Q 0,5 0,6.5
L 0,98
Q 0,100 2, 100
L 98,100
Q 100, 100 100, 98
L 100,6.5
Q 100,5 98.5, 5
Z
`

let frame1 = 
`
M 23.2,24.74
Q 22,25 22,26
L 22, 99.64
Q 22.54,99.82 23, 99.7
L 86, 82.2
Q 86.92, 82 87,80.8
L 87, 7
Q 87,7 87,7
Z
`


let frame5 = `
M 13,7
Q 13,7 13,7
L 13, 80.8
Q 13.08,82 14,82.2
L 77, 99.7
Q 77.46,99.82 78,99.64
L 78, 26
Q 78,25 76.8,24.74
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
