import React, { FormEvent, ReactElement, useState } from 'react';
import authController from '../../authController';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

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
    <div className='d-flex justify-content-center flex-column align-items-center h-100'>
      {authController.isAuthenticated() && <Redirect to='/'/>}
      <Form
        onSubmit={handleLogin}
        className={'mb-2'}
      >
        <h1 className='login-page__header'>Please, login</h1>
        <Form.Group>
          <Form.Control
            className='login-page__input'
            type="text"
            value={email}
            placeholder='Username'
            onChange={(e): void => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className='login-page__input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
          />

        </Form.Group>
        <Button type="submit" className='login-page__submit-button'>
          Enter
        </Button>
      </Form>
      <NavLink className={''} to={'/visualization/1'}>Go to visualization</NavLink>
    </div>
  );
}

export default withRouter(Login);
