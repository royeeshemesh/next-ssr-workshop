import Posts from '../pages/Posts';
import {connect} from 'react-redux';
import {fetchPosts} from '../store/posts/posts-actions';

const mapStateToProps = ({posts}) => posts;

const connectedPosts = connect(mapStateToProps, {fetchPosts})(Posts);

connectedPosts.getInitialProps = async appContext => {
  return {
    posts: [1,2,3,4,5]
  }
};

export default connectedPosts;