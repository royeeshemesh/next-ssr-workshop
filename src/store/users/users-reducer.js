import {actionTypes} from './users-actions';

export const initialState = {
  items: null,
  isFetchingItems: false,
  isFetchingSelected: false,
  selected: null,
  selectedUserPosts: null,
  selectedUserComments: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_USERS):
      return {
        ...state,
        isFetchingItems: true,
      };

    case (actionTypes.FETCH_USERS_SUCCESS):
      return {
        ...state,
        items: action.payload,
        isFetchingItems: false,
      };

    case (actionTypes.FETCH_SELECTED_USER):
      return {
        ...state,
        selected: null,
        isFetchingSelected: true,
      };

    case (actionTypes.FETCH_SELECTED_USER_SUCCESS):
      return {
        ...state,
        selected: action.payload.user,
        selectedUserPosts: action.payload.posts,
        selectedUserComments: action.payload.comments,
        isFetchingSelected: false,
      };

    default:
      return state;
  }
}