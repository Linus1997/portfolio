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
import React from "react";



interface ListProps {
  initIndex: number;
  items: Coord[];
  direction: number;
  front: number;
  targetRef: HTMLLIElement | null;
}

const ProjectItem = forwardRef<HTMLLIElement, ScriptProps & ListProps>(
  (props, ref) => {
    const {initIndex, items, direction } = props;
    const x = useMotionValue<number>(0);
    const y = useMotionValue<number>(0);
    const [index, setIndex] = useState<number>(initIndex);
    const [boxShadow,setBoxShadow] = useState<string>("");
    

    useEffect(() => {
      if (items[initIndex].x != null && items[initIndex].y != null) {
       
       
        x.set(items[initIndex].x);
        y.set(items[initIndex].y);

       
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
    const renderChildrenWithProps = () => {
      return React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          // Check if the child is valid and pass additional props
          return React.cloneElement(child, {
            ...child.props,
            setBoxShadow:{setBoxShadow}
          });
        }
        return child;
      });
    }
  
 
    return (
      <motion.li
        ref={ref}
        className={items[index].placement}
        style={{ x, y, boxShadow: boxShadow }}
        whileHover={{
          scale: index == 0 ? 1.3 : 1.1,
        }}
      >
        {index == 0 || index == 1 || index == 4 ? (
          renderChildrenWithProps()
        ) : (
          <div className=" w-full h-full bg-white" />
        )}
      </motion.li>
    );
  }
);
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
