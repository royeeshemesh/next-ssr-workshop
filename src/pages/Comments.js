import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CommentsList from '../components/CommentsList';
import SearchBox from '../components/SearchBox';

class Comments extends Component {
  state = {
    search: '',
    filtedItems: null,
  };

  async componentDidMount() {
    if (!this.props.items) {
      this.props.fetchComments();
    }
  }

  handleSearchChange = e => {
    const searchValue = e.target.value;

    let filteredSearch = null;
    if (searchValue && searchValue.length) {
      const {items} = this.props;
      filteredSearch = items.filter(item=>item.name.indexOf(searchValue) > -1);
    }

    this.setState({
      search: searchValue,
      filtedItems: filteredSearch,
    });
  };

  render() {
    const {items} = this.props;
    const {filtedItems} = this.state;
    const itemsToShow = filtedItems || items;

    return (
      <div>
        <SearchBox value={this.state.search} onChange={this.handleSearchChange} placeholder="Type something to filter comments"/>
        <CommentsList comments={itemsToShow}/>
      </div>
    );
  }
}


Comments.propTypes = {
  isFetchingItems: PropTypes.bool.isRequired,
  items: PropTypes.array,
  fetchComments: PropTypes.func.isRequired,
};

export default Comments;