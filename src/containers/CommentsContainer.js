import Comments from '../pages/Comments';
import {connect} from 'react-redux';
import {fetchComments} from '../store/comments/comments-actions';

const mapStateToProps = ({comments}) => comments;
export default connect(mapStateToProps, {fetchComments})(Comments);