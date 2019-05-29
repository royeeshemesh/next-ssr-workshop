import Comments from '../pages/Comments';
import {connect} from 'react-redux';
import {fetchComments} from '../store/comments/comments-actions';

const mapStateToProps = ({comments}) => comments;

const connectedComments = connect(mapStateToProps, {fetchComments})(Comments);

connectedComments.getData = store => {
  return store.dispatch(fetchComments());
};

export default connectedComments;