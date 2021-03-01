/**
 * Represents response of the auth server in case of success
 */
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {commitLocalUpdate} from "react-relay";
import environment from "../relay-env";

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

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
}

function getInitialAuthState(): AuthState {
  return {
    accessToken: window.localStorage.getItem('access-token'),
    refreshToken: window.localStorage.getItem('refresh-token'),
  };
}

/**
 * Controller for auth actions
 */
class AuthController {
  public state: AuthState;
  public updateState: React.Dispatch<AuthState>;

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
   * Restores last authed user
   */
  constructor() {
    this.state = {};
    this.updateState = () => ({});
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
   *
   */
  public async refreshTokens(): Promise<void> {
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
    }
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
    this.updateState({});
    window.localStorage.removeItem(AuthController.LC_ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(AuthController.LC_REFRESH_TOKEN_KEY);
  }

  public setState(state: AuthState): void {
    this.state = state;
  }

  public setStateUpdater(stateUpdater: React.Dispatch<AuthState>): void {
    this.updateState = stateUpdater;
  }

  private setTokensFromResponse(response: AuthServerResponse): void {
    const { accessToken, refreshToken } = response.data;

    this.updateState({
      accessToken,
      refreshToken,
    });
    window.localStorage.setItem(AuthController.LC_ACCESS_TOKEN_KEY, accessToken);
    window.localStorage.setItem(AuthController.LC_REFRESH_TOKEN_KEY, refreshToken);
  }
}

export const authController = new AuthController();

const AuthContext = React.createContext<AuthController | undefined>(undefined);

export function AuthContextProvider(props: PropsWithChildren<unknown>): React.ReactElement {
  const [authState, setAuthState] = useState<AuthState>(getInitialAuthState);

  console.log('render context');

  useEffect(() => {
    authController.setState(authState);
    authController.setStateUpdater(setAuthState);
  }, [ authState ]);

  return <AuthContext.Provider value={authController} {...props}/>;
}

export function useAuthContext(): AuthController {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }

  return context;
}

function setTokens(authTokens: AuthState) {
  commitLocalUpdate(environment, store => {
    const user = store.getRoot().getValue('accessToken');

    store.getRoot().setValue('kek', 'accessToken')

    console.log(user)
  })
}


export async function login(username: string, password: string) {
  const response = await window.fetch(
    `${process.env.REACT_APP_API_ENDPOINT}login?username=${username}&password=${password}`
  );

  if (response.status === 200) {
    const responseJson = await response.json() as AuthServerResponse;

    setTokens(responseJson.data);
  }

  return response;
}
