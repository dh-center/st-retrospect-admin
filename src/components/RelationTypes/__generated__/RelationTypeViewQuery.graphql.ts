/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationTypeViewQueryVariables = {
    id: string;
};
export type RelationTypeViewQueryResponse = {
    readonly relationType: {
        readonly id: string;
        readonly name: string;
        readonly synonyms: ReadonlyArray<string | null>;
    } | null;
};
export type RelationTypeViewQuery = {
    readonly response: RelationTypeViewQueryResponse;
    readonly variables: RelationTypeViewQueryVariables;
};



/*
query RelationTypeViewQuery(
  $id: GlobalId!
) {
  relationType(id: $id) {
    id
    name
    synonyms
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "RelationType",
    "kind": "LinkedField",
    "name": "relationType",
    "plural": false,
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "synonyms",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationTypeViewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationTypeViewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4a376e70bf6fd2da5d1bf21820f07c95",
    "id": null,
    "metadata": {},
    "name": "RelationTypeViewQuery",
    "operationKind": "query",
    "text": "query RelationTypeViewQuery(\n  $id: GlobalId!\n) {\n  relationType(id: $id) {\n    id\n    name\n    synonyms\n  }\n}\n"
  }
};
})();
(node as any).hash = '62f6489b4e6582e03196ea8b1f9e7ff9';
export default node;
