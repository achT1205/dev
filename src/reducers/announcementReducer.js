import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function announcementReducer(state = initialState.announcements, action) {
  switch (action.type) {
    case types.LOAD_ANNOUNCEMENTS_SUCCESS:
      return action.announcements;
    case types.LOAD_ANNOUNCEMENT_SUCCESS:
      return [...state,
      Object.assign({}, action.announcement)];
    case types.CREATE_ANNOUNCEMENT_SUCCESS:
      return [...state,
      Object.assign({}, action.announcement)];
    case types.UPDATE_ANNOUNCEMENT_SUCCESS:
      return [...state.filter(announcement => announcement.id !== action.announcement.id),
      Object.assign({}, action.announcement)];
    default:
      return state;
  }
}
