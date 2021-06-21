/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Languages = "EN" | "RU" | "%future added value";
export type TaskTypes = "QUEST" | "QUIZ" | "ROUTE" | "STORY" | "%future added value";
export type WayToTravel = "ON_FOOT" | "WITH_TRANSPORT" | "%future added value";
export type QuestViewQueryVariables = {
    id: string;
};
export type QuestViewQueryResponse = {
    readonly quest: {
        readonly id: string;
        readonly name: string;
        readonly description: string | null;
        readonly language: Languages;
        readonly wayToTravel: WayToTravel;
        readonly type: TaskTypes;
        readonly durationInMinutes: number;
        readonly distanceInKilometers: number;
        readonly minLevel: number;
        readonly earnedExp: number;
        readonly tags: ReadonlyArray<{
            readonly value: string;
        }>;
        readonly personsCards: ReadonlyArray<{
            readonly id: string;
            readonly lastName: string | null;
            readonly firstName: string | null;
            readonly patronymic: string | null;
        }>;
        readonly linkedAchievements: ReadonlyArray<{
            readonly name: string;
        }>;
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
    language
    wayToTravel
    type
    durationInMinutes
    distanceInKilometers
    minLevel
    earnedExp
    tags {
      value
      id
    }
    personsCards {
      id
      lastName
      firstName
      patronymic
    }
    linkedAchievements {
      name
      id
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "language",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wayToTravel",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "durationInMinutes",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "distanceInKilometers",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minLevel",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "earnedExp",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Person",
  "kind": "LinkedField",
  "name": "personsCards",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "patronymic",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Quest",
        "kind": "LinkedField",
        "name": "quest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": [
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Achievement",
            "kind": "LinkedField",
            "name": "linkedAchievements",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Quest",
        "kind": "LinkedField",
        "name": "quest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": [
              (v12/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Achievement",
            "kind": "LinkedField",
            "name": "linkedAchievements",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8f97eaba111448326a64a7f7c1c5cff2",
    "id": null,
    "metadata": {},
    "name": "QuestViewQuery",
    "operationKind": "query",
    "text": "query QuestViewQuery(\n  $id: GlobalId!\n) {\n  quest(id: $id) {\n    id\n    name\n    description\n    language\n    wayToTravel\n    type\n    durationInMinutes\n    distanceInKilometers\n    minLevel\n    earnedExp\n    tags {\n      value\n      id\n    }\n    personsCards {\n      id\n      lastName\n      firstName\n      patronymic\n    }\n    linkedAchievements {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0f0fd2bff41e5b8d23650c035d74f064';
export default node;
