/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestViewDeleteMutationVariables = {
    id: string;
};
export type QuestViewDeleteMutationResponse = {
    readonly quest: {
        readonly delete: {
            readonly recordId: string;
        };
    };
};
export type QuestViewDeleteMutation = {
    readonly response: QuestViewDeleteMutationResponse;
    readonly variables: QuestViewDeleteMutationVariables;
};



/*
mutation QuestViewDeleteMutation(
  $id: GlobalId!
) {
  quest {
    delete(id: $id) {
      recordId
    }
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
    "args": null,
    "concreteType": "QuestMutations",
    "kind": "LinkedField",
    "name": "quest",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "DeleteQuestPayload",
        "kind": "LinkedField",
        "name": "delete",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "recordId",
            "storageKey": null
          }
        ],
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
    "name": "QuestViewDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestViewDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "731e2db9f43ef5e80d86ebb2b1fc82a5",
    "id": null,
    "metadata": {},
    "name": "QuestViewDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation QuestViewDeleteMutation(\n  $id: GlobalId!\n) {\n  quest {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '70f42e1c6ef834e0105f42350517e98a';
export default node;
