import {useReducer} from 'react';

interface State {
   count: number;
   completed: boolean;
   
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; }



export const stateReducer = (state: State, action: CounterAction): State => {
  switch (action.type) {
    case "reset":
        return {
            count: 0, completed: false
        }
    case "setCount":
        const newCount = state.count + 1;
        
      return { count: newCount, completed: newCount === 5? true : false };
    default:
      throw new Error("Unknown action");
  }
}