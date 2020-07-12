/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type QuestsPageQuestQueryVariables = {
    id: string;
};
export type QuestsPageQuestQueryResponse = {
    readonly quest: {
        readonly id: string;
        readonly name: string;
        readonly description: string | null;
    } | null;
};
export type QuestsPageQuestQuery = {
    readonly response: QuestsPageQuestQueryResponse;
    readonly variables: QuestsPageQuestQueryVariables;
};



/*
query QuestsPageQuestQuery(
  $id: ID!
) {
  quest(id: $id) {
    id
    name
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
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
    "name": "QuestsPageQuestQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestsPageQuestQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QuestsPageQuestQuery",
    "operationKind": "query",
    "text": "query QuestsPageQuestQuery(\n  $id: ID!\n) {\n  quest(id: $id) {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b18e3a3c03a3c20fc0bfc983aa0a4e6d';
export default node;
