import React from 'react';
import PropTypes from 'prop-types';
import CommentsList from './CommentsList'
import PostsList from './PostsList'

const UserDetails = ({user, isFetching, posts, comments}) => {
  if (!user) {
    if (isFetching) {
      return <span>Loading user details...</span>
    }

    return (
      <span>Please select a user to see details</span>
    )
  }

  return (
    <div>
      {/*language=CSS*/}
      <style jsx>{`
          .user-details-table {
            width: 100%;
            table-layout: fixed;
          }

          .user-details-table td {
            padding: 10px 20px 10px 0;
            font-size: 18px;
          }

          .user-details-table td:nth-child(3) {
            padding-left: 15px;
          }

          .user-details-table td:nth-child(even) {
            font-weight: bold;
          }
      `}</style>

      <table className="user-details-table" cellSpacing="0" cellPadding="0">
        <tbody>
        <tr>
          <td>Username:</td>
          <td>{user.username}</td>
          <td>Phone:</td>
          <td>{user.phone}</td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>{user.name}</td>
          <td>Website:</td>
          <td>{user.website}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{user.email}</td>
          <td>Company:</td>
          <td>{user.company.name}</td>
        </tr>
        </tbody>
      </table>

      <hr/>

      <div className="flex">
        <div className="flex-any">
          <h1>Top 5 comments</h1>
          <CommentsList comments={comments}/>
        </div>

        <div className="flex-any">
          <h1>Top 5 posts</h1>
          <PostsList posts={posts}/>
        </div>
      </div>

    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.array,
  comments: PropTypes.array,
};

export default UserDetails;