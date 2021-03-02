import React, { PropsWithChildren, useState } from 'react';

/**
 * Represents response of the auth server in case of success
 */
interface AuthServerResponse {
  data: {
    /**
     * Access token to interact with API
     */
    accessToken: string;

    /**
     * Refresh token for getting new token pair
     */
    refreshToken: string;
  };
}

/**
 * State of the user's auth
 */
interface AuthState {
  /**
   * Access token to accessing API
   */
  accessToken?: string | null;

  /**
   * Refresh token for updating token pair
   */
  refreshToken?: string | null;
}

/**
 * Controller for auth actions
 */
export class AuthController {
  /**
   * Auth state with tokens
   */
  public state: AuthState;

  /**
   * Function for updating state
   */
  public setState: React.Dispatch<AuthState>;

  /**
   * LocalStorage key for storing access token
   */
  private static LC_ACCESS_TOKEN_KEY = 'access-token';

  /**
   * LocalStorage key for storing refresh token
   */
  private static LC_REFRESH_TOKEN_KEY = 'refresh-token';

  /**
   * Auth controller constructor
   *
   * @param state - auth state with tokens
   * @param setState - function for updating state
   */
  constructor(state: AuthState, setState: React.Dispatch<AuthState>) {
    this.state = state;
    this.setState = setState;
  }

  /**
   * Returns auth data from storage
   */
  public static getAuthStateFromStorage(): AuthState {
    return {
      accessToken: window.localStorage.getItem(AuthController.LC_ACCESS_TOKEN_KEY),
      refreshToken: window.localStorage.getItem(AuthController.LC_REFRESH_TOKEN_KEY),
    };
  }

  /**
   * Process user login
   *
   * @param username - username to login with
   * @param password - user password
   */
  public async login(username: string, password: string): Promise<Response> {
    const response = await window.fetch(
      `${process.env.REACT_APP_API_ENDPOINT}login?username=${username}&password=${password}`
    );

    if (response.status === 200) {
      const responseJson = await response.json() as AuthServerResponse;

      this.setTokensFromResponse(responseJson);
    }

    return response;
  }

  /**
   * Creates new user and returns response from api
   *
   * @param username - username of new account
   * @param password - password of new account
   */
  public async signUp(username: string, password: string): Promise<Response> {
    return window.fetch(
      `${process.env.REACT_APP_API_ENDPOINT}sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
  }

  /**
   * Refreshes token pair
   */
  public async refreshTokens(): Promise<AuthState> {
    const response = await window.fetch(
      `${process.env.REACT_APP_API_ENDPOINT}refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.state.refreshToken,
        }),
      }
    );

    if (response.status === 200) {
      const responseJson = await response.json() as AuthServerResponse;

      this.setTokensFromResponse(responseJson);

      return responseJson.data;
    }
    throw new Error(`Can't refresh tokens`);
  }

  /**
   * Returns true if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.state.accessToken;
  }

  /**
   * Logouts user
   */
  public logout(): void {
    this.setState({});
    window.localStorage.removeItem(AuthController.LC_ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(AuthController.LC_REFRESH_TOKEN_KEY);
  }

  /**
   * Helper for saving token pair from API response
   *
   * @param response - response data
   */
  private setTokensFromResponse(response: AuthServerResponse): void {
    const { accessToken, refreshToken } = response.data;

    this.setState({
      accessToken,
      refreshToken,
    });
    window.localStorage.setItem(AuthController.LC_ACCESS_TOKEN_KEY, accessToken);
    window.localStorage.setItem(AuthController.LC_REFRESH_TOKEN_KEY, refreshToken);
  }
}

const AuthContext = React.createContext<AuthController | undefined>(undefined);

/**
 * Provider for auth context
 *
 * @param props - props for component rendering
 */
export function AuthContextProvider(props: PropsWithChildren<unknown>): React.ReactElement {
  const [authState, setAuthState] = useState<AuthState>(() => AuthController.getAuthStateFromStorage());

  const authController = new AuthController(authState, setAuthState);

  return <AuthContext.Provider value={authController} {...props}/>;
}

/**
 * Hook for accessing auth context
 */
export function useAuthContext(): AuthController {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }

  return context;
}
