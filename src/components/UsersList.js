import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const UsersList = ({users, isFetching, selected, selectUser, isFetchingSelected}) => {
  if (!users) {
    if (isFetching) {
      return (
        <span>Loading users...</span>
      )
    }
    return null;
  }

  if (!users.length) {
    return (
      <span>Users list is empty...</span>
    );
  }

  return (
    <div>
      <h1>Users</h1>
      <hr/>
      <div className="users-list-wrapper">
        <ul className="users-list">
          {users.map(user => (
            <li key={user.id} onClick={() => selectUser(user.id)} className={selected && (selected.id === user.id) ? 'selected' : ''}>
              <Link as={`/users/${user.id}`} href="/users"><a>{user.name}</a></Link>
            </li>
          ))}
        </ul>
        {isFetchingSelected && <div className="loader">Please wait...</div>}
      </div>
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.array,
  isFetching: PropTypes.bool,
  isFetchingSelected: PropTypes.bool,
  selectUser: PropTypes.func.isRequired,
};

export default UsersList;