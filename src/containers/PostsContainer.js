import Posts from '../pages/Posts';
import {connect} from 'react-redux';
import {fetchPosts} from '../store/posts/posts-actions';

const mapStateToProps = ({posts}) => posts;

const connectedPosts = connect(mapStateToProps, {fetchPosts})(Posts);

connectedPosts.getInitialProps = async ctx => {
  await ctx.reduxStore.dispatch(fetchPosts());
  return {};
};

export default connectedPosts;