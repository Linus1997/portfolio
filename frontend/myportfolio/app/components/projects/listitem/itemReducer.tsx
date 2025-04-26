export interface ItemInteractionState {
  isHovering: boolean;
  isClicked: boolean;
  dist2Front: number;
}

/**
 * Action types for the item interaction reducer.
 */
type ItemInteractionAction =
  | { type: "onHover" }
  | { type: "onNotHover" }
  | { type: "onClick" }
  | { type: "reset" }
  | { type: "timeout"; dist2Front: number; isTimeout: boolean; };

/**
 * Reducer handling individual item interaction animation states (hover/onClick).
 *
 * @param {ItemInteractionState} state - The current local interaction state.
 * @param {ItemInteractionAction} action - The dispatched action.
 * @returns {ItemInteractionState} The updated interaction state.
 */
export function itemInteractionReducer(
  state: ItemInteractionState,
  action: ItemInteractionAction
): ItemInteractionState {
  switch (action.type) {
    case "onHover":
      return { ...state, isHovering: true };
    case "onNotHover":
      return { ...state, isHovering: false };
    case "onClick":
      return { ...state, isClicked: true };
    case "reset":
      return {
        isHovering: false, isClicked: false,

        dist2Front: 0
      };
    case "timeout":
      return state
    default:
      return state;
  }
}




export const initialInteractionState: ItemInteractionState = {
  isHovering: false,
  isClicked: false,
  dist2Front: 0
}