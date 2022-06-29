import React from 'react';
import { Link } from 'react-router-dom';
import Hearder from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isLoading: false,
      isBottonDisable: true,
      albumCollection: [],
      requestArtist: '',
      isArtist: false,
    };
    this.requestClick = this.requestClick.bind(this);
    this.artistRequestApi = this.artistRequestApi.bind(this);
    this.btnMinLengthCaract = this.btnMinLengthCaract.bind(this);
    this.imputValueBox = this.imputValueBox.bind(this)
  }

  requestClick(event) {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.artistRequestApi();
  }
 imputValueBox(event){
 this.setState({
   artist: event.target.value
 }, this.btnMinLengtCaract)
 }

  btnMinLengthCaract(event) {
    const { artist } = this.state
    const MIN_CARACTER = 3;
    if (artist.length >= MIN_CARACTER){
      this.setState({
        isBottonDisable: false,
      });} else { this.setState({
        isBottonDisable: true,})
  }}

  async artistRequestApi() {
    const { artist } = this.state;
    const albumCollection = await searchAlbumsAPI(artist);
    this.setState({
      isLoading: false,
      requestArtist: artist,
      artist: '',
      albumCollection,
      isArtist: true,
    });
  }

  render() {
    const {
      artist,
      isArtist,
      requestArtist,
      isBottonDisable,
      isLoading,
      albumCollection,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Hearder />
        {
          isLoading ? <Loading /> : (
            <form>
              <input
                placeholder="Search an artist"
                data-testid="search-artist-input"
                type="text"
                value={ artist }
                onChange={ this.imputValueBox }
              />

              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ isBottonDisable }
                onClick={ this.requestClick }
              >
                Search
              </button>
            </form>
          )
        }

        <p>{`Resultado de álbuns de: ${requestArtist}`}</p>
        {
          albumCollection.length === 0 && isArtist
            ? <h3>Nenhum álbum foi encontrado</h3>
            : albumCollection.map((album) => (
              <div key={ album.collectionId }>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                  key={ album.collectionId }
                >
                  <span>
                    `collection:$
                    {album.collectionName}
                    `
                  </span>
                </Link>
                <span>
                  `artist:$
                  {album.artistName}
                  `
                </span>
                <span>
                  `price:$
                  {album.collectionPrice}
                  `
                </span>
                <span>
                  `currency:$
                  {album.currency}
                  `
                </span>

              </div>))
        }
      </div>
    );
  }
}
export default Search;
