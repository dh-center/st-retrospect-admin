/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationTypeEditQueryVariables = {
    id: string;
};
export type RelationTypeEditQueryResponse = {
    readonly relationType: {
        readonly id: string;
        readonly name: string;
        readonly synonyms: ReadonlyArray<string | null>;
    } | null;
};
export type RelationTypeEditQuery = {
    readonly response: RelationTypeEditQueryResponse;
    readonly variables: RelationTypeEditQueryVariables;
};



/*
query RelationTypeEditQuery(
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
    "name": "RelationTypeEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationTypeEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6b684df824518d97ebd5032318448fd0",
    "id": null,
    "metadata": {},
    "name": "RelationTypeEditQuery",
    "operationKind": "query",
    "text": "query RelationTypeEditQuery(\n  $id: GlobalId!\n) {\n  relationType(id: $id) {\n    id\n    name\n    synonyms\n  }\n}\n"
  }
};
})();
(node as any).hash = '7a6bc058e11deb7de3e44a98bd9000ea';
export default node;
