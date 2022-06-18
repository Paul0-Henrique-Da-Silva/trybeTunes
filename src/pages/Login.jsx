import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isBottonDisable: true,
      isLoading: false,
      isPageSearch: false,

    };
    this.btnMinLengtCaract = this.btnMinLengthCaract.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  // função assicrona que abilita o botão e o estate é aterado;
  // emquanto a requisição é chamada , load é setado(settimeAout 1,5s +-) para true,
   validateLogin = async () => {
     const { name } = this.state;
     this.setState({
       isLoading: true,
     });
     await createUser({ name });
     this.setState({
       isLoading: false,
       isPageSearch: true,
     });
   }

   // função que abilita button com 3 caracter acima
   btnMinLengthCaract(event) {
     const MIN_CARACTER = 2;
     const { value } = event.target;
     const { name } = this.state;
     const valitade = name.length < MIN_CARACTER;
     this.setState(() => ({
       name: value,
       isBottonDisable: valitade,
     }));
   }

   render() {
     const { isBottonDisable, isLoading, isPageSearch, name } = this.state;
     return (
       <div data-testid="page-login">
         {
           isLoading ? <Loading /> : (
             <form>
               <input
                 data-testid="login-name-input"
                 type="text"
                 value={ name }
                 onChange={ this.btnMinLengthCaract }
               />
               <button
                 data-testid="login-submit-button"
                 type="submit"
                 disabled={ isBottonDisable }
                 onClick={ this.validateLogin }
               >
                 Entrar
               </button>
             </form>
           )
         }
         { isPageSearch && <Redirect to="/search" />}
       </div>
     );
   }
}
export default Login;
