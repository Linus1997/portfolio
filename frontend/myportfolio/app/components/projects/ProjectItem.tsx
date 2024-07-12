/* eslint-disable react-hooks/exhaustive-deps */
import {
  animate,
  animationControls,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { useRef, useEffect, forwardRef, useState } from "react";
import { Coord, rotateLeft, rotateRight } from "./ProjectCarousel";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";
import { baseStyles } from "@nextui-org/react";



interface ListProps {
  initIndex: number;
  items: Coord[];
  direction: number;
  front: number;
  targetRef: HTMLLIElement | null;
}

const ProjectItem = forwardRef<HTMLLIElement, ScriptProps & ListProps>(
  (props, ref) => {
    const { className, front, initIndex, items, direction } = props;
    const [startCoord, setCoord] = useState<Coord | null>(null);
    console.log(props.className);
    const x = useMotionValue<number>(0);
    const y = useMotionValue<number>(0);
    const init = useRef<boolean>(true);
    const [index, setIndex] = useState<number>(initIndex);
    const [itemList, setItems] = useState<Coord[]>();
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
      if (items[initIndex].x != null && items[initIndex].y != null) {
        console.log("index", initIndex, index);
        init.current = false;
        x.set(items[initIndex].x);
        y.set(items[initIndex].y);

        //console.log(y, x)
      }
    }, [initIndex, items]);
    useEffect(() => {
      if (direction == -1) {
        setIndex(getIndex(index, -1, items.length));
        //setItems(rotateLeft(items, 1));
      } else if (direction == 1) {
        //setItems(rotateRight(items, 1));
        setIndex(getIndex(index, 1, items.length));
      }
    }, [direction]);

    useEffect(() => {
      if (
        items[index].x != null &&
        items[index].y != null &&
        x.get() != items[index].x
      ) {
        const time = 0.4;

        animate(x, items[index].x, {
          type: "spring",
            
          duration: time,
        });

        animate(y, items[index].y, {
          type: "spring",
          duration: time,
        });
      }
    }, [index]);
    /*  useEffect(() => {
      //console.log("DIRECTION", props.direction)
      if (false) {
       if(direction == -1){
        const time = 0.5;
        animate(x, left.x, {
          type: "spring",

          duration: time,
        })

        animate(y, 2, {
          type: "spring",
          duration: time,
        });
       } else if(direction == 1){
        const time = 0.5;
        animate(x, 2, {
          type: "spring",

          duration: time,
        })

        animate(y, 2, {
          type: "spring",
          duration: time,
        });
       }
        
        
      
       
      }
    }, [direction,  update, x, y]); */
    /*  if (!coord ){
      return <div className={className}></div>
    } */
    const updateValues = () => {
      console.log("eeeeh");
    };
    return (
      <motion.li
        ref={ref}
        className={items[index].placement}
        style={{ x, y }}
        whileHover={{
          scale: index == 0 ? 1.3 : 1.1,
        }}
      >
        {index == 0 || index == 1 || index == 4 ? (
          props.children
        ) : (
          <div className=" w-full h-full bg-white" />
        )}
      </motion.li>
    );
  }
);
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
