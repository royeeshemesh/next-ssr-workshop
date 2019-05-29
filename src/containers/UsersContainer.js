import {connect} from 'react-redux';
import Users from '../pages/Users';
import {fetchUsers, selectUser} from '../store/users/users-actions';

const mapStateToProps = ({users}) => {
  return {...users};
};
export default connect(mapStateToProps, {fetchUsers, selectUser})(Users);