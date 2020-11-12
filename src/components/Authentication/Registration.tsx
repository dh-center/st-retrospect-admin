import React, { FormEvent, ReactElement, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import authController from '../../controllers/authController';
import notifier from 'codex-notifier';
import { Button, Form } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';

/**
 * Registration page
 *
 * @param props - component props
 */
function Registration(props: RouteComponentProps): ReactElement {
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  /**
   * Performs user registration
   *
   * @param e - event to handle
   */
  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (firstPassword !== secondPassword) {
      notifier.show({
        message: 'Passwords do not match',
        style: 'error',
        time: 5000,
      });

      return;
    }
    const response = await authController.signUp(email, firstPassword);

    if (response.status === 409) {
      notifier.show({
        message: 'A user with the same username already exists',
        style: 'error',
        time: 5000,
      });

      return;
    } else if (response.status !== 201) {
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });

      return;
    }
    notifier.show({
      message: 'Account successfully created',
      style: 'success',
      time: 5000,
    });
    props.history.push('/login');
  };

  return (
    <div className='d-flex justify-content-center flex-column align-items-center h-100'>
      {authController.isAuthenticated() && <Redirect to='/'/>}
      <Form
        className='mb-2'
        onSubmit={handleSignUp}
      >
        <h1>Please, register</h1>
        <Form.Group>
          <Form.Control
            autoComplete='username'
            onChange={(e): void => setEmail(e.target.value)}
            placeholder='Username'
            type='text'
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            autoComplete='new-password'
            onChange={(e): void => setFirstPassword(e.target.value)}
            placeholder='Password'
            type='password'
            value={firstPassword}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            autoComplete='new-password'
            onChange={(e): void => setSecondPassword(e.target.value)}
            placeholder='Repeat password'
            type='password'
            value={secondPassword}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Enter
        </Button>
        <Button
          className='float-right'
          onClick={() => props.history.push('/login')}
          variant='outline-secondary'
        >
          Login
        </Button>
      </Form>
      <NavLink className='' to='/visualization/1'>Go to visualization</NavLink>
    </div>
  );
}

export default withRouter(Registration);
