import React from 'react';
import { Route } from 'react-router-dom';
import UsersContainer from './containers/UsersContainer';
import CommentsContainer from './containers/CommentsContainer';
import PostsContainer from './containers/PostsContainer';
import Home from './pages/Home';

export default () => {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/users/:id?" component={UsersContainer}/>
      <Route path="/comments/:id?" component={CommentsContainer}/>
      <Route path="/posts/:id?" component={PostsContainer}/>
    </div>
  )
}