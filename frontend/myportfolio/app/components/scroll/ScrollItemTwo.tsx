
import { Button } from "@nextui-org/react";
import ProjectCarousel from "../projects/ProjectCarousel";
import GeneralItem from "./generalItem";
import { useState } from "react";


const target0 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",

  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",

  top: 3 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
}
const target1 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 12 + "%",
  left: 12.8 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
}


const target5 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 12 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 12.8 + "%",
}




const path0 = `
 M 0,3
L 0, 10
L 0, 90
L 0,100
L10, 100
L 90, 100
L 100,100
L 100, 90
L 100, 10
L 100, 3
L 90, 0
L 10, 0
Z
`
const path1 = `
M 13, 30
L 13, 35
L 13, 93
L 22, 100
L 30.125, 97.625
L 78.875, 83.375
L 87, 81
L 87, 74
L 87, 18.182
L 87, 7
L 78, 0
L 13, 18.5
Z`
const path5 = `
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
      <ProjectCarousel />
      <div>

        <div>

          <GeneralItem id={1} path={path5} rotX={0} rotY={0} front={target5} path2={path0} morphState={morph} />
          <GeneralItem id={2} path={path0} rotX={0} rotY={0} front={target1} path2={path5} morphState={morph} />
        </div>

      </div>

      <div>

        <GeneralItem id={3} path={path1} rotX={0} rotY={0} front={target0} path2={path0} morphState={morph} />
        <GeneralItem id={4} path={path0} rotX={0} rotY={0} front={target0} path2={path1} morphState={morph} />
      </div>

      <div>
        <div>
          <Button
          className="w-56 h-56"
          onPress={() => morph==="default" ? setMorph("morph") : setMorph("default")}
          > MORPH </Button>
        </div>
      </div>
    </div>
  );
};

export default ScrollItemTwo;
