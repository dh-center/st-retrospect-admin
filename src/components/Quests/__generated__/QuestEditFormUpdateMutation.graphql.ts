/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "STORY" | "TEST" | "%future added value";
export type WayToTravel = "ON_FOOT" | "WITH_TRANSPORT" | "%future added value";
export type UpdateQuestInput = {
    id: string;
    name?: string | null;
    description?: string | null;
    wayToTravel?: WayToTravel | null;
    durationInMinutes?: number | null;
    distanceInKilometers?: number | null;
    photo?: string | null;
    type?: TaskTypes | null;
    minLevel?: number | null;
    earnedExp?: number | null;
    data?: EditorDataInput | null;
    credits?: EditorDataInput | null;
    tagIds?: Array<string> | null;
    personsCardsIds?: Array<string> | null;
};
export type EditorDataInput = {
    time?: number | null;
    blocks: Array<unknown>;
    version?: string | null;
};
export type QuestEditFormUpdateMutationVariables = {
    input: UpdateQuestInput;
};
export type QuestEditFormUpdateMutationResponse = {
    readonly quest: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type QuestEditFormUpdateMutation = {
    readonly response: QuestEditFormUpdateMutationResponse;
    readonly variables: QuestEditFormUpdateMutationVariables;
};



/*
mutation QuestEditFormUpdateMutation(
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
    "name": "QuestEditFormUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestEditFormUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e8c419d4c3398aef715ee2f6611f346f",
    "id": null,
    "metadata": {},
    "name": "QuestEditFormUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation QuestEditFormUpdateMutation(\n  $input: UpdateQuestInput!\n) {\n  quest {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '671f1e7d0c1a3173ccb04b5a51a8bcac';
export default node;
