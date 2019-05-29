import React from 'react';
import Routes from './Routes';
import {NavLink} from "react-router-dom";

import './App.css';

const App = () => (
  <div className="container">

    <div className="navigation">

      <NavLink to="/" exact activeStyle={{
        fontWeight: "bold",
        textDecoration: "none"
      }}><span className="brand">User explorer</span></NavLink>

      <NavLink to="/users" activeStyle={{
        fontWeight: "bold",
        textDecoration: "none"
      }}>Users</NavLink>

      <NavLink to="/posts" activeStyle={{
        fontWeight: "bold",
        textDecoration: "none"
      }}>Posts</NavLink>

      <NavLink to="/comments" activeStyle={{
        fontWeight: "bold",
        textDecoration: "none"
      }}>Comments</NavLink>

      <hr/>

    </div>

    <Routes/>
  </div>
);

export default App;
