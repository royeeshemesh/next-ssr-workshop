import {connect} from 'react-redux';
import Users from '../pages/Users';
import {fetchUsers, selectUser} from '../store/users/users-actions';

const mapStateToProps = ({users}) => {
  return {...users};
};

const connectedUsers = connect(mapStateToProps, {fetchUsers, selectUser})(Users);

connectedUsers.getInitialProps = async ctx => {
  const {users} = ctx.reduxStore.getState();
  if (!users.items) {
    await ctx.reduxStore.dispatch(fetchUsers());
  }

  const pageProps = {};

  // check if we need to render the users page with selected user
  if (ctx.req && ctx.req.params) {
    pageProps.userId = ctx.req.params.id;
    if (pageProps.userId) {
      await ctx.reduxStore.dispatch(selectUser(ctx.req.params.id));
    }
  }

  return pageProps;
};

export default connectedUsers;