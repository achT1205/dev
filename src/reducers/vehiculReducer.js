import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function vehiculReducer(state = initialState.carmarks, action) {
  switch (action.type) {
    case types.LOAD_CAR_MARKS_SUCCESS:
      return action.marks;

    default:
      return state;
  }
}