/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "%future added value";
export type UpdateQuestInput = {
    id: string;
    name?: string | null;
    description?: string | null;
    photo?: string | null;
    type?: TaskTypes | null;
    minLevel?: number | null;
    earnedExp?: number | null;
    data?: EditorDataInput | null;
    credits?: EditorDataInput | null;
    tagIds?: Array<string> | null;
};
export type EditorDataInput = {
    time?: number | null;
    blocks: Array<unknown>;
    version?: string | null;
};
export type QuestEditMutationVariables = {
    input: UpdateQuestInput;
};
export type QuestEditMutationResponse = {
    readonly quest: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type QuestEditMutation = {
    readonly response: QuestEditMutationResponse;
    readonly variables: QuestEditMutationVariables;
};



/*
mutation QuestEditMutation(
  $input: UpdateQuestInput!
) {
  quest {
    update(input: $input) {
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
    "name": "input"
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
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "UpdateQuestPayload",
        "kind": "LinkedField",
        "name": "update",
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
    "name": "QuestEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4534a6c865c0c2ad8de69cc55be318f1",
    "id": null,
    "metadata": {},
    "name": "QuestEditMutation",
    "operationKind": "mutation",
    "text": "mutation QuestEditMutation(\n  $input: UpdateQuestInput!\n) {\n  quest {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '883d390bec4a1e7ba0546197b4877ddf';
export default node;
