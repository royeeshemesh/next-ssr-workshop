import {actionTypes} from './comments-actions';

const initialState = {
  items: null,
  isFetchingItems: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_COMMENTS):
      return {
        ...state,
        isFetchingItems: true,
      };

    case (actionTypes.FETCH_COMMENTS_SUCCESS):
      return {
        ...state,
        isFetchingItems: false,
        items: action.payload,
      };

    default:
      return state;
  }
}