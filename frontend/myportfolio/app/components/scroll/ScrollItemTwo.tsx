
import { motion } from "framer-motion";
import ProjectCarousel from "../projects/ProjectCarousel";
import GeneralItem from "../projects/test files/generalItem";
import Item1 from "../projects/test files/item1";
import Item6 from "../projects/test files/item6";



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
      <Item6 />
      <svg
   width="120"
   height="120"
   viewBox="0 0 120 120"
   version="1.1"
   id="svg1"
   xmlns="http://www.w3.org/2000/svg"
   >
          

  <defs
     id="defs1" />
  <g
     id="layer1">
    <path
       d="M 10,10 1.767767,18.232233 A 6.0355339,6.0355339 112.5 0 0 0,22.5 V 60 97.5 a 6.0355339,6.0355339 67.5 0 0 1.767767,4.26777 L 10,110 l 8.232233,8.23223 A 6.0355339,6.0355339 22.5 0 0 22.5,120 H 60 97.5 a 6.0355339,6.0355339 157.5 0 0 4.26777,-1.76777 L 110,110 l 8.23223,-8.23223 A 6.0355339,6.0355339 112.5 0 0 120,97.5 V 60 22.5 a 6.0355339,6.0355339 67.5 0 0 -1.76777,-4.267767 L 110,10 101.76777,1.767767 A 6.0355339,6.0355339 22.5 0 0 97.5,0 h -75 a 6.0355339,6.0355339 157.5 0 0 -4.267767,1.767767 z"
       id="path2" />
  </g>
</svg>

    </div>
  );
};

export default ScrollItemTwo;
