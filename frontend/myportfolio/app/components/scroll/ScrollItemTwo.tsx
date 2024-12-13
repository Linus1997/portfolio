
import { motion } from "framer-motion";
import ProjectCarousel from "../projects/ProjectCarousel";
import GeneralItem from "../projects/test files/generalItem";
import Item1 from "../projects/test files/item1";
import Item6 from "../projects/test files/item6";
import { useState } from "react";



interface State {
  count: number;
}

enum ActionType {
  Increment = "INCREMENT",
  Decrement = "DECREMENT",
}
interface Action {
  type: ActionType;
  payload: number;
}

const initialState: State = { count: 0 };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.Increment:
      return { count: state.count + action.payload };
    case ActionType.Decrement:
      return { count: state.count - action.payload };
    default:
      return state;
  }
};

const ScrollItemTwo = () => {
 
  return (
    <div className="bg-white ">
     <ProjectCarousel /> 
      <GeneralItem />
     
      <svg
   width="200"
   height="200"
   viewBox="0 0 100 100"
   version="1.1"
   id="svg1"
   xmlns="http://www.w3.org/2000/svg"

   >
          

  <defs
     id="defs1" />
  <g
     id="layer1">
    <path
       d={`M 0,3 V 87.5 L 8,100 h 84 l 8,-12.5 V 3 L 87.5,0 h -75 z`}
       id="path2" />
  </g>
</svg>

    </div>
  );
};

export default ScrollItemTwo;
