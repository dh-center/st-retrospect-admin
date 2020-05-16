import React, { FormEvent, ReactElement, useState } from 'react';
import authController from '../../authController';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import './index.css';

/**
 * Component for authentication
 *
 * @param props - component props
 */
function Login(props: RouteComponentProps): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Performs user login
   *
   * @param e - event to handle
   */
  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await authController.login(email, password);
    props.history.push('/persons');
  };

  return (
    <div className='login-page'>
      {authController.isAuthenticated() && <Redirect to='/'/>}
      <form
        className='login-page__form'
        onSubmit={handleLogin}>
        <h1 className='login-page__header'>Please, login</h1>
        <div>
          <input
            className='login-page__input'
            type="text"
            value={email}
            placeholder='Username'
            onChange={(e): void => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className='login-page__input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
          />

        </div>
        <button type="submit" className='login-page__submit-button'>
          Enter
        </button>
      </form>

    </div>
  );
}

export default withRouter(Login);
