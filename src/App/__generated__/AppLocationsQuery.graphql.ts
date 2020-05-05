/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AppLocationsQueryVariables = {};
export type AppLocationsQueryResponse = {
    readonly locations: ReadonlyArray<{
        readonly id: string;
        readonly instances: ReadonlyArray<{
            readonly name: string | null;
        }>;
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
    instances {
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppLocationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "locations",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationInstance",
            "kind": "LinkedField",
            "name": "instances",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppLocationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "locations",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationInstance",
            "kind": "LinkedField",
            "name": "instances",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AppLocationsQuery",
    "operationKind": "query",
    "text": "query AppLocationsQuery {\n  locations {\n    id\n    instances {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8e5a7259aeb98c6dafbe9ed9dab084a9';
export default node;
