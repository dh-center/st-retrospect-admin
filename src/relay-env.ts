import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables
} from 'relay-runtime';
import languageController from './controllers/languageController';
import { authController } from './controllers/authController';

import { commitLocalUpdate } from 'react-relay';

/**
 * GraphQL API endpoint
 */
const url = process.env.REACT_APP_API_ENDPOINT + 'graphql';

/**
 * Sends query to GraphQL server
 *
 * @param query - query to send
 * @param variables - query variables
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendQuery(query: string | null | undefined, variables: Variables): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authController.state.accessToken) {
    headers.Authorization = 'Bearer ' + authController.state.accessToken;
  }

  if (languageController.dataLanguage) {
    headers['accept-language'] = languageController.dataLanguage;
  }

  const response = await window.fetch(url, {
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
async function fetchQuery(operation: RequestParameters, variables: Variables): Promise<any> {
  const response = await sendQuery(operation.text, variables);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenExpiredError = response.errors?.find((error: any) => error?.extensions?.code === 'EXPIRED_ACCESS_TOKEN');

  if (tokenExpiredError) {
    try {
      console.log('old', authController.state.accessToken);
      await authController.refreshTokens();
      console.log('refreshed', authController.state.accessToken);
    } catch {
      authController.logout();
    }

    return sendQuery(operation.text, variables);
  }

  return response;
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;

commitLocalUpdate(environment, store => {
  const user = store.getRoot().getValue('accessToken');

  store.getRoot().setValue('kek', 'accessToken')

  console.log(user)
});
