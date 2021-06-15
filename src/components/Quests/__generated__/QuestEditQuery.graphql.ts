/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestEditQueryVariables = {
    id: string;
};
export type QuestEditQueryResponse = {
    readonly quest: {
        readonly " $fragmentRefs": FragmentRefs<"QuestEditForm_originalQuest">;
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
    ...QuestEditForm_originalQuest
    id
  }
}

fragment QuestEditForm_originalQuest on Quest {
  id
  name
  description
  type
  wayToTravel
  distanceInKilometers
  durationInMinutes
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
  tags {
    id
  }
  personsCards {
    id
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
v3 = [
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
v4 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Quest",
        "kind": "LinkedField",
        "name": "quest",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestEditForm_originalQuest"
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
    "name": "QuestEditQuery",
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
            "name": "distanceInKilometers",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "durationInMinutes",
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EditorData",
            "kind": "LinkedField",
            "name": "credits",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "personsCards",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "eba45e1e65da13e8dcf0ee68e97c82d4",
    "id": null,
    "metadata": {},
    "name": "QuestEditQuery",
    "operationKind": "query",
    "text": "query QuestEditQuery(\n  $id: GlobalId!\n) {\n  quest(id: $id) {\n    ...QuestEditForm_originalQuest\n    id\n  }\n}\n\nfragment QuestEditForm_originalQuest on Quest {\n  id\n  name\n  description\n  type\n  wayToTravel\n  distanceInKilometers\n  durationInMinutes\n  minLevel\n  earnedExp\n  data {\n    time\n    version\n    blocks\n  }\n  credits {\n    time\n    version\n    blocks\n  }\n  tags {\n    id\n  }\n  personsCards {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '19d40f097236e0dda377f00b211c5cb7';
export default node;
