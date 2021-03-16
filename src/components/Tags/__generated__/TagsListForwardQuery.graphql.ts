/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TagsListForwardQueryVariables = {
    first?: number | null;
    after?: unknown | null;
};
export type TagsListForwardQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"TagsList_entityConnection">;
};
export type TagsListForwardQuery = {
    readonly response: TagsListForwardQueryResponse;
    readonly variables: TagsListForwardQueryVariables;
};



/*
query TagsListForwardQuery(
  $first: Int
  $after: Cursor
) {
  ...TagsList_entityConnection_2HEEH6
}

fragment TagsList_entityConnection_2HEEH6 on Query {
  entities: tags(first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        value
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = [
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TagsListForwardQuery",
    "selections": [
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "TagsList_entityConnection"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "TagsListForwardQuery",
    "selections": [
      {
        "alias": "entities",
        "args": (v2/*: any*/),
        "concreteType": "TagConnection",
        "kind": "LinkedField",
        "name": "tags",
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
            "concreteType": "TagEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Tag",
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
                    "name": "value",
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
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "TagsPage_entities",
        "kind": "LinkedHandle",
        "name": "tags"
      }
    ]
  },
  "params": {
    "cacheID": "304f71dad804ccf7b342dd0050ce7ed0",
    "id": null,
    "metadata": {},
    "name": "TagsListForwardQuery",
    "operationKind": "query",
    "text": "query TagsListForwardQuery(\n  $first: Int\n  $after: Cursor\n) {\n  ...TagsList_entityConnection_2HEEH6\n}\n\nfragment TagsList_entityConnection_2HEEH6 on Query {\n  entities: tags(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        id\n        value\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8ef95f072c2bc050182ec4060c32af4e';
export default node;
