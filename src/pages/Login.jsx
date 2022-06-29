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
    this.imputBoxValue = this.imputBoxValue.bind(this);
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
  
   imputBoxValue(event){
      this.setState({
        name: event.target.value,
      }, this.btnMinLengtCaract)
   }
   // função que abilita button com 3 caracter acima
   btnMinLengthCaract() {
     const MIN_CARACTER = 3;
     const { name } = this.state
     if( name.length >= MIN_CARACTER){
      this.setState({
        isBottonDisable: false,
     })} else { this.setState({
       isBottonDisable: true,
     })};
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
                 onChange={ this.imputBoxValue }
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
