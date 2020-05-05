/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AppLocationsQueryVariables = {};
export type AppLocationsQueryResponse = {
    readonly locations: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
    }>;
};
export type AppLocationsQuery = {
    readonly response: AppLocationsQueryResponse;
    readonly variables: AppLocationsQueryVariables;
};



/*
query AppLocationsQuery {
  locations {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "locations",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppLocationsQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppLocationsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AppLocationsQuery",
    "operationKind": "query",
    "text": "query AppLocationsQuery {\n  locations {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f78d786c458c5cf7d345549ef2b6c686';
export default node;
