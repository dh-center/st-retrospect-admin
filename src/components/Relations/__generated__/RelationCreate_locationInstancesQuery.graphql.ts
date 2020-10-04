/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationCreate_locationInstancesQueryVariables = {};
export type RelationCreate_locationInstancesQueryResponse = {
    readonly locationInstances: ReadonlyArray<{
        readonly value: string;
        readonly name: string | null;
    }>;
};
export type RelationCreate_locationInstancesQuery = {
    readonly response: RelationCreate_locationInstancesQueryResponse;
    readonly variables: RelationCreate_locationInstancesQueryVariables;
};



/*
query RelationCreate_locationInstancesQuery {
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
    "name": "RelationCreate_locationInstancesQuery",
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
    "name": "RelationCreate_locationInstancesQuery",
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
    "cacheID": "055a91d261f048556ab87459cecf68f1",
    "id": null,
    "metadata": {},
    "name": "RelationCreate_locationInstancesQuery",
    "operationKind": "query",
    "text": "query RelationCreate_locationInstancesQuery {\n  locationInstances {\n    value: id\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5cbec72465b702a80a8c3ad435e9f9d8';
export default node;
