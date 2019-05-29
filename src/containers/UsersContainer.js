import {connect} from 'react-redux';
import Users from '../pages/Users';
import {fetchUsers, selectUser} from '../store/users/users-actions';

const mapStateToProps = ({users}) => {
  return {...users};
};

const connectedUsers = connect(mapStateToProps, {fetchUsers, selectUser})(Users);

connectedUsers.getData = store => {
  return store.dispatch(fetchUsers());
};

export default connectedUsers