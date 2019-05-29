import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UsersList from '../components/UsersList';
import UserDetails from '../components/UserDetails';

import './Users.css';

class Users extends Component {
  async componentDidMount() {
    if (!this.props.items) {
      this.props.fetchUsers();

      const {match: {params: {id: userId}} = {}} = this.props;

      if (userId) {
        this.props.selectUser(userId)
      }
    }

  }

  render() {
    const {
      isFetchingItems,
      items,
      isFetchingSelected,
      selected,
      selectedUserPosts,
      selectedUserComments,
    } = this.props;

    return (
      <div className="users">
        <UsersList users={items} isFetching={isFetchingItems} isFetchingSelected={isFetchingSelected} selected={selected} selectUser={this.props.selectUser}/>

        {(items && items.length) && <div className="user-details-wrapper">
          <h1>User details</h1>
          <hr/>
          <UserDetails user={selected} isFetching={isFetchingSelected} posts={selectedUserPosts} comments={selectedUserComments}/>
        </div>}

      </div>
    );
  }
}

Users.propTypes = {
  isFetchingItems: PropTypes.bool.isRequired,
  items: PropTypes.array,
  isFetchingSelected: PropTypes.bool.isRequired,
  selected: PropTypes.object,
  selectedUserPosts: PropTypes.array,
  selectedUserComments: PropTypes.array,
  selectUser: PropTypes.func.isRequired,
};

export default Users;