/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TagViewQueryVariables = {
    id: string;
};
export type TagViewQueryResponse = {
    readonly tag: {
        readonly id: string;
        readonly value: string;
    } | null;
};
export type TagViewQuery = {
    readonly response: TagViewQueryResponse;
    readonly variables: TagViewQueryVariables;
};



/*
query TagViewQuery(
  $id: GlobalId!
) {
  tag(id: $id) {
    id
    value
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
    "concreteType": "Tag",
    "kind": "LinkedField",
    "name": "tag",
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
        "name": "value",
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
    "name": "TagViewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TagViewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8baa8442549e4e8c1b54c1e4a582fffc",
    "id": null,
    "metadata": {},
    "name": "TagViewQuery",
    "operationKind": "query",
    "text": "query TagViewQuery(\n  $id: GlobalId!\n) {\n  tag(id: $id) {\n    id\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '827cc2707b4adc84f78148af891d96c5';
export default node;
