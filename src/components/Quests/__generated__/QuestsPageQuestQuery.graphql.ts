/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "%future added value";
export type QuestsPageQuestQueryVariables = {
    id: string;
};
export type QuestsPageQuestQueryResponse = {
    readonly entity: {
        readonly id: string;
        readonly name: string;
        readonly description: string | null;
        readonly type: TaskTypes;
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
  entity: quest(id: $id) {
    id
    name
    description
    type
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
    "alias": "entity",
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
        "name": "type",
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
    "text": "query QuestsPageQuestQuery(\n  $id: ID!\n) {\n  entity: quest(id: $id) {\n    id\n    name\n    description\n    type\n  }\n}\n"
  }
};
})();
(node as any).hash = '3358aa3fb1aba445be0b8145d260d7a8';
export default node;
