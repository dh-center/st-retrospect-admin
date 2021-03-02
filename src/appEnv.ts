import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables
} from 'relay-runtime';
import languageController from './controllers/languageController';
import { AuthController } from './controllers/authController';

class AppEnvironment {
  /**
   * Relay environment
   */
  public readonly relayEnv: Environment;

  /**
   * Auth controller for accessing to auth data and methods
   */
  private authController?: AuthController;

  /**
   * GraphQL API endpoint
   */
  private readonly url = process.env.REACT_APP_API_ENDPOINT + 'graphql';

  /**
   * Creates app environment instance
   */
  constructor() {
    this.relayEnv = new Environment({
      network: Network.create(this.fetchQuery.bind(this)),
      store: new Store(new RecordSource()),
    });
  }

  /**
   * Binds auth controller for accessing to auth data and methods
   *
   * @param authController - auth controller to bind
   */
  public bindAuthController(authController: AuthController): void {
    this.authController = authController;
  }

  /**
   * Sends query to GraphQL server
   *
   * @param query - query to send
   * @param variables - query variables
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async sendQuery(query: string | null | undefined, variables: Variables): Promise<any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authController?.state.accessToken) {
      headers.Authorization = 'Bearer ' + this.authController.state.accessToken;
    }

    if (languageController.dataLanguage) {
      headers['accept-language'] = languageController.dataLanguage;
    }

    const response = await window.fetch(this.url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    return response.json();
  }

  /**
   * Function for making queries to GraphQL server
   *
   * @param operation - query to perform
   * @param variables - query variables
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async fetchQuery(operation: RequestParameters, variables: Variables): Promise<any> {
    const response = await this.sendQuery(operation.text, variables);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenExpiredError = response.errors?.find((error: any) => error?.extensions?.code === 'EXPIRED_ACCESS_TOKEN');

    if (tokenExpiredError) {
      try {
        await this.authController?.refreshTokens();
      } catch {
        this.authController?.logout();
      }

      return this.sendQuery(operation.text, variables);
    }

    return response;
  }
}

export const appEnv = new AppEnvironment();

const relayEnv = appEnv.relayEnv;

export default relayEnv;
