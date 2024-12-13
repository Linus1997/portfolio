import { rotateArray } from "@/app/utils/helperfunction";
import { ProjectInterface } from "@/app/utils/interfaces";
import { TargetAndTransition, AnimationDefinition } from "framer-motion";

import { Variant } from "../ProjectListWrapper";


interface position {
  top : string;
  left: string;
  bottom: string;
  right: string;
}
/**
 * STATE REDUCER HANDLER
 */
interface State {
 shape: position;
 front: position;
 cover: position;
}

type CounterAction =
  | { type: "resetVariant"; definition: AnimationDefinition }
 

interface InitParam {
  initRotation: number;
  projects: ProjectInterface[];
}


/**
   
   * @param state
   * @param action
   * @returns
   */
export const coordReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "resetVariant":

      return { ...state };
    
    default:
      throw new Error("Unknown action");
  }
};

const initialState = () => {


}