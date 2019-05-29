import {connect} from 'react-redux';
import Users from '../pages/Users';
import {fetchUsers, selectUser} from '../store/users/users-actions';

const mapStateToProps = ({users}) => {
  return {...users};
};

const connectedUsers = connect(mapStateToProps, {fetchUsers, selectUser})(Users);

connectedUsers.getData = (store, params) => {
  const getAllData = [];
  getAllData.push(store.dispatch(fetchUsers()));
  if (params && params.id) {
    getAllData.push(store.dispatch(selectUser(params.id)));
  }
  return Promise.all(getAllData);
};

export default connectedUsers