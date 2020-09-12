import React, { FormEvent, ReactElement, useState } from 'react';
import authController from '../../controllers/authController';
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
        className='mb-2'
        onSubmit={handleLogin}
      >
        <h1 className='login-page__header'>Please, login</h1>
        <Form.Group>
          <Form.Control
            className='login-page__input'
            onChange={(e): void => setEmail(e.target.value)}
            placeholder='Username'
            type='text'
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className='login-page__input'
            onChange={(e): void => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            value={password}
          />

        </Form.Group>
        <Button className='login-page__submit-button' type='submit'>
          Enter
        </Button>
      </Form>
      <NavLink className='' to='/visualization/1'>Go to visualization</NavLink>
    </div>
  );
}

export default withRouter(Login);
