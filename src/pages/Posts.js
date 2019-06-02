import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import PostsList from '../components/PostsList';

const Posts = props => {
  const {items} = props;

  useEffect(() => {
    props.fetchPosts();
  }, []);

  return (
    <div>
      <PostsList posts={items}/>
    </div>
  );
};

Posts.propTypes = {
  isFetchingItems: PropTypes.bool.isRequired,
  items: PropTypes.array,
  fetchPosts: PropTypes.func.isRequired,
};

export default Posts;