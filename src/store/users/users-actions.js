export const actionTypes = {
  FETCH_USERS: 'fetchUsers',
  FETCH_USERS_SUCCESS: 'fetchUsersSuccess',
  FETCH_USERS_FAILED: 'fetchUsersFailed',
  FETCH_SELECTED_USER: 'fetchSelectedUser',
  FETCH_SELECTED_USER_SUCCESS: 'fetchSelectedUserSuccess',
  FETCH_SELECTED_USER_FAILED: 'fetchSelectedUserFailed',
};

export const fetchUsers = () => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_USERS,
  });

  const result = await axios.get('/api/users');

  dispatch({
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: result.data
  });
};

export const selectUser = userId => async (dispatch, getState, api) => {
  dispatch({
    type: actionTypes.FETCH_SELECTED_USER,
  });

  const [{data: user}, {data: posts}, {data: comments}] = await Promise.all([
    api.get(`/api/users/${userId}`),
    api.get(`/api/users/${userId}/posts/top5`),
    api.get(`/api/users/${userId}/comments/top5`),
  ]);

  dispatch({
    type: actionTypes.FETCH_SELECTED_USER_SUCCESS,
    payload: {
      user,
      posts,
      comments,
    }
  });
};