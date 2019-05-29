import React from 'react';
import PropTypes from 'prop-types';

const CommentsList = ({comments}) => {
  if (!comments || !comments.length) {
    return (
      <span>Comments list is empty</span>
    )
  }

  return (
    <ul className="comments-list">
      {comments.map(comment => (
        <li key={comment.id}>
          <label>{comment.id} - <strong>{comment.name}</strong></label>
          <p>{comment.body}</p>
          <small>{comment.email}</small>
        </li>
      ))}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
};

export default CommentsList;