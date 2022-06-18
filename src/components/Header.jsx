import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Hearder extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const requestUSer = await getUser();
    this.setState({
      name: requestUSer.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (

      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        {isLoading ? <Loading /> : (
          <h4 data-testid="header-user-name">{name}</h4>)}
      </header>
    );
  }
}

export default Hearder;
