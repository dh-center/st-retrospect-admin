/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "%future added value";
export type CreateQuestInput = {
    name: string;
    description?: string | null;
    photo?: string | null;
    type: TaskTypes;
};
export type QuestsPageCreateMutationVariables = {
    input: CreateQuestInput;
};
export type QuestsPageCreateMutationResponse = {
    readonly quest: {
        readonly create: {
            readonly recordId: string | null;
        };
    } | null;
};
export type QuestsPageCreateMutation = {
    readonly response: QuestsPageCreateMutationResponse;
    readonly variables: QuestsPageCreateMutationVariables;
};



/*
mutation QuestsPageCreateMutation(
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
    "name": "input",
    "type": "CreateQuestInput!"
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
    "name": "QuestsPageCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestsPageCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QuestsPageCreateMutation",
    "operationKind": "mutation",
    "text": "mutation QuestsPageCreateMutation(\n  $input: CreateQuestInput!\n) {\n  quest {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '12bf24205105f7438c8051bd29da0f13';
export default node;
