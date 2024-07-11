import {
  animate,
  animationControls,
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
  base: ["z-30"],
});
const layer2 = tv({
  base: ["z-20"],
});

const layer3 = tv({
  base: ["z-10"],
});
interface grid {
  row: string;
  col: string;
}

interface ListProps {
  index: number;
  coord: Coord | null;
  newCoord: Coord | null;
  // start: boolean;
  // direction: number;
  grid: grid;
  grid2: grid | null;
  targetRef: HTMLLIElement | null;
}

const ProjectItem = forwardRef<HTMLLIElement, ScriptProps & ListProps>(
  (props, ref) => {
    const { grid2, coord, newCoord, className } = props;
    const [grid, setGrid] = useState<grid>(props.grid);
    console.log(props.className);
    const x = useMotionValue<number>(0);
    const y = useMotionValue<number>(0);
    const gridCol = useMotionValue(`var(${grid.col})`);
    const gridRow = useMotionValue(`var(${grid.row})`);
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
      if (coord) {
        /*   x.set(coord.x);
        y.set(coord.y); */
      }
    }, [className, coord, x, y]);

    useEffect(() => {
      //console.log("DIRECTION", props.direction)
      if (newCoord && grid2) {
        const animation = new Promise(() => {
          const time = 0.5;
          animate(x, newCoord.x, {
            type: "spring",

            duration: time,
          }).then(() => {
            
          });

          animate(y, newCoord.y, {
            type: "spring",
            duration: time,
          });
        });
        animation.then(() => {
          //setGrid(grid2);
        });
        setUpdate(true);
      }
    }, [props.coord, grid2, props.newCoord, x, y]);
    /*  if (!coord ){
      return <div className={className}></div>
    } */
    const updateValues = () => {};
    return (
      <motion.li
        ref={ref}
        className={props.className ? props.className : "invisible"}
        style={{ gridColumn: gridCol, gridRow: gridRow }}
        animate={
          update && newCoord
            ? {
                x: newCoord.x,
                y: newCoord.y,
              }
            : {}
        }
        onAnimationComplete={() => {
          updateValues;
        }}
        layout
      >
        {props.children}
      </motion.li>
    );
  }
);
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
