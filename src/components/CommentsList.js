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
      {/*language=CSS*/}
      <style jsx>{`
        .comments-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .comments-list li {
          padding: 20px;
          background-color: #fafafa;
          border-radius: 10px;
          margin-bottom: 15px;
          border: 1px solid lightgray;
        }
      `}</style>
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