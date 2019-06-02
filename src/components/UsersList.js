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
      {/*language=CSS*/}
      <style jsx>{`
          .users-list-wrapper {
            position: relative;
          }

          .loader {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: 0.5;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .users-list {
            margin: 0;
            padding: 0;
            list-style: none;
            min-width: 300px;
          }

          .users-list li {
            padding: 15px 20px 15px 0;
            cursor: pointer;
          }

          .users-list li a {
            text-decoration: none;
            color: #555555;
          }

          .users-list li:hover {
            background-color: #f7f7f7;
          }

          .users-list li:active {
            background-color: #e8e8e8;
          }

          .users-list li.selected {
            font-weight: bold;
            background-color: #e8e8e8;
            padding-left: 20px;
          }

          .users-list li:not(:first-child) {
            border-top: 1px solid lightgray;
          }
      `}</style>

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