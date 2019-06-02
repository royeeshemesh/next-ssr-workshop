import React, {Fragment} from 'react';

const SearchBox = props => {
  return (
    <Fragment>
      {/*language=CSS*/}
      <style>{`
        .search-box {
          display: block;
          padding: 10px 5px;
          font-size: 16px;
          border-radius: 5px;
          min-width: 400px;
          margin-bottom: 15px;
        }
      `}</style>
      <input {...props} className="search-box"/>
    </Fragment>
  );
};

export default SearchBox;