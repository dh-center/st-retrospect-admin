import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables
} from 'relay-runtime';
import authController from './authController';

/**
 * GraphQL API endpoint
 */
const url = process.env.REACT_APP_API_ENDPOINT + 'graphql';

/**
 * Function for make queries to GraphQL server
 *
 * @param operation - query to perform
 * @param variables - query variables
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchQuery(operation: RequestParameters, variables: Variables): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authController.accessToken) {
    headers.Authorization = 'Bearer ' + authController.accessToken;
  }

  const response = await window.fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
