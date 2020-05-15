import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables
} from 'relay-runtime';

const url = process.env.REACT_APP_API_ENDPOINT;

/**
 * Function for make queries to GraphQL server
 *
 * @param operation - query to perform
 * @param variables - query variables
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchQuery(operation: RequestParameters, variables: Variables): Promise<any> {
  const response = await window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
