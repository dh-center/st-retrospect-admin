/**
 * Represents response of the auth server in case of success
 */
interface AuthServerResponse {
  data: {
    /**
     * Access login to interact with API
     */
    accessToken: string;
  };
}

/**
 * Controller for auth actions
 */
class AuthController {
  /**
   * User access token
   */
  public accessToken: string | null = null;

  /**
   * LocalStorage key for storing access token
   */
  private static LC_ACCESS_TOKEN_KEY = 'access-token';

  /**
   * Auth controller constructor
   * Restores last authed user
   */
  constructor() {
    this.accessToken = window.localStorage.getItem(AuthController.LC_ACCESS_TOKEN_KEY);
  }

  /**
   * Process user login
   *
   * @param username - username to login with
   * @param password - user password
   */
  public async login(username: string, password: string): Promise<void> {
    const response = await window.fetch(
      `${process.env.REACT_APP_API_ENDPOINT}login?username=${username}&password=${password}`
    );

    this.accessToken = (await response.json() as AuthServerResponse).data.accessToken;
    window.localStorage.setItem(AuthController.LC_ACCESS_TOKEN_KEY, this.accessToken);
  }

  /**
   * Returns true if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Logouts user
   */
  public logout(): void {
    this.accessToken = null;
    window.localStorage.removeItem(AuthController.LC_ACCESS_TOKEN_KEY);
  }
}

export default new AuthController();
