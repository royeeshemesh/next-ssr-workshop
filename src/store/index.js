import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import UsersReducer from './users/users-reducer';
import CommentsReducer from './comments/comments-reducer';
import PostsReducer from './posts/posts-reducer';

export function initializeStore(initialState = {}, axiosInstance) {
  const reducers = {
    users: UsersReducer,
    comments: CommentsReducer,
    posts: PostsReducer,
  };

  return createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(
      thunkMiddleware.withExtraArgument(axiosInstance)
    )
  );
}