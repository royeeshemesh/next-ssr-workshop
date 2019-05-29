import React from 'react';
import PropTypes from 'prop-types';

const PostsList = ({posts}) => {
  if (!posts || !posts.length) {
    return (
      <span>Posts list is empty</span>
    )
  }

  return (
    <ul className="posts-list">
      {posts.map(post => (
        <li key={post.id}>
          <label>{post.id} - <strong>{post.title}</strong></label>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array,
};

export default PostsList;