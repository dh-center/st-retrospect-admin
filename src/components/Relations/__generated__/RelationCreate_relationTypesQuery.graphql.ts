/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationCreate_relationTypesQueryVariables = {};
export type RelationCreate_relationTypesQueryResponse = {
    readonly relationTypes: ReadonlyArray<{
        readonly value: string;
        readonly name: string | null;
    }>;
};
export type RelationCreate_relationTypesQuery = {
    readonly response: RelationCreate_relationTypesQueryResponse;
    readonly variables: RelationCreate_relationTypesQueryVariables;
};



/*
query RelationCreate_relationTypesQuery {
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
    "name": "RelationCreate_relationTypesQuery",
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
    "name": "RelationCreate_relationTypesQuery",
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
    "cacheID": "16e6820c8be00f0b4476d3f6cd0c0314",
    "id": null,
    "metadata": {},
    "name": "RelationCreate_relationTypesQuery",
    "operationKind": "query",
    "text": "query RelationCreate_relationTypesQuery {\n  relationTypes {\n    value: id\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c6ef725a4158f8efae426c437e4b319c';
export default node;
