import Comments from '../pages/Comments';
import {connect} from 'react-redux';
import {fetchComments} from '../store/comments/comments-actions';

const mapStateToProps = ({comments}) => comments;

const connectedComments = connect(mapStateToProps, {fetchComments})(Comments);

connectedComments.getInitialProps = async ctx => {
  await ctx.reduxStore.dispatch(fetchComments());
  return {};
};

export default connectedComments;