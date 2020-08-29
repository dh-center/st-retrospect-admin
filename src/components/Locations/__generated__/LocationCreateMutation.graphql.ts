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
    data: EditorDataInput;
};
export type EditorDataInput = {
    time?: number | null;
    blocks: Array<unknown>;
    version?: string | null;
};
export type LocationCreateMutationVariables = {
    input: CreateQuestInput;
};
export type LocationCreateMutationResponse = {
    readonly quest: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type LocationCreateMutation = {
    readonly response: LocationCreateMutationResponse;
    readonly variables: LocationCreateMutationVariables;
};



/*
mutation LocationCreateMutation(
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
    "name": "LocationCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "37c09df5704f11b625ab685809f1e3e5",
    "id": null,
    "metadata": {},
    "name": "LocationCreateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationCreateMutation(\n  $input: CreateQuestInput!\n) {\n  quest {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0e97a46d5506c245245ca45163b84aa4';
export default node;
