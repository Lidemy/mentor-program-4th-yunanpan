import { SET_FILTER } from "../actionTypes";

const initialState = {
  filter: "",
};

export default function filterTodosReducers(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default:
      return state;
  }
}
