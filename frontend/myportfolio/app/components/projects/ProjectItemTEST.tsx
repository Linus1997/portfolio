import {
  animate,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { useRef, useEffect, forwardRef, useState } from "react";
import { Coord } from "./ProjectCarousel";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";



const selectedItem = tv({
  base: ["z-30"]
})
const layer2 = tv({
  base: ["z-20"]
})

const layer3 = tv({
  base: ["z-10"]
})

interface grid {
  row: string;
  col: string;
}
interface ListProps {
  index: number;
  coord: Coord | null;
  newCoord: Coord | null
 // start: boolean;
 // direction: number;
  grid: grid;
  grid2: grid | null;
  targetRef: HTMLLIElement | null;
}



const ProjectItem = forwardRef<HTMLLIElement, ScriptProps & ListProps>(
  (props, ref) => {
   const {grid2} = props;
   const [grid, setGrid] = useState<grid>(props.grid);
    console.log(props.className);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const gridCol = useMotionValue(`var(${grid.col})`);
    const gridRow = useMotionValue(`var(${grid.row})`);
    const [update, setUpdate] = useState<boolean>(false);
   
    useEffect(() => {
      console.log(props.className);
      if (update) {
        gridCol.set(grid.col);
        gridRow.set(grid.row); 
        const time = 0.5;
        animate(gridCol, `var(${grid.col})` , {
          type: "spring",

          duration: time,
        });

        animate(gridRow, `var(${grid.row})`, {
          type: "spring",
          duration: time,
        });
      }

    }, [props.className, update ,props.coord, x, y]);

    useEffect(() => {
      
      //console.log("DIRECTION", props.direction)
      if (
       grid2
      ) {
        const animation = new Promise (() => {
         
        })
        animation.then(() => {
          setGrid(grid2);
          setUpdate(true);
        })
  
        
      }
    }, [props.coord, grid2,props.newCoord, x, y]);

    return (
      <motion.li
        ref={ref}
        className={props.className? props.className : "invisible"}
        style={{ gridColumn: gridCol, gridRow:gridRow }}
        layout
      >
        {props.children}
      </motion.li>
    );
  }
);
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
