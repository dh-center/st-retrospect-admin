/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestsListForwardQueryVariables = {
    first?: number | null;
    after?: unknown | null;
};
export type QuestsListForwardQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"QuestsList_entityConnection">;
};
export type QuestsListForwardQuery = {
    readonly response: QuestsListForwardQueryResponse;
    readonly variables: QuestsListForwardQueryVariables;
};



/*
query QuestsListForwardQuery(
  $first: Int
  $after: Cursor
) {
  ...QuestsList_entityConnection_2HEEH6
}

fragment QuestsList_entityConnection_2HEEH6 on Query {
  entities: quests(first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        name
        description
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "Cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestsListForwardQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "QuestsList_entityConnection"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestsListForwardQuery",
    "selections": [
      {
        "alias": "entities",
        "args": (v1/*: any*/),
        "concreteType": "QuestConnection",
        "kind": "LinkedField",
        "name": "quests",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "QuestEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Quest",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "entities",
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "QuestsPage_entities",
        "kind": "LinkedHandle",
        "name": "quests"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QuestsListForwardQuery",
    "operationKind": "query",
    "text": "query QuestsListForwardQuery(\n  $first: Int\n  $after: Cursor\n) {\n  ...QuestsList_entityConnection_2HEEH6\n}\n\nfragment QuestsList_entityConnection_2HEEH6 on Query {\n  entities: quests(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '977b0985c5082a56dba80d8f050192f1';
export default node;