/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "%future added value";
export type QuestEditQueryVariables = {
    id: string;
};
export type QuestEditQueryResponse = {
    readonly quest: {
        readonly id: string;
        readonly name: string;
        readonly description: string | null;
        readonly type: TaskTypes;
        readonly minLevel: number;
        readonly earnedExp: number;
        readonly data: {
            readonly time: number | null;
            readonly version: string | null;
            readonly blocks: ReadonlyArray<unknown>;
        } | null;
        readonly credits: {
            readonly time: number | null;
            readonly version: string | null;
            readonly blocks: ReadonlyArray<unknown>;
        } | null;
    } | null;
};
export type QuestEditQuery = {
    readonly response: QuestEditQueryResponse;
    readonly variables: QuestEditQueryVariables;
};



/*
query QuestEditQuery(
  $id: GlobalId!
) {
  quest(id: $id) {
    id
    name
    description
    type
    minLevel
    earnedExp
    data {
      time
      version
      blocks
    }
    credits {
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
v2 = [
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
        "kind": "ScalarField",
        "name": "minLevel",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "earnedExp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EditorData",
        "kind": "LinkedField",
        "name": "data",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EditorData",
        "kind": "LinkedField",
        "name": "credits",
        "plural": false,
        "selections": (v1/*: any*/),
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
    "name": "QuestEditQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestEditQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "09e5dc7b0b4563d12c075d869155169f",
    "id": null,
    "metadata": {},
    "name": "QuestEditQuery",
    "operationKind": "query",
    "text": "query QuestEditQuery(\n  $id: GlobalId!\n) {\n  quest(id: $id) {\n    id\n    name\n    description\n    type\n    minLevel\n    earnedExp\n    data {\n      time\n      version\n      blocks\n    }\n    credits {\n      time\n      version\n      blocks\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3c43625569e78a94bd6013f4140666f7';
export default node;
