import React from 'react';
import Hearder from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isBottonDisable: true,
    };
    this.changeValueAndkeys = this.changeValueAndkeys.bind(this);
    this.btnMinLengthCaract = this.btnMinLengthCaract.bind(this);
  }

  changeValueAndkeys({ name, value }) {
    this.setState(
      { [name]: value },
      this.btnMinLengthCaract,
    );
  }

  btnMinLengthCaract(target) {
    const MIN_CARACTER = 2;
    this.setState({
      artist: value,
      isBottonDisable: target.value.length < MIN_CARACTER,
    });
  }

  render() {
    const { isBottonDisable, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Hearder />
        <form>
          <input
            type="text"
            valor={ artist }
            data-testid="search-artist-input"
            onChange={ this.changeValueAndkeys }
          />

          <button
            type="submit"
            disabled={ isBottonDisable }
            data-testid="search-artist-button"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
