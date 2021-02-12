/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestViewQueryVariables = {
    id: string;
};
export type QuestViewQueryResponse = {
    readonly quest: {
        readonly id: string;
        readonly name: string;
        readonly description: string | null;
        readonly minLevel: number;
        readonly earnedExp: number;
    } | null;
};
export type QuestViewQuery = {
    readonly response: QuestViewQueryResponse;
    readonly variables: QuestViewQueryVariables;
};



/*
query QuestViewQuery(
  $id: GlobalId!
) {
  quest(id: $id) {
    id
    name
    description
    minLevel
    earnedExp
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
    "concreteType": "Quest",
    "kind": "LinkedField",
    "name": "quest",
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
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minLevel",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "earnedExp",
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
    "name": "QuestViewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestViewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b2a4599921e361b2f1d9bc3f234f4dec",
    "id": null,
    "metadata": {},
    "name": "QuestViewQuery",
    "operationKind": "query",
    "text": "query QuestViewQuery(\n  $id: GlobalId!\n) {\n  quest(id: $id) {\n    id\n    name\n    description\n    minLevel\n    earnedExp\n  }\n}\n"
  }
};
})();
(node as any).hash = '9c6140b057e2954e86f8643f769c324d';
export default node;
