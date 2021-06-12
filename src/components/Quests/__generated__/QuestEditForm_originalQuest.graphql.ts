/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TaskTypes = "QUIZ" | "ROUTE" | "STORY" | "TEST" | "%future added value";
export type WayToTravel = "ON_FOOT" | "WITH_TRANSPORT" | "%future added value";
export type QuestEditForm_originalQuest = {
    readonly id: string;
    readonly name: string;
    readonly description: string | null;
    readonly type: TaskTypes;
    readonly wayToTravel: WayToTravel;
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
    readonly tags: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "QuestEditForm_originalQuest";
};
export type QuestEditForm_originalQuest$data = QuestEditForm_originalQuest;
export type QuestEditForm_originalQuest$key = {
    readonly " $data"?: QuestEditForm_originalQuest$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestEditForm_originalQuest">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestEditForm_originalQuest",
  "selections": [
    (v0/*: any*/),
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
      "name": "wayToTravel",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "tags",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Quest",
  "abstractKey": null
};
})();
(node as any).hash = '4d25f0fe7f8a61789b063b76000d92fc';
export default node;
