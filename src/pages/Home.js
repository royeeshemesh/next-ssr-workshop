import React from 'react';

const Home = () => {
  return (
    <div className="home-intro">
      {/*language=CSS*/}
      <style>{`
        .home-intro {
          background-color: #fafafa;
          border-radius: 15px;
          padding: 30px 50px;
          border: 1px solid lightgray;
        }
      `}</style>
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

export default Home;