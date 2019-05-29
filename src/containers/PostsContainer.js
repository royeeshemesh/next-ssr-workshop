import Posts from '../pages/Posts';
import {connect} from 'react-redux';
import {fetchPosts} from '../store/posts/posts-actions';

const mapStateToProps = ({posts}) => posts;

const connectedPosts = connect(mapStateToProps, {fetchPosts})(Posts);

connectedPosts.getData = store => {
  return store.dispatch(fetchPosts());
};

export default connectedPosts;