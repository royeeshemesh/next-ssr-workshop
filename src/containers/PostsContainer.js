import Posts from '../pages/Posts';
import {connect} from 'react-redux';
import {fetchPosts} from '../store/posts/posts-actions';

const mapStateToProps = ({posts}) => posts;
export default connect(mapStateToProps, {fetchPosts})(Posts);