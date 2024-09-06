
import ProjectCarousel from "../projects/ProjectCarousel";
import Test from "../projects/test files/item6";



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
      <Test />
   
    
    </div>
  );
};

export default ScrollItemTwo;
