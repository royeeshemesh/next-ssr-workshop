import axios from 'axios';

export const actionTypes = {
  FETCH_COMMENTS: 'fetchComments',
  FETCH_COMMENTS_SUCCESS: 'fetchCommentsSuccess',
  FETCH_COMMENTS_FAILED: 'fetchCommentsFailed',
};

export const fetchComments = () => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_COMMENTS,
  });

  const result = await axios.get('/api/comments');

  dispatch({
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    payload: result.data
  });
};
