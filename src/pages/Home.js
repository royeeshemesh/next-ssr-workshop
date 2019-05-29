import React from 'react';

const Home = () => {
  return (
    <div className="home-intro">
      <h1>
        Welcome, please choose a section to begin exploring
      </h1>
      <hr/>
      <p>
        Example of React.js application with react-router-dom and react-redux
      </p>
    </div>
  );
};

Home.getData = () => {
  console.info('HOME');
  return new Promise(resolve => {
    setTimeout(function() {
      console.info('done');
      resolve();
    }, 5000);
  });
};

export default Home;