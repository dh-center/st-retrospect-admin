import React, { FormEvent } from 'react';
import authController from '../../authController';
import { withRouter, RouteComponentProps } from 'react-router';

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
      <div>
        <form onSubmit={(e): Promise<void> => this.handleLogin(e)}>
          <input
            type="text"
            value={this.state.email}
            placeholder='Your email'
            onChange={(e): void => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder='Your password'
            value={this.state.password}
            onChange={(e): void => this.setState({ password: e.target.value })}
          />
          <input type="submit" value='Login'/>
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
