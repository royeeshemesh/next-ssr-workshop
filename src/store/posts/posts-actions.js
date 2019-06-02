export const actionTypes = {
  FETCH_POSTS: 'fetchPosts',
  FETCH_POSTS_SUCCESS: 'fetchPostsSuccess',
  FETCH_POSTS_FAILED: 'fetchPostsFailed',
};

export const fetchPosts = () => async (dispatch, getState, api) => {
  dispatch({
    type: actionTypes.FETCH_POSTS,
  });

  const result = await api.get('/api/posts');

  dispatch({
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: result.data
  });
};