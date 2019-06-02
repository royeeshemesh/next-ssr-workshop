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
      {/*language=CSS*/}
      <style jsx>{`
        .posts-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .posts-list li {
          padding: 20px;
          background-color: #fafafa;
          border-radius: 10px;
          margin-bottom: 15px;
          border: 1px solid lightgray;
        }

      `}</style>

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