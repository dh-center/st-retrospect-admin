/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestsPageForwardQueryVariables = {
    first?: number | null;
    after?: unknown | null;
};
export type QuestsPageForwardQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"QuestsPage_entityConnection">;
};
export type QuestsPageForwardQuery = {
    readonly response: QuestsPageForwardQueryResponse;
    readonly variables: QuestsPageForwardQueryVariables;
};



/*
query QuestsPageForwardQuery(
  $first: Int
  $after: Cursor
) {
  ...QuestsPage_entityConnection_2HEEH6
}

fragment QuestsPage_entityConnection_2HEEH6 on Query {
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
    "name": "QuestsPageForwardQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "QuestsPage_entityConnection"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestsPageForwardQuery",
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
    "name": "QuestsPageForwardQuery",
    "operationKind": "query",
    "text": "query QuestsPageForwardQuery(\n  $first: Int\n  $after: Cursor\n) {\n  ...QuestsPage_entityConnection_2HEEH6\n}\n\nfragment QuestsPage_entityConnection_2HEEH6 on Query {\n  entities: quests(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        id\n        name\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '27d69b1215701d683cf23c00ef04d63f';
export default node;
