/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "%future added value";
export type CreateQuestInput = {
    name: string;
    description?: string | null;
    photo?: string | null;
    type: TaskTypes;
    minLevel: number;
    earnedExp: number;
    data: EditorDataInput;
    credits: EditorDataInput;
    tagIds: Array<string>;
};
export type EditorDataInput = {
    time?: number | null;
    blocks: Array<unknown>;
    version?: string | null;
};
export type QuestCreateMutationVariables = {
    input: CreateQuestInput;
};
export type QuestCreateMutationResponse = {
    readonly quest: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type QuestCreateMutation = {
    readonly response: QuestCreateMutationResponse;
    readonly variables: QuestCreateMutationVariables;
};



/*
mutation QuestCreateMutation(
  $input: CreateQuestInput!
) {
  quest {
    create(input: $input) {
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
        "concreteType": "CreateQuestPayload",
        "kind": "LinkedField",
        "name": "create",
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
    "name": "QuestCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a1497aff4bbf5369ac16b6abe1d047aa",
    "id": null,
    "metadata": {},
    "name": "QuestCreateMutation",
    "operationKind": "mutation",
    "text": "mutation QuestCreateMutation(\n  $input: CreateQuestInput!\n) {\n  quest {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '90b4c532bb4e6bd01923a47c9da1ff20';
export default node;
