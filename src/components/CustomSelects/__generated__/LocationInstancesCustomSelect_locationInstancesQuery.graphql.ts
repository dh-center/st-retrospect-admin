/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LocationInstancesCustomSelect_locationInstancesQueryVariables = {};
export type LocationInstancesCustomSelect_locationInstancesQueryResponse = {
    readonly locationInstances: ReadonlyArray<{
        readonly value: string;
        readonly name: string | null;
    }>;
};
export type LocationInstancesCustomSelect_locationInstancesQuery = {
    readonly response: LocationInstancesCustomSelect_locationInstancesQueryResponse;
    readonly variables: LocationInstancesCustomSelect_locationInstancesQueryVariables;
};



/*
query LocationInstancesCustomSelect_locationInstancesQuery {
  locationInstances {
    value: id
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": "value",
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
    "name": "LocationInstancesCustomSelect_locationInstancesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationInstance",
        "kind": "LinkedField",
        "name": "locationInstances",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LocationInstancesCustomSelect_locationInstancesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationInstance",
        "kind": "LinkedField",
        "name": "locationInstances",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "93baff2b0b86565f64a4c3213eb36cd6",
    "id": null,
    "metadata": {},
    "name": "LocationInstancesCustomSelect_locationInstancesQuery",
    "operationKind": "query",
    "text": "query LocationInstancesCustomSelect_locationInstancesQuery {\n  locationInstances {\n    value: id\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '9b14dea9926d82d79ec90ef313569756';
export default node;
