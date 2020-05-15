import React, { FormEvent } from 'react';
import authController from '../../authController';
import { withRouter, RouteComponentProps } from 'react-router';
import './index.css';

/**
 * Component for authentication
 */
class Login extends React.Component<RouteComponentProps> {
  public state = {
    email: '',
    password: '',
  }

  /**
   * Method for component rendering
   */
  public render(): React.ReactElement {
    return (
      <div className='login-page'>
        <form className='login-page__form' onSubmit={(e): Promise<void> => this.handleLogin(e)}>
          <h1 className='login-page__header'>Please, login</h1>
          <div>
            <input
              className='login-page__input'
              type="text"
              value={this.state.email}
              placeholder='Username'
              onChange={(e): void => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <input
              className='login-page__input'
              type="password"
              placeholder='Password'
              value={this.state.password}
              onChange={(e): void => this.setState({ password: e.target.value })}
            />

          </div>
          <button type="submit" className='login-page__submit-button'>
            Enter
          </button>
        </form>

      </div>
    );
  }

  /**
   * Performs user login
   *
   * @param e
   */
  private async handleLogin(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await authController.login(this.state.email, this.state.password);
    this.props.history.push('/persons');
  }
}
export default withRouter(Login);
