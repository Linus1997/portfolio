/* eslint-disable react-hooks/exhaustive-deps */
import {
  animate,
  animationControls,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ScriptProps } from "next/script";
import { useRef, useEffect, forwardRef, useState, useMemo } from "react";
import { getIndex } from "@/app/utils/helperfunction";
import { tv } from "tailwind-variants";
import { baseStyles } from "@nextui-org/react";
import React from "react";
import { ItemData } from "./ProjectListWrapper";

interface ListProps {
  coord: ItemData;
  index: number;
  targetRef: HTMLLIElement | null;
}

const ProjectItem = forwardRef<HTMLLIElement, ScriptProps & ListProps>(
  (props, ref) => {
    const { coord } = props;

    const x = useMotionValue<number>(0);
    const y = useMotionValue<number>(0);

    const [boxShadow, setBoxShadow] = useState<string>("");
    let oldX = x.get();
    let oldY = y.get();

    useEffect(() => {
      if (coord.x != null && coord.y != null) {
        oldX = x.get();
        oldY = y.get();
        if(x.get() === 0){
          x.set(coord.x);
          y.set(coord.y);
        } else {
      //  console.log("Index: ", props.index, "coord: ", coord);
        const duration: number = 0.4;
        
        animate(x, coord.x, { type: "spring", duration: duration });
        animate(y, coord.y, { type: "spring", duration: duration });
        }
        //console.log(coord.zIndex,x.getPrevious(), x.get())
        //animate(x, x.getPrevious(),{type:"spring"})
      }
    }, [coord]);

    const renderChildrenWithProps = () => {
      return React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          // Check if the child is valid and pass additional props
          return React.cloneElement(child, {
            ...child.props,
            setBoxShadow: { setBoxShadow },
          });
        }
        return child;
      });
    };

    return (
      <motion.li
        ref={ref}
        className={props.className}
        style={{ x, y, 
          boxShadow: boxShadow, 
          visibility: (coord.x && coord.y)===null? "hidden" : "visible",
          zIndex: props.coord.zIndex }}
        whileHover={{}}
      >
        {renderChildrenWithProps()}
      </motion.li>
    );
  }
);
ProjectItem.displayName = "ProjectItem";
export default ProjectItem;
