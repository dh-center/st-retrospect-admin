/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationTypesCustomSelect_relationTypesQueryVariables = {};
export type RelationTypesCustomSelect_relationTypesQueryResponse = {
    readonly relationTypes: ReadonlyArray<{
        readonly value: string;
        readonly name: string | null;
    }>;
};
export type RelationTypesCustomSelect_relationTypesQuery = {
    readonly response: RelationTypesCustomSelect_relationTypesQueryResponse;
    readonly variables: RelationTypesCustomSelect_relationTypesQueryVariables;
};



/*
query RelationTypesCustomSelect_relationTypesQuery {
  relationTypes {
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
    "name": "RelationTypesCustomSelect_relationTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RelationType",
        "kind": "LinkedField",
        "name": "relationTypes",
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
    "name": "RelationTypesCustomSelect_relationTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RelationType",
        "kind": "LinkedField",
        "name": "relationTypes",
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
    "cacheID": "7e18bf2726a670c2cca40406e9ac4270",
    "id": null,
    "metadata": {},
    "name": "RelationTypesCustomSelect_relationTypesQuery",
    "operationKind": "query",
    "text": "query RelationTypesCustomSelect_relationTypesQuery {\n  relationTypes {\n    value: id\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '03f070f5663cf55d0e411beec41a7578';
export default node;
