/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "%future added value";
export type QuestViewQueryVariables = {
    id: string;
};
export type QuestViewQueryResponse = {
    readonly entity: {
        readonly id: string;
        readonly name: string;
        readonly description: string | null;
        readonly type: TaskTypes;
        readonly data: {
            readonly time: number | null;
            readonly version: string | null;
            readonly blocks: ReadonlyArray<unknown>;
        } | null;
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
  entity: quest(id: $id) {
    id
    name
    description
    type
    data {
      time
      version
      blocks
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EditorData",
        "kind": "LinkedField",
        "name": "data",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "time",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "version",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "blocks",
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
    "cacheID": "3ac1a3a4c449e53c670dee500315bef2",
    "id": null,
    "metadata": {},
    "name": "QuestViewQuery",
    "operationKind": "query",
    "text": "query QuestViewQuery(\n  $id: GlobalId!\n) {\n  entity: quest(id: $id) {\n    id\n    name\n    description\n    type\n    data {\n      time\n      version\n      blocks\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3e72f9903c09f95f5773a23be0961c1a';
export default node;
